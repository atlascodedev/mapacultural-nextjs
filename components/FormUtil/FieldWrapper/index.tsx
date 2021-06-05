import DateFnsUtils from "@date-io/date-fns";
import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
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
  TimePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { ptBR } from "date-fns/locale";
import { useFormik } from "formik";
import React from "react";
import { MdAlarm, MdEvent } from "react-icons/md";
import NumberFormat, { NumberFormatProps } from "react-number-format";
import TransferList, { TransferListProps } from "../../TransferList";

export type FieldType =
  | "text"
  | "format"
  | "date"
  | "select"
  | "checkbox"
  | "checkboxGroup"
  | "time"
  | "nullable";
export type FieldVariant = "standard" | "outlined" | "filled";

export interface IFieldWrapperBase {
  type?: FieldType;
  name: string;
  label?: string;
  uuid?: string;
  selectOptions?: any[];
  transferOptions?: any[];
  checkboxGroup?: string[];
  placeholder?: string;
  initialValue?: any;
  format?: string;
  additionalProps?: {
    TextFieldProps?: TextFieldProps;
    DatePickerProps?: DatePickerProps;
    NumberFormatProps?: NumberFormatProps;
    TransferListProps?: TransferListProps;
    FormControlLabelProps?: FormControlLabelProps;
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
  checkboxGroup,
}: IFieldWrapper) => {
  switch (type) {
    case "nullable":
      return (
        <TextField
          style={{ display: "none" }}
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
              formik.setFieldValue(name, date.toJSON(), true);
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

    case "time":
      return (
        <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
          <TimePicker
            label={label}
            name={name}
            todayLabel="Agora"
            showTodayButton
            value={formik.values?.[name]}
            inputVariant="outlined"
            helperText={formik.errors?.[name]}
            error={Boolean(formik.errors?.[name])}
            cancelLabel="Cancelar"
            okLabel="Confirmar"
            onChange={(date: MaterialUiPickersDate) =>
              formik.setFieldValue(name, date?.toString(), false)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <MdAlarm />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </MuiPickersUtilsProvider>
      );

    case "checkbox":
      return (
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={formik.values?.[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name={name}
            />
          }
          label={label}
        />
      );

    case "checkboxGroup":
      const setCheck = (newValue: any) => {
        formik.setFieldValue(name, [...formik.values?.[name], newValue], true);
      };

      const setUncheck = (removedValue: any) => {
        formik.setFieldValue(
          name,
          formik.values?.[name].filter((values: any, index: number) => {
            return values !== removedValue;
          }),
          true
        );
      };

      const handleCheckbox = (checked: boolean, checkboxValue: any) => {
        checked ? setCheck(checkboxValue) : setUncheck(checkboxValue);

        formik.setFieldTouched(name, true, true);
      };

      return (
        <div className="md:col-span-2 ">
          <div className="text-lg text-gray-800 font-bold px-5 py-5 ">
            <div>{label}</div>
            <div
              className={`text-red-500 text-sm font-extrabold ${Boolean(
                formik.errors?.[name] ? "opacity-1" : "opacity-0"
              )} transition-all `}
            >
              {formik.errors?.[name]}
            </div>
          </div>
          <div className="grid grid-cols-1 grid-flow-row md:grid-cols-3 md:col-span-2 place-items-start px-5">
            {checkboxGroup.map((value, index) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      color="primary"
                      value={value}
                      name={name}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                        checked: boolean
                      ) => {
                        handleCheckbox(checked, value);
                      }}
                    />
                  }
                  label={value}
                />
              );
            })}
          </div>
        </div>
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
