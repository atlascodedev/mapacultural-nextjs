import React from "react";
import { FormPageProps } from "../AgentForm";
import * as Yup from "yup";
import FormPageContainer from "../../Utility/FormPageContainer";
import AtlasAccordion from "../../Utility/Accordion";
import useFormGenerator, {
  IFieldWrapperInternal,
} from "../../../hooks/useFormGenerator";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import {
  ageRestriction,
  brazilStates,
  categories,
  frequency,
} from "../../../constants";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import {
  IEventAddressInfo,
  IEventCategories,
  IEventPersonalInfo,
  IEventSocialsInfo,
} from "../../../@types/project";
import TermsCheckbox from "../../FormUtil/TermsCheckbox";

interface IEventForms extends FormPageProps {}

let StringRequired = Yup.string().required("Este campo é obrigatório");
let StringNotRequired = Yup.string().notRequired();

const EventsForm = ({ headerReturnAction }: IEventForms) => {
  const step1 = useFormGenerator({
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
      openingHours: {
        label: "Horário de abertura",
        type: "time",
      },
      closingHours: {
        label: "Horário de encerramento",
        type: "time",
      },
      startingDate: {
        label: "Data de início",
        type: "date",
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
        label: "Taxa do evento",
        placeholder:
          "Caso acesso pago ou misto, descrever tipo de taxa de entrada",
      },
      description: {
        label: "Descrição do evento *",
        placeholder: "Escreva uma descrição sobre o evento",
      },
    } as Record<keyof Required<IEventPersonalInfo>, IFieldWrapperInternal>,
    validationSchema: Yup.object({} as Record<keyof IEventPersonalInfo, any>),
  });

  const step2 = useFormGenerator({
    fields: {
      categories: {
        label: "Selecione as áreas de atuação",
        type: "checkboxGroup",
        checkboxGroup: categories,
      },
    } as Record<keyof IEventCategories, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      categories: Yup.array().min(0),
    } as Record<keyof IEventCategories, any>),
  });

  const step3 = useFormGenerator({
    fields: {
      eventType: {
        label: "Tipo do evento *",
        type: "select",
        selectOptions: ["Físico", "Online", "Híbrido"],
      },
      cep: {
        label: "CEP",
        placeholder: "Digite o CEP, caso seja um evento físico",
      },
      street: {
        label: "Logradouro",
        placeholder: "Rua do evento, caso seja um evento físico",
      },
      city: {
        label: "Cidade",
        placeholder: "Cidade do evento, caso seja um evento físico",
      },
      state: {
        label: "Estado",
        selectOptions: brazilStates,
        type: "select",
      },
      neighborhood: {
        label: "Bairro",
        placeholder: "Bairro do evento, caso seja um evento físico",
      },
      streetNumber: {
        label: "Número",
        placeholder: "Número do local do evento, em caso de evento físico",
      },
      complement: {
        label: "Complemento",
        placeholder: "Complemento do local do evento",
      },
    } as Record<keyof IEventAddressInfo, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      cep: StringNotRequired,
      city: StringNotRequired,
      complement: StringNotRequired,
      eventType: StringRequired,
      neighborhood: StringNotRequired,
      state: StringNotRequired,
      street: StringNotRequired,
      streetNumber: StringNotRequired,
    } as Record<keyof IEventAddressInfo, any>),
  });

  const step4 = useFormGenerator({
    fields: {
      website: {
        label: "Website",
        placeholder: "Insira o link do seu website",
      },
      eventURL: {
        label: "Link do evento",
        placeholder: "Link para eventos híbridos ou virtuais",
      },
      privatePhone: {
        label: "Contato para informações *",
        placeholder: "Telefone que não será exibido no site",
      },
      publicPhone: {
        label: "Telefone 1",
        placeholder: "Telefone que será exibido no site",
      },
    } as Record<keyof IEventSocialsInfo, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      eventURL: Yup.string()
        .url("Precisa ser uma URL válida")
        .required("Este campo é obrigatório"),
      privatePhone: StringRequired,
      publicPhone: StringNotRequired,
      website: Yup.string()
        .url("Precisa ser uma URL válida")
        .required("Este campo é obrigatório"),
    } as Record<keyof IEventSocialsInfo, any>),
  });

  let formList = [step1, step2, step3, step4];

  const [checkboxOneState, setCheckboxOneState] =
    React.useState<boolean>(false);
  const [checkboxTwoState, setCheckboxTwoState] =
    React.useState<boolean>(false);

  return (
    <FormPageContainer
      headerLabel={"Eventos"}
      actionCancelFn={() => console.log("this cancels")}
      actionSubmitFn={() => console.log("this submits")}
      headerReturnAction={headerReturnAction}
    >
      {formList.map((form, indexOuter) => {
        return (
          <div key={indexOuter} className="my-10">
            <AtlasAccordion fullWidth shadow label={`Etapa ${indexOuter + 1}`}>
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
