import React from "react";
import { FormPageProps } from "../AgentForm";
import * as Yup from "yup";
import FormPageContainer from "../../Utility/FormPageContainer";
import AtlasAccordion from "../../Utility/Accordion";
import useFormGenerator from "../../../hooks/useFormGenerator";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import TermsCheckbox from "../../FormUtil/TermsCheckbox";
import { TextField, MenuItem } from "@material-ui/core";
import isFormValid from "../helper/isFormValid";
import isFormSubmitting from "../helper/isFormSubmitting";
import submitGeneratedForm from "../helper/submitForm";
import {
  EventType,
  IEventAddressInfo,
  IEventCategories,
  IEventPersonalInfo,
  IEventSocialsInfo,
} from "../types";
import isEventPhysical from "../helper/isEventPhysical";
import {
  frequency,
  ageRestriction,
  eventFormStepLabels,
  eventTypeList,
  categories,
  taquaraNeighborhoods,
} from "../constants";
import useFormCallback from "../hooks/useFormCallback";
import getAddressFromZip from "../../../helper/getAddressFromZip";

interface IEventForms extends FormPageProps {}

let StringRequired = Yup.string().required("Este campo é obrigatório");
let StringNotRequired = Yup.string().notRequired();

const EventsForm = ({ headerReturnAction }: IEventForms) => {
  const [eventTypeOption, setEventTypeOption] =
    React.useState<EventType>("Físico");

  const step1 = useFormGenerator<IEventPersonalInfo>({
    fields: {
      privateEmail: {
        label: "E-mail para cadastro *",
        placeholder: "Digite seu e-mail",
      },
      publicEmail: {
        label: "E-mail exibido no mapa",
        placeholder: "Digite seu e-mail que aparecerá no mapa",
      },
      eventName: {
        label: "Nome do evento *",
        placeholder: "Digite o nome do evento",
      },
      eventHead: {
        label: "Nome do responsável pelo evento *",
        placeholder: "Digite seu nome completo",
      },

      startingDate: {
        label: "Data de início",
        type: "date",
      },
      endingDate: {
        label: "Data de finalização",
        type: "date",
      },
      workingHours: {
        label: "Horário de funcionamento *",
        placeholder: "Ex. de segunda à sexta, das 8h às 17h",
      },
      eventAgeRestriction: {
        label: "Classificação indicativa *",
        type: "select",
        selectOptions: ageRestriction,
      },
      eventFrequency: {
        label: "Frequência do evento *",
        type: "select",
        selectOptions: frequency,
      },
      eventEntryType: {
        label: "Valores do evento *",
        type: "select",
        selectOptions: ["Acesso gratuito", "Acesso pago", "Acesso misto"],
      },
      eventFee: {
        label: "Ingresso do evento",
        placeholder:
          "Caso acesso pago ou misto, descrever tipo de taxa de entrada",
      },
      privatePhone: {
        label: "Contato para informações *",
        placeholder: "Telefone que não será exibido no site",
      },
      publicPhone: {
        label: "Telefone 1",
        placeholder: "Telefone que será exibido no site",
      },
      description: {
        label: "Descrição do evento *",
        placeholder: "Escreva uma descrição sobre o evento",
        additionalProps: {
          TextFieldProps: {
            className: "md:col-span-2",
            multiline: true,
            rows: 6,
          },
        },
      },
    },
    validationSchema: Yup.object({
      workingHours: StringRequired,
      endingDate: StringRequired,
      description: StringRequired,
      eventAgeRestriction: StringRequired as any,
      eventEntryType: StringRequired as any,
      eventFee: Yup.string().notRequired(),
      eventFrequency: StringRequired as any,
      eventHead: StringRequired,
      eventName: StringRequired,
      privateEmail: StringRequired,
      publicEmail: StringRequired,
      startingDate: StringRequired,
      privatePhone: StringRequired,
      publicPhone: StringNotRequired,
    }),
  });

  const step2 = useFormGenerator<IEventCategories>({
    fields: {
      categories: {
        label: "Selecione as áreas de atuação",
        type: "checkboxGroup",
        checkboxGroup: categories,
      },
    },
    validationSchema: Yup.object({
      categories: Yup.array().min(0),
    }),
  });

  const step3 = useFormGenerator<Partial<Omit<IEventAddressInfo, "eventType">>>(
    {
      fields: {
        cep: { label: "CEP", placeholder: "Digite seu CEP" },
        street: {
          label: "Logradouro",
          placeholder: "Rua do evento, caso seja um evento físico",
        },
        neighborhood: {
          label: "Bairro",
          placeholder: "Bairro do evento, caso seja um evento físico",
          type: "select",
          selectOptions: taquaraNeighborhoods,
        },
        streetNumber: {
          label: "Número",
          placeholder: "Número do local do evento, em caso de evento físico",
        },
        complement: {
          label: "Complemento",
          placeholder: "Complemento do local do evento",
        },
      },
      validationSchema: Yup.object({
        cep:
          eventTypeOption === "Físico" || eventTypeOption === "Híbrido"
            ? StringRequired.matches(
                /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/,
                "É preciso ser um CEP válido."
              )
            : StringNotRequired,
        complement: StringNotRequired,
        neighborhood:
          eventTypeOption === "Físico" || eventTypeOption === "Híbrido"
            ? StringRequired
            : (StringNotRequired as any),
        street:
          eventTypeOption === "Físico" || eventTypeOption === "Híbrido"
            ? StringRequired
            : StringNotRequired,
        streetNumber:
          eventTypeOption === "Físico" || eventTypeOption === "Híbrido"
            ? StringRequired
            : StringNotRequired,
      }),
    }
  );

  const step4 = useFormGenerator<IEventSocialsInfo>({
    fields: {
      website: {
        label: "Website",
        placeholder: "Insira o link do seu website",
      },
      eventURL: {
        label: "Link do evento",
        placeholder: "Link para eventos híbridos ou virtuais",
      },
    },
    validationSchema: Yup.object({
      eventURL: Yup.string().notRequired(),

      website: Yup.string().notRequired(),
    }),
  });

  const { start, error, success } = useFormCallback(
    {
      successMessage:
        "Sua inscrição foi efetuada com sucesso, nosso time irá analisar os dados inseridos e em breve você receberá um e-mail confirmando a aprovação da sua inscrição. Obrigado pela participação!",
      successTitle: "Enviado",
    },
    {
      errorMessage:
        "Houve um erro ao enviar o formulário. Por favor, recarregue a página e tente novamente. Se o erro persistir, contate o suporte.",
      errorTitle: "Erro ao enviar",
    }
  );

  let formList = [step1, step2, step3, step4];

  const [checkboxOneState, setCheckboxOneState] =
    React.useState<boolean>(false);
  const [checkboxTwoState, setCheckboxTwoState] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    step3.formik.validateForm();
  }, [eventTypeOption]);

  return (
    <FormPageContainer
      isSubmitting={isFormSubmitting(formList)}
      isValid={
        isFormValid(formList, true) && checkboxOneState && checkboxTwoState
      }
      headerLabel={"Eventos"}
      actionCancelFn={headerReturnAction}
      actionSubmitFn={() =>
        submitGeneratedForm(
          formList,
          "/events",
          { eventType: eventTypeOption },
          {
            error: error,
            start: start,
            success: () => {
              headerReturnAction();
              success();
            },
          }
        )
      }
      headerReturnAction={headerReturnAction}
    >
      <div className="w-full justify-center flex">
        <TextField
          select
          variant="outlined"
          label="Tipo de agente"
          style={{ minWidth: "125px" }}
          value={eventTypeOption}
          onChange={(e) => setEventTypeOption(e.target.value as any)}
        >
          {eventTypeList.map((eventType, index) => {
            return (
              <MenuItem key={index} value={eventType}>
                {eventType}
              </MenuItem>
            );
          })}
        </TextField>
      </div>

      {formList.map((form, indexOuter) => {
        if (!isEventPhysical(eventTypeOption) && indexOuter == 2) {
          return (
            <div key={indexOuter} className="my-10 hidden">
              <AtlasAccordion
                defaultOpen
                fullWidth
                shadow
                label={`${eventFormStepLabels[indexOuter]}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
                  {form.fields.map((fields, index) => {
                    return (
                      <FieldWrapper
                        variant="outlined"
                        formik={form.formik}
                        {...fields}
                        key={fields.uuid}
                      />
                    );
                  })}
                </div>
              </AtlasAccordion>
            </div>
          );
        } else {
          return (
            <div key={indexOuter} className="my-10 ">
              <AtlasAccordion
                fullWidth
                shadow
                label={`${eventFormStepLabels[indexOuter]}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
                  {form.fields.map((fields, index) => {
                    return (
                      <FieldWrapper
                        variant="outlined"
                        formik={form.formik}
                        {...fields}
                        key={fields.uuid}
                      />
                    );
                  })}
                </div>
              </AtlasAccordion>
            </div>
          );
        }
      })}

      <TermsCheckbox
        checkboxOneCallback={() =>
          setCheckboxOneState((prevState) => !prevState)
        }
        checkboxTwoCallback={() =>
          setCheckboxTwoState((prevState) => !prevState)
        }
        checkboxOneState={checkboxOneState}
        checkboxTwoState={checkboxTwoState}
      />
    </FormPageContainer>
  );
};

export default EventsForm;
