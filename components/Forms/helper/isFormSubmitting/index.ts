import { IGeneratedForm } from "../../../../hooks/useFormGenerator";

const isFormSubmitting = (formList: IGeneratedForm[]): boolean => {
  let booleanCounter: number = 0;

  formList.forEach((form, index) => {
    if (!form.formik.isSubmitting) {
      booleanCounter++;
    } else {
      return;
    }
  });

  return booleanCounter > 0;
};

export default isFormSubmitting;
