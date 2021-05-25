import React from "react";
import { brazilStatesFlat, FormPageProps } from "../AgentForm";
import * as Yup from "yup";
import FormPageContainer from "../Utility/FormPageContainer";
import AtlasAccordion from "../Utility/Accordion";
import useFormGenerator from "../../hooks/useFormGenerator";
import FieldWrapper from "../FormUtil/FieldWrapper";
import { categories } from "../../constants";
import { Checkbox, FormControlLabel } from "@material-ui/core";

interface IEventForms extends FormPageProps {}

let StringRequired = Yup.string().required("Este campo é obrigatório");

const EventsForm = ({ headerReturnAction }: IEventForms) => {
  const { formik: stepOneFormik, fields: stepOneFields } = useFormGenerator({
    fields: {
      registerEmail: {
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
      eventTime: {
        label: "Horário da realização *",
        type: "time",
      },
      eventDate: {
        label: "Data do evento *",
        type: "date",
      },
      eventAgeRestriction: {
        label: "Classificação indicativa *",
        type: "select",
        selectOptions: ["Livre", "10", "12", "14", "16", "18"],
      },
      eventEntryType: {
        label: "Tipo de entrada *",
        type: "select",
        selectOptions: ["Acesso gratuito", "Acesso misto", "Acesso pago"],
      },
      eventEntryDescription: {
        label: "Descrição do tipo de entrada",
        placeholder: "Descreva o tipo de pagamento, caso misto ou pago",
      },
      eventFrequency: {
        label: "Frequência do evento",
        type: "select",
        selectOptions: [
          "Semanal",
          "Quinzenal",
          "Mensal",
          "Semestral",
          "Anual",
          "Única apresentação",
        ],
      },
      eventDescription: {
        label: "Descrição do evento *",
        placeholder: "Descreva o evento",
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
      registerEmail: Yup.string()
        .email("É preciso ser um e-mail válido")
        .required("Este campo é obrigatório"),

      publicEmail: Yup.string()
        .email("É preciso ser um e-mail válido")
        .required("Este campo é obrigatório"),

      eventName: StringRequired,
      eventHead: StringRequired,
      eventTime: StringRequired,
      eventDate: StringRequired,
      eventAgeRestriction: StringRequired,
      eventEntryType: StringRequired,
      eventEntryDescription: Yup.string().notRequired(),
      eventFrequency: StringRequired,
      eventDescription: Yup.string().notRequired(),
    }),
  });

  const { formik: stepTwoFormik, fields: stepTwoFields } = useFormGenerator({
    fields: {
      categories: {
        type: "checkboxGroup",
        checkboxGroup: categories,
        label: "Selecione as áreas de atuação",
      },
    },
    validationSchema: Yup.object({}),
  });

  const { formik: stepThreeForm, fields: stepThreeFields } = useFormGenerator({
    fields: {
      eventType: {
        label: "Tipo de evento *",
        type: "select",
        selectOptions: ["Físico", "híbrido", "online"],
      },
      cep: {
        label: "CEP",
        type: "format",
        format: "#####-###",
        placeholder: "Digite o CEP caso seja um evento físico",
      },
      street: {
        label: "Logradouro *",
        placeholder: "Ex. rua, avenida, etc",
      },
      city: {
        label: "Cidade *",
        placeholder: "Nome da sua cidade",
      },
      state: {
        type: "select",
        label: "Estado *",
        selectOptions: brazilStatesFlat,
      },
      neighborhood: {
        label: "Bairro *",
        placeholder: "Digite seu bairro",
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
      eventType: StringRequired,
      cep: Yup.string().notRequired(),
      street: StringRequired,
      city: StringRequired,
      state: StringRequired,
      neighborhood: StringRequired,
      streetNumber: StringRequired,
      complement: Yup.string().notRequired(),
    }),
  });

  const { formik: stepFourForm, fields: stepFourFields } = useFormGenerator({
    fields: {
      website: {
        label: "Link do seu site",
        placeholder: "Coloque o link do seu site",
      },
      eventOnlineLink: {
        label: "Link do evento online",
        placeholder: "Coloque o link do seu evento online",
      },
      privatePhone: {
        label: "Contato para informações *",
        type: "format",
        format: "(##) #-####-####",
      },
      publicPhone: {
        label: "Telefone 1",
        placeholder: "Telefone que será exibido no site",
      },
    },
    validationSchema: Yup.object({
      website: Yup.string()
        .url("Precisa ser uma URL válida")
        .required("Este campo é obrigatório"),
      eventOnlineLink: Yup.string()
        .url("Precisa ser uma URL válida")
        .required("Este campo é obrigatório"),
      privatePhone: Yup.string().required("Este campo é obrigatório"),
      publicPhone: Yup.string().notRequired(),
    }),
  });

  return (
    <FormPageContainer
      headerLabel={"Eventos"}
      actionCancelFn={() => console.log("this cancels")}
      actionSubmitFn={() => console.log("this submits")}
      headerReturnAction={headerReturnAction}
    >
      <div className="my-10">
        <AtlasAccordion shadow fullWidth label="Etapa 1">
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
        <AtlasAccordion shadow fullWidth label="Etapa 2">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepTwoFields.map((value, index) => {
              return (
                <FieldWrapper {...value} key={index} formik={stepTwoFormik} />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>
      <div className="my-10">
        <AtlasAccordion shadow fullWidth label="Etapa 3">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepThreeFields.map((values, index) => {
              return (
                <FieldWrapper
                  {...values}
                  key={index}
                  variant="outlined"
                  formik={stepThreeForm}
                />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>
      <div className="my-10">
        <AtlasAccordion shadow fullWidth label="Etapa 4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepFourFields.map((value, index) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  {...value}
                  key={index}
                  formik={stepFourForm}
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

export default EventsForm;
