import { IGeneratedForm } from "../../../../hooks/useFormGenerator";

const isFormValid = (formList: IGeneratedForm[]): boolean => {
  let booleanCounter: number = 0;

  formList.forEach((form, index) => {
    if (!form.formik.isValid) {
      booleanCounter++;
    } else {
      return;
    }
  });

  return booleanCounter > 0;
};

export default isFormValid;
