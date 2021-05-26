import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import AtlasAccordion from "../../Utility/Accordion";
import * as Yup from "yup";
import FormPageContainer, { IFormPage } from "../../Utility/FormPageContainer";
import useFormGenerator, {
  IFieldWrapperInternal,
} from "../../../hooks/useFormGenerator";
import FieldWrapper, { IFieldWrapperBase } from "../../FormUtil/FieldWrapper";
import { brazilStates, categories, genders, races } from "../../../constants";
import {
  IAgentAddressInfo,
  IAgentCategories,
  IAgentModel,
  IAgentPersonalInfo,
  IAgentSocialInfo,
} from "../../../@types/project";
import { OptionalObjectSchema } from "yup/lib/object";

export type FormPageProps = Pick<IFormPage, "headerReturnAction">;

export interface IAgentForm extends FormPageProps {}
const AgentForm = ({ headerReturnAction }: IAgentForm) => {
  let requiredMessage = "Este campo é obrigatório";

  let StringRequired = Yup.string().required(requiredMessage);

  let { fields: stepOneFields, formik: stepOneFormik } = useFormGenerator({
    fields: {
      agentType: {
        label: "Tipo de agente",
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
    } as Record<keyof IAgentPersonalInfo, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      agentType: StringRequired,
      birthday_or_founding: StringRequired,
      cpf_or_cnpj: StringRequired,
      fullName: StringRequired,
      gender: StringRequired,
      professionalRecord: Yup.string().notRequired(),
      publicEmail: Yup.string()
        .email("É preciso ser um e-mail válido")
        .notRequired(),
      publicName: StringRequired,
      race: StringRequired,
      registrationEmail: Yup.string()
        .email("É preciso ser um e-mail válido")
        .required(requiredMessage),
    } as Record<keyof IAgentPersonalInfo, any>),
  });

  let { fields: stepTwoFields, formik: stepTwoFormik } = useFormGenerator({
    fields: {
      categories: {
        label: "Selecione as áreas de atuação",
        checkboxGroup: categories,
        type: "checkboxGroup",
      },
    } as Record<keyof IAgentCategories, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      categories: Yup.array().min(0, "Marque pelo menos 1 item"),
    } as Record<keyof IAgentCategories, any>),
  });

  let { fields: stepThreeFields, formik: stepThreeFormik } = useFormGenerator({
    fields: {
      cep: {
        label: "CEP *",
        format: "#####-###",
        type: "format",
      },
      city: {
        label: "Cidade *",
        placeholder: "Nome da sua cidade",
      },
      complement: {
        label: "Complemento",
        placeholder: "Ex. apartamento, proximidades etc",
      },
      neighborhood: {
        label: "Bairro *",
        placeholder: "Nome do seu bairro",
      },
      state: {
        type: "select",
        selectOptions: brazilStates,
        label: "Estado *",
      },
      street: {
        label: "Logradouro *",
        placeholder: "Rua, avenida, etc",
      },
      streetNumber: {
        label: "Número *",
        placeholder: "Número da sua rua",
      },
    } as Record<keyof IAgentAddressInfo, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      cep: StringRequired,
      city: StringRequired,
      complement: Yup.string().notRequired(),
      neighborhood: StringRequired,
      state: StringRequired,
      street: StringRequired,
      streetNumber: StringRequired,
    } as Record<keyof IAgentAddressInfo, any>),
  });

  let { fields: stepFourFields, formik: stepFourFormik } = useFormGenerator({
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
    } as Record<keyof IAgentSocialInfo, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      facebook: Yup.string().url("Precisa ser uma URL válida").notRequired(),
      instagram: Yup.string().url("Precisa ser uma URL válida").notRequired(),
      phoneNumber: StringRequired,
      publicPhoneNumber: Yup.string().notRequired(),
      portfolio: Yup.string().url("Precisa ser uma URL válida").notRequired(),
      website: Yup.string().url("Precisa ser uma URL válida").notRequired(),
    } as Record<keyof IAgentSocialInfo, any>),
  });

  return (
    <FormPageContainer
      actionCancelFn={() => console.log("cancel me")}
      actionSubmitFn={() => console.log("this submits")}
      headerLabel={"Agentes culturais"}
      headerReturnAction={headerReturnAction}
    >
      <div className="my-10">
        <AtlasAccordion fullWidth shadow label="Etapa 1">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepOneFields.map((value, index) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  {...value}
                  key={index}
                  formik={stepOneFormik}
                />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>
      <div className="my-10">
        <AtlasAccordion fullWidth shadow label="Etapa 2">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepTwoFields.map((value, index) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  {...value}
                  key={index}
                  formik={stepTwoFormik}
                />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>

      <div className="my-10">
        <AtlasAccordion fullWidth shadow label="Etapa 3">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepThreeFields.map((value, index) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  {...value}
                  key={index}
                  formik={stepThreeFormik}
                />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>

      <div className="my-10">
        <AtlasAccordion fullWidth shadow label="Etapa 4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepFourFields.map((value, index) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  {...value}
                  key={index}
                  formik={stepFourFormik}
                />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>

      <div className="flex flex-col w-full px-5 gap-10">
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => {
                console.log("checked");
              }}
            />
          }
          label={
            "O declarante é responsável pela veracidade das informações inseridas na base de dados"
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => {
                console.log("checked");
              }}
            />
          }
          label={
            "Ao informar meus dados, eu concordo com a Política de Privacidade e com os termos de uso."
          }
        />
      </div>
    </FormPageContainer>
  );
};

export default AgentForm;
