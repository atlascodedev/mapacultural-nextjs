import React from "react";
import { FormPageProps } from "../AgentForm";
import * as Yup from "yup";
import FormPageContainer from "../../Utility/FormPageContainer";
import AtlasAccordion from "../../Utility/Accordion";
import useFormGenerator from "../../../hooks/useFormGenerator";
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
import useGlobalUI from "../../../context/global_ui/hook";
import { nanoid } from "nanoid";

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
      workingHours: StringRequired,
      endingDate: StringRequired,
      description: StringRequired,
      eventAgeRestriction: StringRequired as any,
      eventEntryType: StringRequired as any,
      eventFee: StringRequired,
      eventFrequency: StringRequired as any,
      eventHead: StringRequired,
      eventName: StringRequired,
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
        placeholder:
          "Digite o CEP, caso seja um evento físico (Apenas números)",
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
      cep: StringRequired.matches(
        /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/,
        "É preciso ser um CEP válido."
      ),
      complement: StringNotRequired,
      eventType: StringRequired as any,
      neighborhood: StringRequired as any,
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
      eventURL: Yup.string().url("Precisa ser uma URL válida").notRequired(),
      privatePhone: StringRequired,
      publicPhone: StringNotRequired,
      website: Yup.string().url("Precisa ser uma URL válida").notRequired(),
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

  const { dispatch } = useGlobalUI();

  const submitEventForm = () => {
    const transactionUUID = nanoid();
    const stepOneValues = step1.formik.values;
    const stepTwoValues = step2.formik.values;
    const stepThreeValues = step3.formik.values;
    const stepFourValues = step4.formik.values;

    const aggregatedValues = {
      ...stepOneValues,
      ...stepTwoValues,
      ...stepThreeValues,
      ...stepFourValues,
      uuid: transactionUUID,
    };

    dispatch({ type: "SET_GLOBAL_LOADING_TRUE" });

    formList.forEach((form) => {
      form.formik.setSubmitting(true);
    });

    API.post("/events", aggregatedValues)
      .then((successMessage) => {
        console.log(successMessage);

        dispatch({ type: "SET_GLOBAL_LOADING_FALSE" });
        headerReturnAction();
        dispatch({
          type: "SET_FEEDBACK_DIALOG_VISIBLE",
          payload: {
            feedbackMessage:
              "Sua inscrição foi efetuada com sucesso, nosso time irá analisar os dados inseridos e em breve você receberá um e-mail confirmando a aprovação da inscrição. Obrigado pela participação!",
            feedbackSeverity: "success",
            feedbackTitle: "Enviado com sucesso",
          },
        });

        formList.forEach((form) => {
          form.formik.setSubmitting(false);
          form.formik.resetForm();
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: "SET_GLOBAL_LOADING_FALSE" });
        dispatch({
          type: "SET_FEEDBACK_DIALOG_VISIBLE",
          payload: {
            feedbackMessage:
              "Ocorreu um erro ao tentar enviar a sua inscrição, isto provavelmente é um erro em nossos servidores. Por favor, atualize a página e tente novamente, pedimos desculpas pela inconveniência.",
            feedbackSeverity: "error",
            feedbackTitle: "Erro ao enviar formulário",
          },
        });

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
      actionCancelFn={headerReturnAction}
      actionSubmitFn={submitEventForm}
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
