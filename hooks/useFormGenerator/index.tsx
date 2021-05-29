import { FormikProps, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { IFieldWrapperBase } from "../../components/FormUtil/FieldWrapper";
import { ObjectShape, OptionalObjectSchema, TypeOfShape } from "yup/lib/object";

export type IFieldWrapperInternal = Omit<IFieldWrapperBase, "name" | "uuid">;

interface IUseFormGenerator<T> {
  fields: Record<keyof T, IFieldWrapperInternal>;
  validationSchema: Yup.SchemaOf<T>;
}

function useFormGenerator<T>({
  validationSchema,
  fields,
}: IUseFormGenerator<T>) {
  const initialValues = React.useRef<Record<any, any>>(null);
  const fieldsRef = React.useRef<IFieldWrapperBase[]>([]);

  React.useEffect(() => {
    let tempObj: IFieldWrapperBase[] = [];
    let initialValueTemp: Record<any, any> = {};

    for (const key in fields) {
      const transactionUUID = nanoid();
      const element = fields[key];

      let fieldWrapperTemp: IFieldWrapperBase = {
        ...element,
        name: key,
        uuid: transactionUUID,
      };
      initialValueTemp[key] = element?.initialValue ?? "";

      tempObj.push(fieldWrapperTemp);
    }

    fieldsRef.current = tempObj;
    initialValues.current = initialValueTemp as Record<any, any>;
  }, []);

  const formik = useFormik({
    initialValues: initialValues.current,
    onSubmit: () => console.log("submitted form"),
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });

  return { formik, fields: fieldsRef.current };
}

export default useFormGenerator;
