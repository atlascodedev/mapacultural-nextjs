import React from "react";
import AtlasAccordion from "../../Utility/Accordion";
import * as Yup from "yup";
import FormPageContainer, { IFormPage } from "../../Utility/FormPageContainer";
import useFormGenerator from "../../../hooks/useFormGenerator";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import {
  API,
  categories,
  genders,
  races,
  taquaraNeighborhoods,
} from "../../../constants";
import {
  IAgentAddressInfo,
  IAgentCategories,
  IAgentPersonalInfo,
  IAgentSocialInfo,
} from "../../../@types/project";
import TermsCheckbox from "../../FormUtil/TermsCheckbox";

export type FormPageProps = Pick<IFormPage, "headerReturnAction">;

export interface IAgentForm extends FormPageProps {}
const AgentForm = ({ headerReturnAction }: IAgentForm) => {
  let requiredMessage = "Este campo é obrigatório";
  let StringRequired = Yup.string().required(requiredMessage);

  const [checkBoxOneChecked, setCheckboxOneChecked] =
    React.useState<boolean>(false);

  const [checkBoxTwoChecked, setCheckBoxTwoChecked] =
    React.useState<boolean>(false);

  const step1 = useFormGenerator<IAgentPersonalInfo>({
    fields: {
      agentType: {
        label: "Tipo de agente",
        type: "select",
        selectOptions: ["Pessoa física", "Pessoa jurídica"],
      },

      birthday_or_founding: {
        label: "Data de nascimento/Data de fundação",
        type: "date",
      },
      cpf_or_cnpj: {
        label: "CPF/CPNJ *",
        placeholder: "Digite seu CPF ou CPNJ",
      },
      fullName: {
        label: "Nome completo *",
        placeholder: "Digite seu nome completo",
      },
      gender: {
        label: "Gênero",
        selectOptions: genders,
        type: "select",
      },
      professionalRecord: {
        label: "DRT, OMB ou outro registro profissional",
        placeholder: "Preencha seu registro profissional",
      },
      publicEmail: {
        label: "E-mail exibido no mapa",
        placeholder: "Digite o e-mail que aparecerá no mapa",
      },
      publicName: {
        label: "Nome exibido no mapa",
        placeholder: "Digite o nome que aparecerá no mapa",
      },
      race: {
        label: "Raça/cor",
        type: "select",
        selectOptions: races,
      },
      registrationEmail: {
        label: "E-mail de cadastro *",
        placeholder: "Digite seu e-mail",
      },
    },
    validationSchema: Yup.object({
      agentType: StringRequired,
      birthday_or_founding: StringRequired,
      cpf_or_cnpj: StringRequired,
      fullName: StringRequired,
      gender: StringRequired as any,
      professionalRecord: Yup.string().notRequired(),
      publicEmail: Yup.string()
        .email("É preciso ser um e-mail válido")
        .notRequired(),
      publicName: StringRequired,
      race: StringRequired as any,
      registrationEmail: Yup.string()
        .email("É preciso ser um e-mail válido")
        .required(requiredMessage),
    }),
  });

  const step2 = useFormGenerator<IAgentCategories>({
    fields: {
      categories: {
        label: "Selecione as áreas de atuação",
        checkboxGroup: categories,
        type: "checkboxGroup",
      },
    },
    validationSchema: Yup.object({
      categories: Yup.array().min(0, "Marque pelo menos 1 item"),
    } as Record<keyof IAgentCategories, any>),
  });

  const step3 = useFormGenerator<IAgentAddressInfo>({
    fields: {
      cep: {
        label: "CEP *",
        format: "#####-###",
        type: "format",
      },
      neighborhood: {
        label: "Bairro *",
        type: "select",
        selectOptions: taquaraNeighborhoods,
        placeholder: "Nome do seu bairro",
      },
      street: {
        label: "Logradouro *",
        placeholder: "Rua, avenida, etc",
      },
      streetNumber: {
        label: "Número *",
        placeholder: "Número da sua rua",
      },
      complement: {
        label: "Complemento",
        placeholder: "Ex. apartamento, proximidades etc",
      },
    },
    validationSchema: Yup.object({
      cep: StringRequired,
      complement: Yup.string().notRequired(),
      neighborhood: StringRequired,
      street: StringRequired,
      streetNumber: StringRequired,
    }),
  });

  const step4 = useFormGenerator<IAgentSocialInfo>({
    fields: {
      facebook: {
        label: "Facebook",
        placeholder: "Link do seu Facebook",
      },
      instagram: {
        label: "Instagram",
        placeholder: "Link do seu Instagram",
      },
      phoneNumber: {
        label: "Telefone para cadastro *",
        placeholder: "Telefone que não será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      portfolio: {
        label: "Link dos seus trabalhos",
        placeholder: "Ex. Youtube e etc",
      },
      publicPhoneNumber: {
        label: "Telefone exibido no mapa",
        placeholder: "Telefone que será exibido no mapa",
        type: "format",
        format: "(##) #-####-####",
      },
      website: {
        label: "Link do seu website",
        placeholder: "Insira o link do seu website",
      },
    },
    validationSchema: Yup.object({
      facebook: Yup.string().url("Precisa ser uma URL válida").notRequired(),
      instagram: Yup.string().url("Precisa ser uma URL válida").notRequired(),
      phoneNumber: StringRequired,
      publicPhoneNumber: Yup.string().notRequired(),
      portfolio: Yup.string().url("Precisa ser uma URL válida").notRequired(),
      website: Yup.string().url("Precisa ser uma URL válida").notRequired(),
    }),
  });

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
    checkBoxOneChecked &&
    checkBoxTwoChecked;

  const submitAgentForm = () => {
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

    API.post("/agents", aggregatedValues)
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
      actionCancelFn={headerReturnAction}
      actionSubmitFn={submitAgentForm}
      headerLabel={"Agentes culturais"}
      headerReturnAction={headerReturnAction}
    >
      {formList.map((form, indexOuter) => {
        return (
          <div key={indexOuter} className={`my-10`}>
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
          setCheckboxOneChecked((prevState) => !prevState)
        }
        checkboxOneState={checkBoxOneChecked}
        checkboxTwoCallback={() =>
          setCheckBoxTwoChecked((prevState) => !prevState)
        }
        checkboxTwoState={checkBoxTwoChecked}
      />
    </FormPageContainer>
  );
};

export default AgentForm;
