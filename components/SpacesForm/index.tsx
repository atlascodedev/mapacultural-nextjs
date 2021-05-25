import React from "react";
import useFormGenerator from "../../hooks/useFormGenerator";
import { brazilStatesFlat, FormPageProps } from "../AgentForm";
import AtlasAccordion from "../Utility/Accordion";
import FormPageContainer from "../Utility/FormPageContainer";
import * as Yup from "yup";
import FieldWrapper from "../FormUtil/FieldWrapper";
import { accessibilityType, locationType } from "../../constants";
import { Checkbox, FormControlLabel } from "@material-ui/core";

interface ISpaceForm extends FormPageProps {}

let StringRequired = Yup.string().required("Este campo é obrigatório");

const SpacesForm = ({ headerReturnAction }: ISpaceForm) => {
  const { formik: stepOneForm, fields: stepOneFormFields } = useFormGenerator({
    fields: {
      registerEmail: {
        label: "E-mail para cadastro*",
        placeholder: "Digite seu e-mail",
      },
      publicEmail: {
        label: "E-mail exibido no mapa",
        placeholder: "Digite seu e-mail que aparecerá no mapa",
      },
      locationName: {
        label: "Nome do espaço *",
        placeholder: "Digite o nome do espaço",
      },
      locationRepresentative: {
        label: "Responsável pelo local *",
        placeholder: "Digite  seu nome completo",
      },
      cpfcnpj: {
        label: "CPNJ ou CPF do responsável",
        placeholder: "Digite seu CPF ou CPNJ",
      },
      sphere: {
        label: "Esfera *",
        type: "select",
        selectOptions: ["Espaço privado", "Espaço público"],
      },
      sphereType: {
        label: "Tipo de esfera *",
        type: "select",
        selectOptions: [
          "Federal",
          "Estadual",
          "Municipal",
          "Associação",
          "Empresa",
          "Empresa",
          "Fundação",
          "Particular",
          "Religiosa",
          "Mista",
          "Entidade sindical",
          "Coletivo",
          "Outros",
        ],
      },
      spaceCapacity: {
        label: "Capacidade de público *",
        type: "format",
        additionalProps: {
          NumberFormatProps: {
            suffix: " pessoas",
            prefix: "Até ",
          },
        },
      },
      openingHours: {
        label: "Horário de abertura *",
        type: "time",
      },
      closingHours: {
        label: "Horário de fechamento *",
        type: "time",
      },
      spaceEntry: {
        label: "Critérios de uso de espaço",
        type: "select",
        selectOptions: ["Acesso gratuíto", "Acesso pago", "Misto"],
      },
      description: {
        label: "Descrição do local *",
        placeholder: "Escreva uma descrição sobre o local",
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
      registerEmail: Yup.string().required("Este campo é obrigatório"),
      publicEmail: Yup.string().notRequired(),
      locationName: Yup.string().required("Este campo é obrigatório"),
      locationRepresentative: Yup.string().required("Este campo é obrigatório"),
      cpfcpnj: Yup.string().required("Este campo é obrigatório"),
      sphere: Yup.string().required("Este campo é obrigatório"),
      sphereType: Yup.string().required("Este campo é obrigatório"),
      spaceCapacity: Yup.string().required("Este campo é obrigatório"),
      openingHours: Yup.string().required("Este campo é obrigatório"),
      closingHours: Yup.string().required("Este campo é obrigatório"),
      spaceEntry: Yup.string().notRequired(),
      description: Yup.string().required("Este campo é obrigatório"),
    }),
  });

  const { formik: stepTwoForm, fields: stepTwoFormFields } = useFormGenerator({
    fields: {
      cep: {
        type: "format",
        label: "CEP *",
        placeholder: "Digite seu CEP",
        format: "#####-###",
      },
      street: {
        label: "Logradouro *",
        placeholder: "Rua, avenida, etc",
      },
      state: {
        label: "Estado *",
        type: "select",
        selectOptions: brazilStatesFlat,
      },
      city: {
        label: "Cidade *",
        placeholder: "Nome da sua cidade",
      },
      neighborhood: {
        label: "Bairro *",
        placeholder: "Nome do seu bairro",
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
      cep: Yup.string().required("Este campo é obrigatório"),
      street: StringRequired,
      state: StringRequired,
      city: StringRequired,
      neighborhood: StringRequired,
      streetNumber: StringRequired,
      complement: Yup.string().notRequired(),
    }),
  });

  const { formik: stepThreeForm, fields: stepThreeFields } = useFormGenerator({
    fields: {
      locationType: {
        label: "Tipo de local",
        type: "checkboxGroup",
        checkboxGroup: locationType,
      },
      accessibility: {
        label: "Acessibilidade",
        type: "select",
        selectOptions: ["Sim", "Não"],
        additionalProps: {
          TextFieldProps: {
            className: "md:self-center",
          },
        },
      },
      accessibilityType: {
        label: "Acessibilidade física",
        type: "checkboxGroup",
        checkboxGroup: accessibilityType,
      },
    },
    validationSchema: Yup.object({}),
  });

  const { formik: stepFourForm, fields: stepFourFields } = useFormGenerator({
    fields: {
      website: {
        label: "Insira o link do seu site",
        placeholder: "Coloque o link do site do local",
      },
      facebook: {
        label: "Insira o link do seu Facebook",
        placeholder: "Coloque o link do Facebook do local",
      },
      instagram: {
        label: "Insira o link do seu Instagram",
        placeholder: "Insira o link do Instagram do local",
      },
      privatePhone: {
        label: "Telefone para cadastro",
        placeholder: "Telefone que será exibido no website",
        type: "format",
        format: "(##) #-####-####",
      },
      publicPhoneOne: {
        label: "Telefone 1 exibido no mapa",
        placeholder: "Telefone que será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      publicPhoneTwo: {
        label: "Telefone 2 exibido no mapa",
        placeholder: "Telefone que será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
    },
    validationSchema: Yup.object({
      website: Yup.string().url("É preciso ser uma URL válida").notRequired(),
      facebook: Yup.string().url("É preciso ser uma URL válida").notRequired(),
      instagram: Yup.string().url("É preciso ser uma URL válida").notRequired(),
      privatePhone: StringRequired,
      publicPhoneOne: Yup.string().notRequired(),
      publicPhoneTwo: Yup.string().notRequired(),
    }),
  });

  return (
    <FormPageContainer
      actionCancelFn={() => console.log("cancel me")}
      actionSubmitFn={() => console.log("submit me")}
      headerLabel="Espaços culturais"
      headerReturnAction={headerReturnAction}
    >
      <div className="my-10">
        <AtlasAccordion shadow fullWidth label="Etapa 1">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepOneFormFields.map((values, index) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  {...values}
                  key={index}
                  formik={stepOneForm}
                />
              );
            })}
          </div>
        </AtlasAccordion>
      </div>

      <div className="my-10">
        <AtlasAccordion shadow fullWidth label="Etapa 2">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            {stepTwoFormFields.map((values, index) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  {...values}
                  key={index}
                  formik={stepTwoForm}
                />
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
                  variant="outlined"
                  {...values}
                  key={index}
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
            {stepFourFields.map((values, index) => {
              return (
                <FieldWrapper
                  variant="outlined"
                  {...values}
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

export default SpacesForm;
