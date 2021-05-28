import React from "react";
import useFormGenerator, {
  IFieldWrapperInternal,
} from "../../../hooks/useFormGenerator";
import { FormPageProps } from "../AgentForm";
import AtlasAccordion from "../../Utility/Accordion";
import FormPageContainer from "../../Utility/FormPageContainer";
import * as Yup from "yup";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import {
  accessibilityType,
  API,
  brazilStates,
  categories,
  spheres,
} from "../../../constants";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import {
  ICulturalSpaceAddressInfo,
  ICulturalSpaceCategories,
  ICulturalSpacePersonalInfo,
  ICulturalSpaceSocials,
} from "../../../@types/project";
import TermsCheckbox from "../../FormUtil/TermsCheckbox";

interface ISpaceForm extends FormPageProps {}

let StringRequired = Yup.string().required("Este campo é obrigatório");

const SpacesForm = ({ headerReturnAction }: ISpaceForm) => {
  const step1 = useFormGenerator({
    fields: {
      privateEmail: {
        label: "E-mail para cadastro *",
        placeholder: "E-mail que não será exibido no site",
      },
      publicEmail: {
        label: "E-mail exibido no mapa",
        placeholder: "E-mail que será exibido no mapa",
      },
      cpf_or_cpnj: {
        label: "CPF/CNPJ *",
        placeholder: "Digite seu CPF ou CPNJ",
      },
      culturalSpaceCapacity: {
        label: "Capacidade de público *",
        placeholder: "Ex: 50 pessoas",
        additionalProps: {
          NumberFormatProps: {
            prefix: "Até ",
            suffix: " pessoa(s)",
          },
        },
      },
      culturalSpaceEntry: {
        label: "Esfera",
        selectOptions: ["Espaço privado", "Espaço público"],
        type: "select",
      },
      culturalSpaceHead: {
        label: "Responsável pelo local *",
        placeholder: "Digite o nome completo do responsável",
      },
      culturalSpaceName: {
        label: "Nome do espaço *",
        placeholder: "Digite o nome do espaço",
      },
      culturalSpaceSphere: {
        label: "Tipo de esfera *",
        selectOptions: spheres,
        type: "select",
      },
      entryTypes: {
        label: "Critérios para o uso do espaço *",
        type: "select",
        selectOptions: ["Acesso gratuito", "Acesso pago", "Misto"],
      },

      entryFee: {
        label: "Tarifa de entrada",
        placeholder: "Descreva a tarifa, em caso de evento misto ou pago",
      },
      openingHours: {
        label: "Horário de abertura",
        type: "time",
      },

      closingHours: {
        label: "Horário de fechamento",
        type: "time",
      },

      description: {
        label: "Descrição do local *",
        placeholder: "Escreva uma descrição sobre o local",
      },
    } as Record<keyof ICulturalSpacePersonalInfo, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      publicEmail: StringRequired,
      privateEmail: StringRequired,
      closingHours: Yup.date().required("Este campo é obrigatório"),
      openingHours: Yup.date().required("Este campo é obrigatório"),
      cpf_or_cpnj: StringRequired,
      culturalSpaceCapacity: StringRequired,
      culturalSpaceEntry: StringRequired,
      culturalSpaceHead: StringRequired,
      culturalSpaceName: StringRequired,
      culturalSpaceSphere: StringRequired,
      description: StringRequired,
      entryFee: Yup.string().notRequired(),
      entryTypes: StringRequired,
    } as Record<keyof ICulturalSpacePersonalInfo, any>),
  });

  const step2 = useFormGenerator({
    fields: {
      cep: {
        label: "CEP *",
        format: "#####-###",
        type: "format",
        placeholder: "Digite seu CEP",
      },
      street: {
        label: "Logradouro *",
        placeholder: "Rua, avenida, etc",
      },
      state: {
        label: "Estado *",
        selectOptions: brazilStates,
        type: "select",
      },
      city: {
        label: "Cidade *",
        placeholder: "Nome da sua cidade",
      },
      neighborhood: {
        label: "Bairro *",
        placeholder: "Nome do seu bairro",
      },
      streetNumber: {
        label: "Número *",
        placeholder: "Digite o número do local",
      },
      complement: {
        label: "Complemento",
        placeholder: "Ex. número do apartamento",
      },
    } as Record<keyof ICulturalSpaceAddressInfo, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      cep: StringRequired,
      city: StringRequired,
      complement: Yup.string().notRequired(),
      neighborhood: StringRequired,
      state: StringRequired,
      street: StringRequired,
      streetNumber: StringRequired,
    } as Record<keyof ICulturalSpaceAddressInfo, any>),
  });

  const step3 = useFormGenerator({
    fields: {
      category: {
        label: "Tipo de local",
        type: "checkboxGroup",
        checkboxGroup: categories,
      },
      accessible: {
        label: "Acessível *",
        type: "select",
        selectOptions: ["Sim", "Não", "Parcialmente"],
      },
      accessibilityType: {
        label: "Acessibilidade física",
        type: "checkboxGroup",
        checkboxGroup: accessibilityType,
      },
    } as Record<keyof ICulturalSpaceCategories, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      accessibilityType: Yup.array().min(0),
      accessible: StringRequired,
      category: Yup.array().min(0),
    } as Record<keyof ICulturalSpaceCategories, any>),
  });

  const step4 = useFormGenerator({
    fields: {
      website: {
        label: "Website",
        placeholder: "Coloque o link do website do local",
      },
      facebook: {
        label: "Facebook",
        placeholder: "Insira o link do facebook do local",
      },
      instagram: {
        label: "Instagram",
        placeholder: "Insira o link do Instagram do local",
      },
      privatePhone: {
        label: "Telefone para cadastro *",
        placeholder: "Telefone que não será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      publicPhone: {
        label: "Telefone 1 exibido no mapa",
        placeholder: "Telefone que será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
      publicPhoneAlt: {
        label: "Telefone 2 exibido no mapa",
        placeholder: "Telefone que será exibido no site",
        format: "(##) #-####-####",
        type: "format",
      },
    } as Record<keyof ICulturalSpaceSocials, IFieldWrapperInternal>,
    validationSchema: Yup.object({
      facebook: Yup.string().url("É preciso ser uma URL válida").notRequired(),
      instagram: Yup.string().url("É preciso ser uma URL válida").notRequired(),
      privatePhone: StringRequired,
      publicPhone: Yup.string().notRequired(),
      publicPhoneAlt: Yup.string().notRequired(),
      website: Yup.string().url("É preciso ser uma URL válida").notRequired(),
    } as Record<keyof ICulturalSpaceSocials, any>),
  });

  const [checkboxOneState, setCheckboxOneState] =
    React.useState<boolean>(false);
  const [checkboxTwoState, setCheckboxTwoState] =
    React.useState<boolean>(false);

  const formList = [step1, step2, step3, step4];

  const isSubmitting: boolean =
    step1.formik.isSubmitting ||
    step2.formik.isSubmitting ||
    step3.formik.isSubmitting ||
    step4.formik.isSubmitting;

  const isValid: boolean =
    step1.formik.isValid &&
    step2.formik.isValid &&
    step3.formik.isValid &&
    step4.formik.isValid &&
    checkboxOneState &&
    checkboxTwoState;

  const submitSpacesForm = () => {
    const stepOneValues = step1.formik.values;
    const stepTwoValues = step2.formik.values;
    const stepThreeValues = step3.formik.values;
    const stepFourValues = step4.formik.values;

    const aggregatedValues = {
      ...stepOneValues,
      ...stepTwoValues,
      ...stepThreeValues,
      ...stepFourValues,
    };

    formList.forEach((form) => {
      form.formik.setSubmitting(true);
    });

    API.post("/spaces", aggregatedValues)
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

    console.log(stepOneValues, stepTwoValues, stepThreeValues, stepFourValues);
  };

  return (
    <FormPageContainer
      isSubmitting={isSubmitting}
      isValid={isValid}
      actionCancelFn={submitSpacesForm}
      actionSubmitFn={headerReturnAction}
      headerLabel="Espaços culturais"
      headerReturnAction={headerReturnAction}
    >
      {formList.map((form, indexOuter) => {
        return (
          <div key={indexOuter} className="my-10">
            <AtlasAccordion fullWidth shadow label={`Etapa ${indexOuter + 1}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-28 gap-y-12 mb-5 py-5 md:px-16">
                {form.fields.map((fields, index) => {
                  return (
                    <FieldWrapper
                      variant="outlined"
                      formik={form.formik}
                      {...fields}
                      key={fields.uuid}
                    />
                  );
                })}
              </div>
            </AtlasAccordion>
          </div>
        );
      })}

      <TermsCheckbox
        checkboxOneCallback={() =>
          setCheckboxOneState((prevState) => !prevState)
        }
        checkboxOneState={checkboxOneState}
        checkboxTwoCallback={() =>
          setCheckboxTwoState((prevState) => !prevState)
        }
        checkboxTwoState={checkboxTwoState}
      />
    </FormPageContainer>
  );
};

export default SpacesForm;
