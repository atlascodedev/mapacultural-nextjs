import { IFieldWrapperInternal } from "../../../../hooks/useFormGenerator";

const eventTypeCheck = (
  fieldOptions: IFieldWrapperInternal,
  eventTypeOption: any
): IFieldWrapperInternal => {
  if (eventTypeOption === "Físico" || eventTypeOption === "Híbrido") {
    return fieldOptions;
  } else {
    return {
      type: "nullable",
    };
  }
};

export default eventTypeCheck;
