import React from "react";
import useFormGenerator from "../../../hooks/useFormGenerator";
import { FormPageProps } from "../AgentForm";
import AtlasAccordion from "../../Utility/Accordion";
import FormPageContainer from "../../Utility/FormPageContainer";
import * as Yup from "yup";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import {
  accessibilityType,
  API,
  categories,
  spheres,
  taquaraNeighborhoods,
} from "../../../constants";
import {
  ICulturalSpaceAddressInfo,
  ICulturalSpaceCategories,
  ICulturalSpacePersonalInfo,
  ICulturalSpaceSocials,
} from "../../../@types/project";
import TermsCheckbox from "../../FormUtil/TermsCheckbox";
import useGlobalUI from "../../../context/global_ui/hook";
import { nanoid } from "nanoid";

interface ISpaceForm extends FormPageProps {}

let StringRequired = Yup.string().required("Este campo é obrigatório");

const SpacesForm = ({ headerReturnAction }: ISpaceForm) => {
  const step1 = useFormGenerator<ICulturalSpacePersonalInfo>({
    fields: {
      privateEmail: {
        label: "E-mail para cadastro *",
        placeholder: "E-mail que não será exibido no site",
      },
      publicEmail: {
        label: "E-mail exibido no mapa",
        placeholder: "E-mail que será exibido no mapa",
      },
      cpf_or_cpnj: {
        label: "CPF/CNPJ *",
        placeholder: "Digite seu CPF ou CPNJ",
      },
      culturalSpaceCapacity: {
        label: "Capacidade de público *",
        placeholder: "Ex: 50 pessoas",
        additionalProps: {
          NumberFormatProps: {
            prefix: "Até ",
            suffix: " pessoa(s)",
          },
        },
      },
      culturalSpaceEntry: {
        label: "Esfera",
        selectOptions: ["Espaço privado", "Espaço público"],
        type: "select",
      },
      culturalSpaceHead: {
        label: "Responsável pelo local *",
        placeholder: "Digite o nome completo do responsável",
      },
      culturalSpaceName: {
        label: "Nome do espaço *",
        placeholder: "Digite o nome do espaço",
      },
      culturalSpaceSphere: {
        label: "Tipo de esfera *",
        selectOptions: spheres,
        type: "select",
      },
      entryTypes: {
        label: "Critérios para o uso do espaço *",
        type: "select",
        selectOptions: ["Acesso gratuito", "Acesso pago", "Misto"],
      },

      entryFee: {
        label: "Tarifa de entrada",
        placeholder: "Descreva a tarifa, em caso de evento misto ou pago",
      },
      workingHours: {
        label: "Horário de funcionamento",
        placeholder: "Ex. das 9h às 20h",
      },

      description: {
        label: "Descrição do local *",
        placeholder: "Escreva uma descrição sobre o local",
      },
    },
    validationSchema: Yup.object({
      publicEmail: StringRequired,
      privateEmail: StringRequired,
      workingHours: StringRequired,
      cpf_or_cpnj: StringRequired,
      culturalSpaceCapacity: StringRequired,
      culturalSpaceEntry: StringRequired as any,
      culturalSpaceHead: StringRequired,
      culturalSpaceName: StringRequired,
      culturalSpaceSphere: StringRequired as any,
      description: StringRequired,
      entryFee: Yup.string().notRequired() as any,
      entryTypes: StringRequired as any,
    }),
  });

  const step2 = useFormGenerator<ICulturalSpaceAddressInfo>({
    fields: {
      cep: {
        label: "CEP *",
        format: "#####-###",
        type: "format",
        placeholder: "Digite seu CEP (apenas números)",
      },
      street: {
        label: "Logradouro *",
        placeholder: "Rua, avenida, etc",
      },
      neighborhood: {
        label: "Bairro *",
        placeholder: "Nome do seu bairro",
        type: "select",
        selectOptions: taquaraNeighborhoods,
      },
      streetNumber: {
        label: "Número *",
        placeholder: "Digite o número do local",
      },
      complement: {
        label: "Complemento",
        placeholder: "Ex. número do apartamento",
      },
    },
    validationSchema: Yup.object({
      cep: StringRequired.matches(
        /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/,
        "É preciso ser um CEP válido."
      ),
      complement: Yup.string().notRequired(),
      neighborhood: StringRequired as any,
      street: StringRequired,
      streetNumber: StringRequired,
    }),
  });

  const step3 = useFormGenerator<ICulturalSpaceCategories>({
    fields: {
      category: {
        label: "Tipo de local",
        type: "checkboxGroup",
        checkboxGroup: categories,
      },
      accessible: {
        label: "Acessível *",
        type: "select",
        selectOptions: ["Sim", "Não", "Parcialmente"],
      },
      accessibilityType: {
        label: "Acessibilidade física",
        type: "checkboxGroup",
        checkboxGroup: accessibilityType,
      },
    },
    validationSchema: Yup.object({
      accessibilityType: Yup.array().min(0),
      accessible: StringRequired,
      category: Yup.array().min(0),
    }),
  });

  const step4 = useFormGenerator<ICulturalSpaceSocials>({
    fields: {
      website: {
        label: "Website",
        placeholder: "Coloque o link do website do local",
      },
      facebook: {
        label: "Facebook",
        placeholder: "Insira o link do facebook do local",
      },
      instagram: {
        label: "Instagram",
        placeholder: "Insira o link do Instagram do local",
      },
      privatePhone: {
        label: "Telefone para cadastro *",
        placeholder: "Telefone que não será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      publicPhone: {
        label: "Telefone 1 exibido no mapa",
        placeholder: "Telefone que será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      publicPhoneAlt: {
        label: "Telefone 2 exibido no mapa",
        placeholder: "Telefone que será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
    },
    validationSchema: Yup.object({
      facebook: Yup.string().url("É preciso ser uma URL válida").notRequired(),
      instagram: Yup.string().url("É preciso ser uma URL válida").notRequired(),
      privatePhone: StringRequired,
      publicPhone: Yup.string().notRequired(),
      publicPhoneAlt: Yup.string().notRequired(),
      website: Yup.string().url("É preciso ser uma URL válida").notRequired(),
    }),
  });

  const [checkboxOneState, setCheckboxOneState] =
    React.useState<boolean>(false);
  const [checkboxTwoState, setCheckboxTwoState] =
    React.useState<boolean>(false);

  const formList = [step1, step2, step3, step4];

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

  const submitSpacesForm = () => {
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

    API.post("/spaces", aggregatedValues)
      .then((successMessage) => {
        console.log(successMessage);
        headerReturnAction();
        dispatch({ type: "SET_GLOBAL_LOADING_FALSE" });
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
        console.log(error);

        formList.forEach((form) => {
          form.formik.setSubmitting(false);
        });
      });

    console.log(stepOneValues, stepTwoValues, stepThreeValues, stepFourValues);
  };

  console.log(
    step1.formik.isValid,
    step2.formik.isValid,
    step3.formik.isValid,
    step4.formik.isValid
  );

  return (
    <FormPageContainer
      isSubmitting={isSubmitting}
      isValid={isValid}
      actionCancelFn={headerReturnAction}
      actionSubmitFn={submitSpacesForm}
      headerLabel="Espaços culturais"
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
        checkboxOneState={checkboxOneState}
        checkboxTwoCallback={() =>
          setCheckboxTwoState((prevState) => !prevState)
        }
        checkboxTwoState={checkboxTwoState}
      />
    </FormPageContainer>
  );
};

export default SpacesForm;
