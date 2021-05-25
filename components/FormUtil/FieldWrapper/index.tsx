import DateFnsUtils from "@date-io/date-fns";
import {
  IconButton,
  InputAdornment,
  MenuItem,
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
import TransferList, { TransferListProps } from "../../TransferList";

export type FieldType = "text" | "format" | "date" | "select" | "transfer";
export type FieldVariant = "standard" | "outlined" | "filled";

export interface IFieldWrapperBase {
  type?: FieldType;
  name: string;
  label?: string;
  selectOptions?: any[];
  transferOptions?: any[];
  placeholder?: string;
  initialValue?: any;
  format?: string;
  additionalProps?: {
    TextFieldProps?: TextFieldProps;
    DatePickerProps?: DatePickerProps;
    NumberFormatProps?: NumberFormatProps;
    TransferListProps?: TransferListProps;
  };
}
export interface IFieldWrapper extends IFieldWrapperBase {
  formik: ReturnType<typeof useFormik>;
  variant?: FieldVariant;
}

const FieldWrapper = ({
  formik,
  name,
  type,
  label,
  variant,
  format,
  initialValue,
  placeholder,
  selectOptions,
  additionalProps,
  transferOptions,
}: IFieldWrapper) => {
  switch (type) {
    case "text":
      return (
        <TextField
          {...(additionalProps?.TextFieldProps ?? null)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label={label}
          variant={variant}
          name={name}
          placeholder={placeholder}
          value={formik.values?.[name] ?? ""}
          error={Boolean(formik.errors?.[name] ?? "")}
          helperText={formik.errors?.[name] ?? ""}
        />
      );

    case "select":
      return (
        <TextField
          {...(additionalProps?.TextFieldProps ?? null)}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label={label}
          variant={variant}
          name={name}
          value={formik.values?.[name] ?? ""}
          error={Boolean(formik.errors?.[name] ?? "")}
          helperText={formik.errors?.[name] ?? ""}
          select
        >
          {selectOptions.map((value: string, index: number) => {
            return (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </TextField>
      );

    case "format":
      return (
        <NumberFormat
          variant={variant}
          {...(additionalProps?.NumberFormatProps ?? null)}
          onValueChange={({ floatValue, formattedValue, value }) =>
            formik.setFieldValue(name, formattedValue, true)
          }
          value={formik.values?.[name] ?? ""}
          name={name}
          format={format}
          placeholder={placeholder}
          label={label}
          onBlur={formik.handleBlur}
          customInput={TextField}
          error={Boolean(formik.errors?.[name] ?? "")}
          helperText={formik.errors?.[name] ?? ""}
        />
      );

    case "date":
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <DatePicker
            {...(additionalProps?.DatePickerProps ?? null)}
            clearable
            inputVariant={variant}
            onChange={(date) => {
              console.log(date);
              formik.setFieldValue(name, date, true);
            }}
            onBlur={formik.handleBlur}
            value={formik.values?.[name] ?? ""}
            label={label}
            name={name}
            helperText={formik.errors?.[name] ?? ""}
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

    case "transfer":
      return (
        <TransferList
          {...(additionalProps?.TransferListProps ?? null)}
          options={transferOptions}
          checkCallback={(value) => formik.setFieldValue(name, value, true)}
        />
      );

    default:
      return (
        <TextField
          {...(additionalProps?.TextFieldProps ?? null)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label={label}
          variant={variant}
          name={name}
          placeholder={placeholder}
          value={formik.values?.[name] ?? ""}
          error={Boolean(formik.errors?.[name] ?? "")}
          helperText={formik.errors?.[name] ?? ""}
        />
      );
  }
};

export default FieldWrapper;
