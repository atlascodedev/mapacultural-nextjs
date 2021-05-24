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
import TransferList from "./TransferList";
import FormikTextField from "../FormUtil/FormikTextField";
import useFormGenerator from "../../hooks/useFormGenerator";
import FieldWrapper from "../FormUtil/FieldWrapper";

type FormPageProps = Pick<IFormPage, "headerReturnAction">;

export interface IAgentForm extends FormPageProps {}
const AgentForm = ({ headerReturnAction }: IAgentForm) => {
  let brazillianStates: Array<{ key: string; value: string }> = [
    { key: "AC", value: "Acre" },
    { key: "AL", value: "Alagoas" },
    { key: "AP", value: "Amapá" },
    { key: "AM", value: "Amazonas" },
    { key: "BA", value: "Bahia" },
    { key: "CE", value: "Ceará" },
    { key: "DF", value: "Distrito Federal" },
    { key: "ES", value: "Espírito Santo" },
    { key: "GO", value: "Goiás" },
    { key: "MA", value: "Maranhão" },
    { key: "MT", value: "Mato Grosso" },
    { key: "MS", value: "Mato Grosso do Sul" },
    { key: "MG", value: "Minas Gerais" },
    { key: "PA", value: "Pará" },
    { key: "PB", value: "Paraíba" },
    { key: "PR", value: "Paraná" },
    { key: "PE", value: "Pernambuco" },
    { key: "PI", value: "Piauí" },
    { key: "RJ", value: "Rio de Janeiro" },
    { key: "RN", value: "Rio Grande do Norte" },
    { key: "RS", value: "Rio Grande do Sul" },
    { key: "RO", value: "Rondônia" },
    { key: "RR", value: "Roraima" },
    { key: "SC", value: "Santa Catarina" },
    { key: "SP", value: "São Paulo" },
    { key: "SE", value: "Sergipe" },
    { key: "TO", value: "Tocantins" },
  ];

  const [entityType, setEntityType] =
    React.useState<"pessoa_juridica" | "pessoa_fisica">("pessoa_fisica");

  const pessoaJuridicaForm = useFormik({
    initialValues: {
      registerEmail: "",
      publicEmail: "",
      businessName: "",
      publicName: "",
      creationDate: "",
      companyRegistrationNumber: "",
      professionalRecord: "",
      description: "",
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      registerEmail: Yup.string()
        .required("Este campo é obrigatório")
        .email("É necessário um e-mail válido"),
      publicEmail: Yup.string()
        .required("Este campo é obrigatório")
        .email("É necessário um e-mail válido"),
      businessName: Yup.string().required("Este campo é obrigatório"),
      publicName: Yup.string().required("Este campo é obrigatório"),
      creationDate: Yup.string().required("Este campo é obrigatório"),
      companyRegistrationNumber: Yup.string().required(
        "Este campo é obrigatório"
      ),
      professionalRecord: Yup.string().required("Este campo é obrigatório"),
      description: Yup.string().required("Este campo é obrigatório"),
    }),
    onSubmit: () => console.log("every mistake"),
  });

  const pessoaFisicaForm = useFormik({
    initialValues: {
      registerEmail: "",
      publicEmail: "",
      fullName: "",
      publicName: "",
      birthday: "",
      gender: "",
      race: "",
      professionalRecord: "",
      description: "",
      socialNumber: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      socialNumber: Yup.string().required("Este campo é obrigatório"),
      publicName: Yup.string().required("Este campo é obrigatório"),
      registerEmail: Yup.string()
        .required("Este campo é obrigatório")
        .email("É necessário um e-mail válido"),
      publicEmail: Yup.string()
        .required("Este campo é obrigatório")
        .email("É necessário um e-mail válido"),
      fullName: Yup.string().required("Este campo é obrigatório"),
      birthDay: Yup.string().required("Este campo é obrigatório"),
      gender: Yup.string().required("Este campo é obrigatório"),
      race: Yup.string().required("Este campo é obrigatório"),
      professionalRecord: Yup.string().required("Este campo é obrigatório"),
      description: Yup.string().required("Este campo é obrigatório"),
    }),

    onSubmit: () => console.log("take what you want"),
  });

  const mainForm = useFormik({
    initialValues: {
      categories: [],
      cep: "",
      street: "",
      state: "",
      city: "",
      neighborhood: "",
      streetNumber: "",
      complement: "",
      website: "",
      facebook: "",
      instagram: "",
      phoneNumber: "",
      publicPhoneNumber: "",
      portfolioLink: "",
    },
    enableReinitialize: true,
    onSubmit: () => console.log("form was submitted"),
    validationSchema: Yup.object({
      categories: Yup.array().min(1),
      cep: Yup.string().required("Este campo é obrigatório"),
      street: Yup.string().required("Este campo é obrigatório"),
      state: Yup.string().required("Este campo é obrigatório"),
      city: Yup.string().required("Este campo é obrigatório"),
      neighborhood: Yup.string().required("Este campo é obrigatório"),
      streetNumber: Yup.string().required("Este campo é obrigatório"),
      complement: Yup.string().required("Este campo é obrigatório"),
      website: Yup.string()
        .url("É preciso ser uma URL válida")
        .required("Este campo é obrigatório"),
      facebook: Yup.string()
        .url("É preciso ser uma URL válida")
        .required("Este campo é obrigatório"),
      instagram: Yup.string()
        .url("É preciso ser uma URL válida")
        .required("Este campo é obrigatório"),
      phoneNumber: Yup.string().required("Este campo é obrigatório"),
      publicPhoneNumber: Yup.string().required("Este campo é obrigatório"),
      portfolioLink: Yup.string()
        .url("É preciso ser uma URL válida")
        .required("Este campo é obrigatório"),
    }),
  });

  let { formik: stepFourForm, fields: stepFourFields } = useFormGenerator({
    fields: [
      {
        name: "website",
        initialValue: "",
        label: "Link do seu website",
        type: "text",
        placeholder: "Coloque o link do seu website",
      },
      {
        name: "facebook",
        initialValue: "",
        label: "Link do seu Facebook",
        type: "text",
        placeholder: "Coloque o link do seu Facebook",
      },
      {
        name: "Instagram",
        initialValue: "",
        label: "Link do seu Instagram",
        type: "text",
        placeholder: "Link de seu Instagram",
      },
      {
        name: "publicPhone",
        initialValue: "",
        label: "Telefone exibido no mapa",
        type: "format",
        placeholder: "Telefone que será exibido no site",
        format: "(##) #-####-####",
      },
      {
        name: "portfolio",
        initialValue: "",
        label: "Link de seus trabalhos",
        placeholder: "Ex. Youtube e etc",
        type: "text",
      },
    ],
    validationSchema: Yup.object({
      website: Yup.string()
        .url("É preciso ser uma URL válida")
        .required("Este campo é obrigatório"),
      facebook: Yup.string()
        .url("É preciso ser uma URL válida")
        .required("Este campo é obrigatório"),
      instagram: Yup.string()
        .url("É preciso ser uma URL válida")
        .required("Este campo é obrigatório"),
      publicPhone: Yup.string().required("Este campo é obrigatório"),
      portfolio: Yup.string()
        .url("É preciso ser uma URL válida")
        .required("Este campo é obrigatório"),
    }),
  });

  return (
    <FormPageContainer
      actionCancelFn={() => console.log("cancel me")}
      actionSubmitFn={() => console.log("this submits")}
      headerLabel={"Agentes culturais"}
      headerReturnAction={headerReturnAction}
    >
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
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
                  <FormikTextField
                    variant="outlined"
                    formik={pessoaFisicaForm}
                    name="registerEmail"
                    label="Email de cadastro"
                  />

                  <TextField
                    fullWidth
                    label="Email exibido no mapa"
                    value={pessoaFisicaForm.values["publicEmail"]}
                    onChange={pessoaFisicaForm.handleChange}
                    onBlur={pessoaFisicaForm.handleBlur}
                    error={Boolean(pessoaFisicaForm.errors["publicEmail"])}
                    helperText={pessoaFisicaForm.errors["publicEmail"]}
                    name="publicEmail"
                  />

                  <TextField
                    label="Nome completo"
                    value={pessoaFisicaForm.values["fullName"]}
                    onChange={pessoaFisicaForm.handleChange}
                    onBlur={pessoaFisicaForm.handleBlur}
                    error={Boolean(pessoaFisicaForm.errors["fullName"])}
                    helperText={pessoaFisicaForm.errors["fullName"]}
                    name="fullName"
                  />

                  <TextField
                    label="Nome que aparecerá no site*"
                    value={pessoaFisicaForm.values["publicName"]}
                    onChange={pessoaFisicaForm.handleChange}
                    onBlur={pessoaFisicaForm.handleBlur}
                    error={Boolean(pessoaFisicaForm.errors["publicName"])}
                    helperText={pessoaFisicaForm.errors["publicName"]}
                    name="publicName"
                  />

                  <NumberFormat
                    label="CPF"
                    variant="outlined"
                    value={pessoaFisicaForm.values.socialNumber}
                    name="socialNumber"
                    error={Boolean(pessoaFisicaForm.errors.socialNumber)}
                    helperText={pessoaFisicaForm.errors.socialNumber}
                    onBlur={pessoaFisicaForm.handleBlur}
                    format={"###.###.###-##"}
                    onValueChange={({ floatValue, formattedValue, value }) => {
                      pessoaFisicaForm.setFieldValue(
                        "socialNumber",
                        value,
                        true
                      );
                    }}
                    customInput={TextField}
                  />

                  <TextField
                    select
                    label="Gênero"
                    value={pessoaFisicaForm.values["gender"]}
                    error={Boolean(pessoaFisicaForm.errors["gender"])}
                    helperText={pessoaFisicaForm.errors["gender"]}
                    onChange={pessoaFisicaForm.handleChange}
                    onBlur={pessoaFisicaForm.handleBlur}
                    name="gender"
                  >
                    <MenuItem value={"homem"}>Homem</MenuItem>
                    <MenuItem value="Homem trans">Homem transsexual</MenuItem>
                    <MenuItem value="Mulher">Mulher</MenuItem>
                    <MenuItem value="Mulher trans">Mulher transsexual</MenuItem>
                    <MenuItem value="Não-binário">Não-binário</MenuItem>
                    <MenuItem value="Travesti">Travesti</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Raça/cor"
                    value={pessoaFisicaForm.values["race"]}
                    error={Boolean(pessoaFisicaForm.errors["race"])}
                    helperText={pessoaFisicaForm.errors["race"]}
                    onChange={pessoaFisicaForm.handleChange}
                    onBlur={pessoaFisicaForm.handleBlur}
                    name="race"
                  >
                    <MenuItem value="branca">Branca</MenuItem>
                    <MenuItem value="indígena">Indígena</MenuItem>
                    <MenuItem value="parda">Parda</MenuItem>
                    <MenuItem value="preta">Preta</MenuItem>
                    <MenuItem value="amarela">Amarela</MenuItem>
                  </TextField>

                  <TextField
                    label="DRT, OMB ou outro registro profissional"
                    variant="outlined"
                    value={pessoaFisicaForm.values.professionalRecord}
                    error={Boolean(pessoaFisicaForm.errors.professionalRecord)}
                    helperText={pessoaFisicaForm.errors.professionalRecord}
                    onChange={pessoaFisicaForm.handleChange}
                    onBlur={pessoaFisicaForm.handleBlur}
                    name="professionalRecord"
                  />

                  <DatePicker
                    clearable
                    helperText={pessoaFisicaForm.errors.birthday}
                    inputVariant="outlined"
                    error={Boolean(pessoaFisicaForm.errors.birthday)}
                    label={"Data de nascimento"}
                    name={"birthday"}
                    onBlur={pessoaFisicaForm.handleBlur}
                    clearLabel="Limpar"
                    okLabel={"Confirmar"}
                    cancelLabel={"Cancelar"}
                    onChange={(date: MaterialUiPickersDate) => {
                      console.log(date.toJSON());
                    }}
                    value={pessoaFisicaForm.values.birthday}
                    format={"dd/MM/yyyy"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <MdEvent />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    className="md:col-span-2"
                    label="Descrição pessoal"
                    placeholder="Escreva uma descrição sobre você e seus trabalhos."
                    name="description"
                    value={pessoaFisicaForm.values.description}
                    error={Boolean(pessoaFisicaForm.errors.description)}
                    helperText={pessoaFisicaForm.errors.description}
                    onChange={pessoaFisicaForm.handleChange}
                    onBlur={pessoaFisicaForm.handleBlur}
                    multiline
                    rows="6"
                    variant="outlined"
                  />
                </motion.div>
              )}
              {entityType === "pessoa_juridica" && (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 grid-flow-row md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TextField
                    value={pessoaJuridicaForm.values.registerEmail}
                    error={Boolean(pessoaJuridicaForm.errors.registerEmail)}
                    helperText={pessoaJuridicaForm.errors.registerEmail}
                    label="E-mail de cadastro"
                    onChange={pessoaJuridicaForm.handleChange}
                    onBlur={pessoaJuridicaForm.handleBlur}
                    name="registerEmail"
                    variant="outlined"
                  />

                  <TextField
                    variant="outlined"
                    value={pessoaJuridicaForm.values.publicEmail}
                    error={Boolean(pessoaJuridicaForm.errors.publicEmail)}
                    helperText={pessoaJuridicaForm.errors.publicEmail}
                    label="E-mail exibido no mapa"
                    onChange={pessoaJuridicaForm.handleChange}
                    onBlur={pessoaJuridicaForm.handleBlur}
                    name="publicEmail"
                  />

                  <TextField
                    variant="outlined"
                    label="Razão social"
                    error={Boolean(pessoaJuridicaForm.errors.businessName)}
                    onChange={pessoaJuridicaForm.handleChange}
                    onBlur={pessoaJuridicaForm.handleBlur}
                    helperText={pessoaJuridicaForm.errors.businessName}
                    name="businessName"
                  />
                  <TextField
                    variant="outlined"
                    label="Nome que aparecerá no site"
                    error={Boolean(pessoaJuridicaForm.errors.publicName)}
                    onChange={pessoaJuridicaForm.handleChange}
                    onBlur={pessoaJuridicaForm.handleBlur}
                    helperText={pessoaJuridicaForm.errors.publicName}
                    name="publicName"
                  />

                  <DatePicker
                    clearable
                    helperText={pessoaJuridicaForm.errors.creationDate}
                    inputVariant="outlined"
                    error={Boolean(pessoaJuridicaForm.errors.creationDate)}
                    label={"Data de fundação"}
                    name={"creationDate"}
                    onBlur={pessoaJuridicaForm.handleBlur}
                    clearLabel="Limpar"
                    okLabel={"Confirmar"}
                    cancelLabel={"Cancelar"}
                    onChange={(date: MaterialUiPickersDate) => {
                      console.log(date.toJSON());
                      pessoaJuridicaForm.setFieldValue(
                        "creationDate",
                        date,
                        true
                      );
                    }}
                    value={pessoaJuridicaForm.values.creationDate}
                    format={"dd/MM/yyyy"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <MdEvent />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <NumberFormat
                    customInput={TextField}
                    format={"##.###.###/####-##"}
                    label="Insira seu CPNJ"
                    value={pessoaJuridicaForm.values.companyRegistrationNumber}
                    variant="outlined"
                    onChange={pessoaJuridicaForm.handleChange}
                    onBlur={pessoaJuridicaForm.handleBlur}
                    name="companyRegistrationNumber"
                    error={Boolean(
                      pessoaJuridicaForm.errors.companyRegistrationNumber
                    )}
                    helperText={
                      pessoaJuridicaForm.errors.companyRegistrationNumber
                    }
                  />

                  <TextField
                    label="DRT, OMB ou registro profissional"
                    value={pessoaJuridicaForm.values.professionalRecord}
                    variant="outlined"
                    onBlur={pessoaJuridicaForm.handleBlur}
                    onChange={pessoaJuridicaForm.handleChange}
                    name="professionalRecord"
                    error={Boolean(
                      pessoaJuridicaForm.errors.professionalRecord
                    )}
                    helperText={pessoaJuridicaForm.errors.professionalRecord}
                  />

                  <TextField
                    multiline
                    rows={6}
                    className="col-span-2"
                    label="Descrição pessoal"
                    placeholder={
                      "Escreva uma descrição sobre você e seus trabalhos"
                    }
                    variant="outlined"
                    onBlur={pessoaJuridicaForm.handleBlur}
                    onChange={pessoaJuridicaForm.handleChange}
                    value={pessoaJuridicaForm.values.description}
                    name="description"
                    error={Boolean(pessoaJuridicaForm.errors.description)}
                    helperText={pessoaJuridicaForm.errors.description}
                  />
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

                <TransferList
                  fieldName="categories"
                  chosenArray={mainForm.values.categories}
                  setChosenArr={mainForm.setFieldValue}
                  listItems={[
                    "Música",
                    "gastronomia",
                    "fotografia",
                    "artes cênicas",
                  ]}
                />
              </div>
            </div>
          </AtlasAccordion>
        </div>

        <div className="my-10">
          <AtlasAccordion label="Etapa 3 (Endereço)" fullWidth shadow>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
              <TextField
                label="Logradouro *"
                placeholder="Rua, avenida, etc"
                value={mainForm.values.street}
                onChange={mainForm.handleChange}
                onBlur={mainForm.handleBlur}
                name="street"
                variant="outlined"
                error={Boolean(mainForm.errors.street)}
                helperText={mainForm.errors.street}
              />

              <NumberFormat
                format="#####-##"
                label="CEP"
                placeholder="Digite seu CEP"
                value={mainForm.values.cep}
                onChange={mainForm.handleChange}
                onBlur={mainForm.handleBlur}
                name="cep"
                customInput={TextField}
                variant="outlined"
                error={Boolean(mainForm.errors.cep)}
                helperText={mainForm.errors.cep}
              />

              <TextField
                select
                label="Estado"
                value={mainForm.values.state}
                name="state"
                onChange={mainForm.handleChange}
                onBlur={mainForm.handleBlur}
                variant="outlined"
                error={Boolean(mainForm.errors.state)}
                helperText={mainForm.errors.state}
              >
                {brazillianStates.map((value, index) => {
                  return (
                    <MenuItem value={value.key} key={index}>
                      {value.value}
                    </MenuItem>
                  );
                })}
              </TextField>

              <TextField
                label="Cidade"
                value={mainForm.values.city}
                name="city"
                onChange={mainForm.handleChange}
                onBlur={mainForm.handleBlur}
                error={Boolean(mainForm.errors.city)}
                helperText={mainForm.errors.city}
                variant="outlined"
                placeholder="Nome da sua cidade"
              />

              <TextField
                label="Bairro"
                value={mainForm.values.neighborhood}
                variant="outlined"
                name="neighborhood"
                onChange={mainForm.handleChange}
                onBlur={mainForm.handleBlur}
                helperText={mainForm.errors.neighborhood}
                error={Boolean(mainForm.errors.neighborhood)}
                placeholder="Nome do seu bairro"
              />

              <TextField
                label="Número"
                value={mainForm.values.streetNumber}
                variant="outlined"
                name="streetNumber"
                onChange={mainForm.handleChange}
                onBlur={mainForm.handleBlur}
                helperText={mainForm.errors.streetNumber}
                error={Boolean(mainForm.errors.streetNumber)}
                placeholder="Digite o número do lugar"
              />

              <TextField
                label="Complemento"
                placeholder="Ex. número do apartamento"
                variant="outlined"
                value={mainForm.values.complement}
                name="complement"
                error={Boolean(mainForm.errors.complement)}
                helperText={mainForm.errors.complement}
                onChange={mainForm.handleChange}
                onBlur={mainForm.handleBlur}
              />
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
      </MuiPickersUtilsProvider>
    </FormPageContainer>
  );
};

export default AgentForm;
