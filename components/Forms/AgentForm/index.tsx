import React from "react";
import AtlasAccordion from "../../Utility/Accordion";
import * as Yup from "yup";
import FormPageContainer, { IFormPage } from "../../Utility/FormPageContainer";
import useFormGenerator from "../../../hooks/useFormGenerator";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import TermsCheckbox from "../../FormUtil/TermsCheckbox";
import { MenuItem, TextField } from "@material-ui/core";
import useGlobalUI from "../../../context/global_ui/hook";
import {
  IAgentAddressInfo,
  IAgentCategories,
  IAgentPersonalInfo,
  IAgentSocialInfo,
} from "../types";
import isFormSubmitting from "../helper/isFormSubmitting";
import isFormValid from "../helper/isFormValid";
import submitGeneratedForm from "../helper/submitForm";
import { categories, genders, races, taquaraNeighborhoods } from "../constants";
import useFormCallback from "../hooks/useFormCallback";

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
      phoneNumber: {
        label: "Telefone para cadastro *",
        placeholder: "Telefone que não será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      publicPhoneNumber: {
        label: "Telefone exibido no mapa",
        placeholder: "Telefone que será exibido no mapa",
        type: "format",
        format: "(##) #-####-####",
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
      phoneNumber: StringRequired,
      publicPhoneNumber: Yup.string().notRequired(),
      birthday_or_founding: Yup.string().required("Este campo é obrigatório"),
      cpf_or_cnpj: StringRequired,
      description: StringRequired,
      fullName: StringRequired as any,
      gender: Yup.string().notRequired() as any,
      professionalRecord: Yup.string().notRequired(),
      publicEmail: Yup.string().notRequired(),
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
      phoneNumber: {
        label: "Telefone para cadastro *",
        placeholder: "Telefone que não será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      publicPhoneNumber: {
        label: "Telefone exibido no mapa",
        placeholder: "Telefone que será exibido no mapa",
        type: "format",
        format: "(##) #-####-####",
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
      phoneNumber: StringRequired,
      publicPhoneNumber: Yup.string().notRequired(),
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
        placeholder: "Digite apenas números",
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

  const step4 = useFormGenerator<IAgentSocialInfo>({
    fields: {
      facebook: {
        label: "Facebook",
        placeholder: "Ex: https://www.facebook.com/institutoprocidadania",
      },
      instagram: {
        label: "Instagram",
        placeholder:
          "Ex: https://www.instagram.com/institutogauchoprocidadania",
      },

      portfolio: {
        label: "Link dos seus trabalhos",
        placeholder: "Ex. Youtube e etc",
      },

      website: {
        label: "Link do seu website",
        placeholder: "Insira o link do seu website",
      },
    },
    validationSchema: Yup.object({
      facebook: Yup.string().notRequired(),
      instagram: Yup.string().notRequired(),
      portfolio: Yup.string().notRequired(),
      website: Yup.string().notRequired(),
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

  return (
    <FormPageContainer
      isSubmitting={isFormSubmitting(formList)}
      isValid={
        isFormValid(formList) && checkBoxOneChecked && checkBoxTwoChecked
      }
      actionCancelFn={headerReturnAction}
      actionSubmitFn={() =>
        submitGeneratedForm(
          formList,
          "/agents",
          { agentType: agentTypeOuter },
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
            <AtlasAccordion
              defaultOpen
              fullWidth
              shadow
              label={`Etapa ${indexOuter + 1}`}
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
