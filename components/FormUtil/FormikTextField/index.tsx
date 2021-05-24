import { TextField, TextFieldProps } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";

type IFieldWrapper = {
  formik: ReturnType<typeof useFormik>;
} & TextFieldProps;

const FormikTextField = ({ formik, ...props }: IFieldWrapper) => {
  return (
    <TextField
      label={props.label}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={Boolean(formik.errors[props.name])}
      helperText={formik.errors[props.name]}
      name={props.name}
      {...props}
    />
  );
};

export default FormikTextField;
