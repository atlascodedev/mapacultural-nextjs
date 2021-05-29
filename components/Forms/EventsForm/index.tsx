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
  API,
  categories,
  frequency,
  taquaraNeighborhoods,
} from "../../../constants";
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
    },
    validationSchema: Yup.object({
      closingHours: StringRequired,
      description: StringRequired,
      eventAgeRestriction: StringRequired as any,
      eventEntryType: StringRequired as any,
      eventFee: StringRequired,
      eventFrequency: StringRequired as any,
      eventHead: StringRequired,
      eventName: StringRequired,
      openingHours: StringRequired,
      privateEmail: StringRequired,
      publicEmail: StringRequired,
      startingDate: StringRequired,
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

  const step3 = useFormGenerator<IEventAddressInfo>({
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
      cep: StringRequired,
      complement: StringNotRequired,
      eventType: StringRequired,
      neighborhood: StringRequired,
      street: StringRequired,
      streetNumber: StringRequired,
    }),
  });

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
      privatePhone: {
        label: "Contato para informações *",
        placeholder: "Telefone que não será exibido no site",
      },
      publicPhone: {
        label: "Telefone 1",
        placeholder: "Telefone que será exibido no site",
      },
    },
    validationSchema: Yup.object({
      eventURL: Yup.string()
        .url("Precisa ser uma URL válida")
        .required("Este campo é obrigatório"),
      privatePhone: StringRequired,
      publicPhone: StringNotRequired,
      website: Yup.string()
        .url("Precisa ser uma URL válida")
        .required("Este campo é obrigatório"),
    }),
  });

  let formList = [step1, step2, step3, step4];

  const [checkboxOneState, setCheckboxOneState] =
    React.useState<boolean>(false);
  const [checkboxTwoState, setCheckboxTwoState] =
    React.useState<boolean>(false);

  const isSubmitting: boolean =
    step1.formik.isSubmitting ||
    step2.formik.isSubmitting ||
    step3.formik.isSubmitting ||
    step4.formik.isSubmitting;

  const isValid: boolean =
    step1.formik.isValid &&
    step2.formik.isValid &&
    step3.formik.isValid &&
    step4.formik.isValid &&
    checkboxOneState &&
    checkboxTwoState;

  const submitEventForm = () => {
    const stepOneValues = step1.formik.values;
    const stepTwoValues = step2.formik.values;
    const stepThreeValues = step3.formik.values;
    const stepFourValues = step4.formik.values;

    const aggregatedValues = {
      ...stepOneValues,
      ...stepTwoValues,
      ...stepThreeValues,
      ...stepFourValues,
    };

    formList.forEach((form) => {
      form.formik.setSubmitting(true);
    });

    API.post("/events", aggregatedValues)
      .then((successMessage) => {
        console.log(successMessage);

        formList.forEach((form) => {
          form.formik.setSubmitting(false);
          form.formik.resetForm();
        });
      })
      .catch((error) => {
        console.log(error);

        formList.forEach((form) => {
          form.formik.setSubmitting(false);
        });
      });

    console.log(stepOneValues, stepTwoValues, stepThreeValues, stepFourValues);
  };

  return (
    <FormPageContainer
      isSubmitting={isSubmitting}
      isValid={isValid}
      headerLabel={"Eventos"}
      actionCancelFn={submitEventForm}
      actionSubmitFn={headerReturnAction}
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
