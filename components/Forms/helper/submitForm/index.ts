import { nanoid } from "nanoid";
import { API } from "../../../../constants";
import { IGeneratedForm } from "../../../../hooks/useFormGenerator";

const submitGeneratedForm = (
  formList: IGeneratedForm[],
  endpoint: string,
  additionalData?: any,
  callbacks?: {
    start: (...args: any[]) => void;
    success: (...args: any[]) => void;
    error: (...args: any[]) => void;
  },
  options?: { debug?: boolean }
) => {
  const transactionUUID = nanoid();
  const stepOneValues = formList[0].formik.values;
  const stepTwoValues = formList[1].formik.values;
  const stepThreeValues = formList[2].formik.values;
  const stepFourValues = formList[3].formik.values;

  callbacks?.start();

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

  API.post(endpoint, { ...aggregatedValues, ...additionalData })
    .then((successMessage) => {
      console.log(successMessage);
      callbacks?.success();

      if (options?.debug) {
        console.log(aggregatedValues);
      }

      formList.forEach((form) => {
        form.formik.setSubmitting(false);
        form.formik.resetForm();
      });
    })
    .catch((error) => {
      callbacks?.error();

      if (options?.debug) {
        console.log(aggregatedValues);
      }

      formList.forEach((form) => {
        form.formik.setSubmitting(false);
      });
    });
};

export default submitGeneratedForm;
