import DateFnsUtils from "@date-io/date-fns";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import {
  DatePicker,
  DatePickerProps,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { ptBR } from "date-fns/locale";
import { useFormik } from "formik";
import React from "react";
import { MdEvent } from "react-icons/md";
import NumberFormat, { NumberFormatProps } from "react-number-format";

export type FieldType = "text" | "format" | "date";

export interface IFieldWrapper {
  type: FieldType;
  name: string;
  formik: ReturnType<typeof useFormik>;
  TextFieldProps?: TextFieldProps;
  DatePickerProps?: DatePickerProps;
  NumberFormatProps?: NumberFormatProps;
  label?: string;
}

const FieldWrapper = ({
  formik,
  name,
  type,
  DatePickerProps,
  NumberFormatProps,
  TextFieldProps,
  label,
}: IFieldWrapper) => {
  switch (type) {
    case "text":
      return (
        <TextField
          {...TextFieldProps}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label={label}
          name={name}
          value={formik.values[name]}
          error={Boolean(formik.errors[name])}
          helperText={formik.errors[name]}
        />
      );

    case "format":
      return (
        <NumberFormat
          {...NumberFormatProps}
          onValueChange={({ floatValue, formattedValue, value }) =>
            formik.setFieldValue(name, formattedValue, true)
          }
          value={formik.values[name]}
          name={name}
          label={label}
          onBlur={formik.handleBlur}
          customInput={TextField}
          error={Boolean(formik.errors[name])}
          helperText={formik.errors[name]}
        />
      );

    case "date":
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <DatePicker
            {...DatePickerProps}
            clearable
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={`${formik.values}.${name}`}
            label={label}
            name={name}
            helperText={formik.errors[name]}
            format={"dd/MM/yyyy"}
            okLabel="Confirmar"
            cancelLabel="Cancelar"
            clearLabel="Limpar"
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
        </MuiPickersUtilsProvider>
      );

    default:
      return <div>hello</div>;
  }
};

export default FieldWrapper;
