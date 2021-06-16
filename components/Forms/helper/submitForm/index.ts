import { nanoid } from "nanoid";
import { API } from "../../../../constants";
import { IGeneratedForm } from "../../../../hooks/useFormGenerator";

const submitGeneratedForm = (
  formList: IGeneratedForm[],
  additionalData?: any,
  callback?: (...args: any[]) => void
) => {
  const transactionUUID = nanoid();
  const stepOneValues = formList[0].formik.values;
  const stepTwoValues = formList[1].formik.values;
  const stepThreeValues = formList[2].formik.values;
  const stepFourValues = formList[3].formik.values;

  const aggregatedValues = {
    ...stepOneValues,
    ...stepTwoValues,
    ...stepThreeValues,
    ...stepFourValues,
    uuid: transactionUUID,
  };

  formList.forEach((form) => {
    form.formik.setSubmitting(true);
  });

  API.post("/events", { ...aggregatedValues, ...additionalData })
    .then((successMessage) => {
      console.log(successMessage);

      formList.forEach((form) => {
        form.formik.setSubmitting(false);
        form.formik.resetForm();
      });
    })
    .catch((error) => {
      console.log(error);

      formList.forEach((form) => {
        form.formik.setSubmitting(false);
      });
    });
};

export default submitGeneratedForm;
