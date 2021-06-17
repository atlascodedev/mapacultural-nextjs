import { IGeneratedForm } from "../../../../hooks/useFormGenerator";

const isFormValid = (formList: IGeneratedForm[], debug?: boolean): boolean => {
  let booleanCounter: number = 0;
  let erroringForms = [];

  formList.forEach((form, index) => {
    if (!form.formik.isValid) {
      booleanCounter++;

      erroringForms.push(form.formik.errors);
    } else {
      return;
    }
  });

  if (debug) {
    console.log(erroringForms);
  }

  return booleanCounter <= 0;
};

export default isFormValid;
