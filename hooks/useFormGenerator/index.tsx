import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FieldType } from "../../components/FormUtil/FieldWrapper";

interface IFormGeneratorField {
  name: string;
  initialValue: string;
  label: string;
  placeholder?: string;
  typeSama: FieldType;
}

interface IUseFormGenerator {
  fields: IFormGeneratorField[];
  validationSchema: ReturnType<typeof Yup.object>;
}

const useFormGenerator = ({ validationSchema, fields }: IUseFormGenerator) => {
  const initialValues = React.useRef<Record<string, any>>(null);
  const fieldsRef = React.useRef<IFormGeneratorField[]>([]);

  React.useEffect(() => {
    let tempObj = {};

    for (const field of fields) {
      tempObj[field.name] = field.initialValue;
    }

    initialValues.current = { ...tempObj };

    fieldsRef.current = [...fields];
  }, []);

  const formik = useFormik({
    initialValues: initialValues.current,
    onSubmit: () => console.log("submitted form"),
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return { formik, fields: fieldsRef.current };
};

export default useFormGenerator;
