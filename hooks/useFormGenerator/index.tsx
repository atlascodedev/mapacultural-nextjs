import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { IFieldWrapperBase } from "../../components/FormUtil/FieldWrapper";

type IFieldWrapperInternal = Omit<IFieldWrapperBase, "name">;

interface IUseFormGenerator {
  fields: Record<string, IFieldWrapperInternal>;
  validationSchema: ReturnType<typeof Yup.object>;
}

const useFormGenerator = ({ validationSchema, fields }: IUseFormGenerator) => {
  const initialValues = React.useRef<Record<string, any>>(null);
  const fieldsRef = React.useRef<IFieldWrapperBase[]>([]);

  React.useEffect(() => {
    let tempObj: IFieldWrapperBase[] = [];
    let initialValueTemp: Record<string, any> = {};

    for (const key in fields) {
      const element = fields[key];

      let fieldWrapperTemp = { ...element, name: key };
      initialValueTemp[key] = element?.initialValue ?? "";

      tempObj.push(fieldWrapperTemp);
    }

    fieldsRef.current = tempObj;
    initialValues.current = initialValueTemp;
  }, []);

  const formik = useFormik({
    initialValues: initialValues.current,
    onSubmit: () => console.log("submitted form"),
    validationSchema: validationSchema,
    enableReinitialize: true,
    validateOnMount: true,
  });

  return { formik, fields: fieldsRef.current };
};

export default useFormGenerator;
