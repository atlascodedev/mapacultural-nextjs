import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";
import AtlasAccordion from "../../Utility/Accordion";
import * as Yup from "yup";
import FormPageContainer, { IFormPage } from "../../Utility/FormPageContainer";
import useFormGenerator from "../../../hooks/useFormGenerator";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import { brazilStatesFlat, categories } from "../../../constants";

export type FormPageProps = Pick<IFormPage, "headerReturnAction">;

export interface IAgentForm extends FormPageProps {}
const AgentForm = ({ headerReturnAction }: IAgentForm) => {
  let requiredMessage = "Este campo é obrigatório";

  let { formik: stepFourForm, fields: stepFourFields } = useFormGenerator({
    fields: {
      website: {
        type: "text",
        label: "Insira o link do seu website",
        placeholder: "https://seuwebsite.com",
      },
      facebook: {
        type: "text",
        label: "Insira o link do seu Facebook",
        placeholder: "https://facebook.com/NomeDaSuaPagina",
      },
      instagram: {
        type: "text",
        label: "Insira o link do seu Instagram",
        placeholder: "https://instagram.com/NomeDaSuaPagina",
      },
      privatePhone: {
        type: "format",
        label: "Telefone para cadastro *",
        placeholder: "Telefone que não será exibido no mapa",
        format: "(##) #-####-####",
      },

      publicPhone: {
        type: "format",
        label: "Telefone exibido no mapa",
        format: "(##) #-####-####",
        placeholder: "Telefone que será exibido no website",
      },

      portfolio: {
        type: "text",
        label: "Links do seu trabalho",
        placeholder: "Ex. Youtube",
      },
    },
    validationSchema: Yup.object({
      website: Yup.string()
        .url("É preciso ser uma URL válida")
        .required(requiredMessage),
      facebook: Yup.string()
        .url("É preciso ser uma URL válida")
        .required(requiredMessage),
      instagram: Yup.string()
        .url("É preciso ser uma URL válida")
        .required(requiredMessage),
      privatePhone: Yup.string().required(requiredMessage),
      publicPhone: Yup.string().required(requiredMessage),
      portfolio: Yup.string()
        .url("É preciso ser uma URL válida")
        .required(requiredMessage),
    }),
  });

  let { formik: addressForm, fields: addressFields } = useFormGenerator({
    fields: {
      cep: {
        type: "format",
        format: "#####-##",
        placeholder: "Digite seu CEP",
        label: "CEP *",
      },
      street: {
        placeholder: "Rua, avenida, etc",
        label: "Logradouro *",
      },
      state: {
        type: "select",
        selectOptions: brazilStatesFlat,
        label: "Estado *",
      },
      city: {
        label: "Cidade *",
      },
      neighborhood: {
        label: "Bairro",
      },
      streetNumber: {
        label: "Número *",
      },
      complement: {
        label: "Complemento",
      },
    },
    validationSchema: Yup.object({
      cep: Yup.string().required(requiredMessage),
      street: Yup.string().required(requiredMessage),
      state: Yup.string().required(requiredMessage),
      city: Yup.string().required(requiredMessage),
      neighborhood: Yup.string().required(requiredMessage),
      streetNumber: Yup.string().required(requiredMessage),
      complement: Yup.string().notRequired(),
    }),
  });

  let { formik: checkboxGroupForm, fields: checkboxFields } = useFormGenerator({
    fields: {
      group: {
        label: "Selecione as áreas de atuação",
        type: "checkboxGroup",
        checkboxGroup: categories,
        initialValue: [],
      },
    },
    validationSchema: Yup.object({}),
  });

  return (
    <FormPageContainer
      actionCancelFn={() => console.log("cancel me")}
      actionSubmitFn={() => console.log("this submits")}
      headerLabel={"Agentes culturais"}
      headerReturnAction={headerReturnAction}
    >
      <div className="my-10">
        <AtlasAccordion fullWidth shadow label="Etapa 2 (Áreas de atuação)">
          <div className="my-5">
            {checkboxFields.map((value, index) => {
              return (
                <FieldWrapper
                  key={index}
                  {...value}
                  formik={checkboxGroupForm}
                />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>
      <div className="my-10">
        <AtlasAccordion label="Etapa 3 (Endereço)" fullWidth shadow>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {addressFields.map((value, index) => {
              return (
                <FieldWrapper
                  formik={addressForm}
                  variant="outlined"
                  {...value}
                />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>

      <div className="my-10">
        <AtlasAccordion
          fullWidth
          shadow
          label="Etapa 4 (Redes sociais e contato)"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepFourFields.map((value, index: number) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  formik={stepFourForm}
                  {...value}
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
