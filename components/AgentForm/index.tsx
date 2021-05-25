import {
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ptBR } from "date-fns/locale";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import AtlasAccordion from "../Utility/Accordion";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormPageContainer, { IFormPage } from "../Utility/FormPageContainer";
import { AnimatePresence, motion } from "framer-motion";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { MdEvent } from "react-icons/md";
import NumberFormat from "react-number-format";
import TransferList from "../TransferList";
import useFormGenerator from "../../hooks/useFormGenerator";
import FieldWrapper from "../FormUtil/FieldWrapper";

type FormPageProps = Pick<IFormPage, "headerReturnAction">;

export interface IAgentForm extends FormPageProps {}
const AgentForm = ({ headerReturnAction }: IAgentForm) => {
  let brazilStatesFlat = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazons",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ];

  let categoriesMap = [
    "Artes visuais",
    "Artesanato",
    "Audiovisual",
    "Circo",
    "Cultural popular",
    "Cultura viva",
    "Dança",
    "Folclore",
    "Literatura/Leitura/Livro/Diversidade linguística",
    "Memória e patrimônio",
    "Museu",
    "Música",
    "Produção cultural",
    "Rádio",
    "Teatro",
    "Tradicionalismo",
    "Outros",
  ];

  const [entityType, setEntityType] =
    React.useState<"pessoa_juridica" | "pessoa_fisica">("pessoa_fisica");

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

  let { formik: pessoaFisicaForm, fields: pessoaFisicaFields } =
    useFormGenerator({
      fields: {
        registerEmail: {
          type: "text",
          label: "Email de cadastro*",
          placeholder: "Digite seu e-mail",
        },
        publicEmail: {
          type: "text",
          label: "Email exibido no mapa",
          placeholder: "Digite o e-amil que aparecerá no site",
        },
        fullName: {
          label: "Nome completo *",
          placeholder: "Digite seu nome completo",
        },
        publicName: {
          label: "Nome que aparecerá no site *",
          placeholder: "Digite o nome que aparecerá no mapa",
        },
        birthDay: {
          label: "Data de nascimento",
          type: "date",
        },
        cpf: {
          label: "Insira seu CPF *",
          format: "###.###.###-##",
          type: "format",
        },
        gender: {
          label: "Gênero *",
          type: "select",
          selectOptions: [
            "Homem",
            "Homem trans",
            "Mulher",
            "Mulher Trans",
            "Não-binário",
            "Travesi",
          ],
        },
        race: {
          label: "Raça/cor *",
          type: "select",
          selectOptions: ["Branca", "Indígena", "Parda", "Preta", "Amarela"],
        },
        professionalRecord: {
          label: "DRT, OMB ou outro registro profissional",
          placeholder: "Preencha seu registro profissional",
        },
        description: {
          label: "Descrição pessoal *",
          placeholder: "Descrição pessoal",
          additionalProps: {
            TextFieldProps: {
              className: "col-span-2",
              multiline: true,
              rows: 6,
            },
          },
        },
      },
      validationSchema: Yup.object({}),
    });

  let { formik: pessoaJuridicaForm, fields: pessoaJuridicaFields } =
    useFormGenerator({
      fields: {
        registerEmail: {
          label: "E-mail de cadastro*",
          placeholder: "Digite seu e-email",
        },
        publicEmail: {
          label: "E-mail exibido no mapa",
          placeholder: "Digite aqui o e-mail que aparecerá no mapa",
        },
        companyName: {
          label: "Razão social",
          placeholder: "Nome da sua empresa",
        },
        companyPublicName: {
          label: "Nome que aparecerá no site",
          placeholder: "Digite o nome que aparecerá no site",
        },
        companyCreationDate: {
          type: "date",
          label: "Data de fundação",
        },
        cpnj: {
          type: "format",
          label: "Insira seu CPNJ *",
          format: "##.###.###/####-##",
        },
        professionalRecord: {
          label: "DRT, OMB ou registro profissional",
          placeholder: "Preencha seu registro profissional",
        },
        description: {
          label: "Descrição pessoal *",
          placeholder: "Escreva uma descrição sobre você e seus trabalhos",
          additionalProps: {
            TextFieldProps: {
              className: "col-span-2",
              multiline: true,
              rows: 6,
            },
          },
        },
      },
      validationSchema: Yup.object({
        registerEmail: Yup.string()
          .email("Precisa ser um e-mail válido")
          .required(requiredMessage),
        publicEmail: Yup.string()
          .email("Precisa ser um e-mail válido")
          .required(requiredMessage),
        companyName: Yup.string().required(requiredMessage),
        companyPublicName: Yup.string().required(requiredMessage),
        companyCreationDate: Yup.date().required("Este campo é obrigatório"),
        cpnj: Yup.string().required(requiredMessage),
        professionalRecord: Yup.string().notRequired(),
        description: Yup.string().required(requiredMessage),
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

  let { formik: categoriesList, fields: categoryField } = useFormGenerator({
    fields: {
      categories: {
        type: "transfer",
        transferOptions: ["1", "2"],
      },
    },
    validationSchema: Yup.object({}),
  });

  console.log(categoriesList.values);

  return (
    <FormPageContainer
      actionCancelFn={() => console.log("cancel me")}
      actionSubmitFn={() => console.log("this submits")}
      headerLabel={"Agentes culturais"}
      headerReturnAction={headerReturnAction}
    >
      <div className="w-full  flex justify-center py-5 pb-8">
        <TextField
          variant="outlined"
          style={{ minWidth: "200px" }}
          onChange={(event) => setEntityType(event.target.value as any)}
          select
          label="Escolha uma opção"
          value={entityType}
        >
          <MenuItem value="pessoa_fisica">Pessoa física</MenuItem>
          <MenuItem value="pessoa_juridica">Pessoa jurídica</MenuItem>
        </TextField>
      </div>

      <AtlasAccordion
        shadow
        fullWidth
        label={`Etapa 1 (${
          entityType === "pessoa_fisica" ? "Pessoa física" : "Pessoa jurídica"
        })`}
      >
        <AnimatePresence exitBeforeEnter>
          <div>
            {entityType === "pessoa_fisica" && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {pessoaFisicaFields.map((value, index) => {
                  return (
                    <FieldWrapper
                      formik={pessoaFisicaForm}
                      {...value}
                      variant="outlined"
                    />
                  );
                })}
              </motion.div>
            )}
            {entityType === "pessoa_juridica" && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 grid-flow-row md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {pessoaJuridicaFields.map((value, index) => {
                  return (
                    <FieldWrapper
                      formik={pessoaJuridicaForm}
                      {...value}
                      variant="outlined"
                    />
                  );
                })}
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </AtlasAccordion>

      <div className="my-10">
        <AtlasAccordion label="Etapa 2 (Áreas de atuação)" fullWidth shadow>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
            <div className="col-span-2">
              <div className="font-bold text-center my-5">
                Escolha as áreas de atuação
              </div>
              {categoryField.map((value, index) => {
                return (
                  <FieldWrapper
                    {...value}
                    formik={categoriesList}
                    key={index}
                  />
                );
              })}
            </div>
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
    </FormPageContainer>
  );
};

export default AgentForm;
