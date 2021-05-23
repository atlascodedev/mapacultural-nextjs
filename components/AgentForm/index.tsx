import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@material-ui/core";
import React from "react";
import AtlasAccordion from "../Utility/Accordion";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormPageContainer, { IFormPage } from "../Utility/FormPageContainer";

type FormPageProps = Pick<IFormPage, "headerReturnAction">;

export interface IAgentForm extends FormPageProps {}
const AgentForm = ({ headerReturnAction }: IAgentForm) => {
  const [entityType, setEntityType] =
    React.useState<"pessoa_juridica" | "pessoa_fisica">("pessoa_fisica");

  const pessoaJuridicaForm = useFormik({
    initialValues: {
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
    },

    onSubmit: () => console.log("every mistake"),
  });

  const pessoaFisicaForm = useFormik({
    initialValues: {
      registerEmail: "",
      publicEmail: "",
      fullName: "",
      birthday: "",
      gender: "",
      race: "",
      color: "",
      professionalRecord: "",
      description: "",
      socialNumber: "",
    },

    validationSchema: Yup.object({
      socialNumber: Yup.string().required("Este campo é obrigatório"),
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
      color: Yup.string().required("Este campo é obrigatório"),
      professionalRecord: Yup.string().required("Este campo é obrigatório"),
      description: Yup.string().required("Este campo é obrigatório"),
    }),

    onSubmit: () => console.log("take what you want"),
  });

  const formik = useFormik({
    initialValues: {
      pessoaFisicaJuridica: "",
      registerEmail: "",
      publicEmail: "",
      fullName: "",
    },
    enableReinitialize: true,
    onSubmit: () => console.log("form was submitted"),
    validationSchema: Yup.object({
      pessoaFisicaJuridica: Yup.string().required("Selecione pelo menos um"),
      registerEmail: Yup.string()
        .required("Este campo é obrigatório")
        .email("É necessário ser um e-mail válido"),
      publicEmail: Yup.string()
        .required("Este campo é obrigatório")
        .email("É necessário ser um e-mail válido"),
      fullName: Yup.string().required("Este campo é obrigatório"),
      publicName: Yup.string().required("Este campo é obrigatório"),
      socialNumber: Yup.string().required("Insira seu CPF"),
    }),
  });

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
        <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
          <TextField
            value={formik.values["pessoaFisicaJuridica"]}
            name="pessoaFisicaJuridica"
            label="Escolha uma opção"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            error={Boolean(formik.errors["pessoaFisicaJuridica"])}
            helperText={formik.errors["pessoaFisicaJuridica"]}
            select
          >
            <MenuItem value={"pessoa_fisica"}>Pessoa física</MenuItem>
            <MenuItem value={"pessoa_juridica"}>Pessoa jurídica</MenuItem>
          </TextField>
        </div>
      </AtlasAccordion>
    </FormPageContainer>
  );
};

export default AgentForm;
