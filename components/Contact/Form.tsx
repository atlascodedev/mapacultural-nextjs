import React from "react";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TextField } from "@material-ui/core";
import { formatWithValidation } from "next/dist/next-server/lib/utils";
import FormField from "./FormField";
import NumberFormat from "react-number-format";
import SubmitButton from "./Button";

export interface IContactForm {
  submitFn: (data: any) => Promise<any>;
}

const ContactForm = ({ submitFn }: IContactForm) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Este campo é obrigatório"),
      email: Yup.string()
        .required("Este campo é obrigatório")
        .email("É preciso ser um e-mail válido"),
      phone: Yup.string().required("Este campo é obrigatório"),
      message: Yup.string().required("Este campo é obrigatório"),
    }),

    onSubmit: (values, actions) => {
      actions.setSubmitting(true);

      submitFn(values)
        .then((success) => {
          console.log(success);
          actions.setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          actions.setSubmitting(false);
        });
    },
  });

  return (
    <div
      className={`w-auto  max-w-xs md:max-w-md m-5 rounded-t-lg h-auto bg-white shadow-2xl rounded flex flex-col`}
    >
      <div
        className={`bg-secondary-main text-2xl text-white font-bold rounded-t-lg drop-shadow text-center w-full p-4 `}
      >
        Fale conosco
      </div>
      <div
        className={`flex flex-col h-auto w-full px-10 md:px-20 gap-6 md:gap-4 py-5 md:py-4`}
      >
        <FormField IconComponent={FaUser}>
          <TextField
            name="name"
            value={formik.values["name"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched["name"] && Boolean(formik.errors["name"])}
            helperText={formik.errors["name"]}
            fullWidth
            label="Nome"
          />
        </FormField>

        <FormField IconComponent={MdEmail}>
          <TextField
            name="email"
            value={formik.values["email"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched["email"] && Boolean(formik.errors["email"])}
            helperText={formik.errors["email"]}
            fullWidth
            label="Email"
          />
        </FormField>

        <FormField IconComponent={FaUser}>
          <NumberFormat
            customInput={TextField}
            format={"(##) #-####-####"}
            value={formik.values["phone"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched["phone"] && Boolean(formik.errors["phone"])}
            helperText={formik.errors["phone"]}
            name="phone"
            fullWidth
            label="Telefone"
          />
        </FormField>
        <FormField>
          <TextField
            variant="outlined"
            rows={6}
            multiline
            rowsMax={6}
            name="message"
            value={formik.values["message"]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched["message"] && Boolean(formik.errors["message"])
            }
            helperText={formik.errors["message"]}
            fullWidth
            label="Mensagem"
          />
        </FormField>
        <SubmitButton
          colorVariant={"dark"}
          themeColor={"tertiary"}
          disabled={!formik.isValid || formik.isSubmitting}
          onClick={formik.submitForm}
        >
          Enviar
        </SubmitButton>
      </div>
    </div>
  );
};

export default ContactForm;
