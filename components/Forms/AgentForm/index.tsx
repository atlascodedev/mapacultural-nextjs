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
import { MenuItem, TextField } from "@material-ui/core";
import useGlobalUI from "../../../context/global_ui/hook";
import { nanoid } from "nanoid";

export type FormPageProps = Pick<IFormPage, "headerReturnAction">;

export interface IAgentForm extends FormPageProps {}
const AgentForm = ({ headerReturnAction }: IAgentForm) => {
  let requiredMessage = "Este campo é obrigatório";
  let StringRequired = Yup.string().required(requiredMessage);

  const { dispatch } = useGlobalUI();

  const [checkBoxOneChecked, setCheckboxOneChecked] =
    React.useState<boolean>(false);

  const [checkBoxTwoChecked, setCheckBoxTwoChecked] =
    React.useState<boolean>(false);

  const [agentTypeOuter, setAgentTypeOuter] =
    React.useState<string>("Pessoa física");

  const step1Juridica = useFormGenerator<IAgentPersonalInfo>({
    fields: {
      fullName: {
        label: "Nome da empresa",
        placeholder: "Digite o nome da sua empresa",
      },
      birthday_or_founding: {
        label: "Data de fundação",
        type: "date",
      },
      cpf_or_cnpj: {
        label: "CPNJ *",
        type: "format",
        format: "##.###.###/####-##",
      },
      gender: {
        label: "",
        type: "nullable",
      },

      publicEmail: {
        label: "E-mail público",
        placeholder: "E-mail que aparecerá no website",
      },
      publicName: {
        label: "Nome público",
        placeholder: "Nome que aparecerá no website",
      },
      race: {
        type: "nullable",
        label: "",
      },
      registrationEmail: {
        label: "E-mail de cadastro",
        placeholder: "E-mail que NÃO aparecerá no website",
      },
      professionalRecord: {
        label: "Registro profissional",
        placeholder: "DRT, OMB ou outro registro profissional",
      },
      description: {
        label: "Descrição pessoal *",
        placeholder: "Uma descrição sobre sua empresa",
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
      birthday_or_founding: Yup.string().required("Este campo é obrigatório"),
      cpf_or_cnpj: StringRequired,
      description: StringRequired,
      fullName: StringRequired as any,
      gender: Yup.string().notRequired() as any,
      professionalRecord: Yup.string().notRequired(),
      publicEmail: StringRequired,
      publicName: StringRequired,
      race: Yup.string().notRequired() as any,
      registrationEmail: StringRequired,
    }),
  });

  const step1Fisica = useFormGenerator<IAgentPersonalInfo>({
    fields: {
      fullName: {
        label: "Nome completo *",
        placeholder: "Digite seu nome completo",
      },
      birthday_or_founding: {
        label: "Data de nascimento",
        type: "date",
      },
      cpf_or_cnpj: {
        label: "CPF *",
        placeholder: "Digite seu CPF",
        type: "format",
        format: "###.###.###-##",
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
      description: {
        label: "Descrição pessoal *",
        placeholder:
          "Escreava uma descrição pessoal sobre você e seus trabalhos",
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
      description: StringRequired,
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
        checkboxGroup: [...categories] as any,
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
      neighborhood: StringRequired as any,
      street: StringRequired,
      streetNumber: StringRequired,
    }),
  });

  const step4 = useFormGenerator<IAgentSocialInfo>({
    fields: {
      phoneNumber: {
        label: "Telefone para cadastro *",
        placeholder: "Telefone que não será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      facebook: {
        label: "Facebook",
        placeholder: "Link do seu Facebook",
      },
      instagram: {
        label: "Instagram",
        placeholder: "Link do seu Instagram",
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

  const formList = [
    agentTypeOuter === "Pessoa física" ? step1Fisica : step1Juridica,
    step2,
    step3,
    step4,
  ];

  React.useEffect(() => {
    step1Juridica.formik.resetForm();
    step1Fisica.formik.resetForm();
  }, [agentTypeOuter]);

  const isSubmitting: boolean =
    step1Fisica.formik.isSubmitting ||
    step1Juridica.formik.isSubmitting ||
    step2.formik.isSubmitting ||
    step3.formik.isSubmitting ||
    step4.formik.isSubmitting;

  const stepOneValid: boolean =
    (agentTypeOuter === "Pessoa física" && step1Fisica.formik.isValid) ||
    (agentTypeOuter === "Pessoa jurídica" && step1Juridica.formik.isValid);

  const isValid: boolean =
    stepOneValid &&
    step2.formik.isValid &&
    step3.formik.isValid &&
    step4.formik.isValid &&
    checkBoxOneChecked &&
    checkBoxTwoChecked;

  const submitAgentForm = () => {
    const transactionUUID = nanoid();

    const stepOneValues =
      agentTypeOuter === "Pessoa física"
        ? step1Fisica.formik.values
        : step1Juridica.formik.values;
    const stepTwoValues = step2.formik.values;
    const stepThreeValues = step3.formik.values;
    const stepFourValues = step4.formik.values;

    const aggregatedValues = {
      agentType: agentTypeOuter,
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

    API.post("/agents", aggregatedValues)
      .then((successMessage) => {
        formList.forEach((form) => {
          form.formik.setSubmitting(false);
          form.formik.resetForm();
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

        formList.forEach((form) => {
          form.formik.setSubmitting(false);
        });
      });
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
      <div className="w-full justify-center flex">
        <TextField
          select
          variant="outlined"
          label="Tipo de agente"
          value={agentTypeOuter}
          onChange={(e) => setAgentTypeOuter(e.target.value)}
        >
          <MenuItem value={"Pessoa física"}>Pessoa física</MenuItem>
          <MenuItem value={"Pessoa jurídica"}>Pessoa jurídica</MenuItem>
        </TextField>
      </div>
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
