import React from "react";
import useFormGenerator from "../../../hooks/useFormGenerator";
import { FormPageProps } from "../AgentForm";
import AtlasAccordion from "../../Utility/Accordion";
import FormPageContainer from "../../Utility/FormPageContainer";
import * as Yup from "yup";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import TermsCheckbox from "../../FormUtil/TermsCheckbox";
import {
  ICulturalSpaceAddressInfo,
  ICulturalSpaceCategories,
  ICulturalSpacePersonalInfo,
  ICulturalSpaceSocials,
} from "../types";
import {
  accessibilityType,
  categories,
  spheres,
  taquaraNeighborhoods,
} from "../constants";
import isFormSubmitting from "../helper/isFormSubmitting";
import isFormValid from "../helper/isFormValid";
import submitGeneratedForm from "../helper/submitForm";
import useFormCallback from "../hooks/useFormCallback";

interface ISpaceForm extends FormPageProps {}

let StringRequired = Yup.string().required("Este campo é obrigatório");

const SpacesForm = ({ headerReturnAction }: ISpaceForm) => {
  const step1 = useFormGenerator<ICulturalSpacePersonalInfo>({
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
      workingHours: {
        label: "Horário de funcionamento",
        placeholder: "Ex. das 9h às 20h",
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
      description: {
        label: "Descrição do local *",
        placeholder: "Escreva uma descrição sobre o local",
        additionalProps: {
          TextFieldProps: {
            className: "md:col-span-2",
            multiline: true,
            rows: 6,
          },
        },
      },
    },
    validationSchema: Yup.object({
      publicEmail: StringRequired,
      privateEmail: StringRequired,
      workingHours: StringRequired,
      cpf_or_cpnj: StringRequired,
      culturalSpaceCapacity: StringRequired,
      culturalSpaceEntry: StringRequired as any,
      culturalSpaceHead: StringRequired,
      culturalSpaceName: StringRequired,
      culturalSpaceSphere: StringRequired as any,
      description: StringRequired,
      entryFee: Yup.string().notRequired() as any,
      entryTypes: StringRequired as any,
      privatePhone: StringRequired,
      publicPhone: Yup.string().notRequired(),
      publicPhoneAlt: Yup.string().notRequired(),
    }),
  });

  const step2 = useFormGenerator<ICulturalSpaceAddressInfo>({
    fields: {
      cep: {
        label: "CEP *",
        format: "#####-###",
        type: "format",
        placeholder: "Digite seu CEP (apenas números)",
      },
      street: {
        label: "Logradouro *",
        placeholder: "Rua, avenida, etc",
      },
      neighborhood: {
        label: "Bairro *",
        placeholder: "Nome do seu bairro",
        type: "select",
        selectOptions: taquaraNeighborhoods,
      },
      streetNumber: {
        label: "Número *",
        placeholder: "Digite o número do local",
      },
      complement: {
        label: "Complemento",
        placeholder: "Ex. número do apartamento",
      },
    },
    validationSchema: Yup.object({
      cep: StringRequired.matches(
        /^([\d]{2})\.?([\d]{3})\-?([\d]{3})/,
        "É preciso ser um CEP válido."
      ),
      complement: Yup.string().notRequired(),
      neighborhood: StringRequired as any,
      street: StringRequired,
      streetNumber: StringRequired,
    }),
  });

  const step3 = useFormGenerator<ICulturalSpaceCategories>({
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
    },
    validationSchema: Yup.object({
      accessibilityType: Yup.array().min(0),
      accessible: StringRequired,
      category: Yup.array().min(0),
    }),
  });

  const step4 = useFormGenerator<ICulturalSpaceSocials>({
    fields: {
      website: {
        label: "Website",
        placeholder: "Coloque o link do website do local",
      },
      facebook: {
        label: "Facebook",
        placeholder: "Ex: https://www.facebook.com/institutoprocidadania",
      },
      instagram: {
        label: "Instagram",
        placeholder:
          "Ex: https://www.instagram.com/institutogauchoprocidadania",
      },
    },
    validationSchema: Yup.object({
      facebook: Yup.string().notRequired(),
      instagram: Yup.string().notRequired(),
      website: Yup.string().notRequired(),
    }),
  });

  const [checkboxOneState, setCheckboxOneState] =
    React.useState<boolean>(false);
  const [checkboxTwoState, setCheckboxTwoState] =
    React.useState<boolean>(false);

  const formList = [step1, step2, step3, step4];

  const { start, error, success } = useFormCallback(
    {
      successMessage:
        "Sua inscrição foi efetuada com sucesso, nosso time irá analisar os dados inseridos e em breve você receberá um e-mail confirmando a aprovação da sua inscrição. Obrigado pela participação!",
      successTitle: "Enviado",
    },
    {
      errorMessage:
        "Houve um erro ao enviar o formulário. Por favor, recarregue a página e tente novamente. Se o erro persistir, contate o suporte.",
      errorTitle: "Erro ao enviar",
    }
  );

  return (
    <FormPageContainer
      isSubmitting={isFormSubmitting(formList)}
      isValid={isFormValid(formList) && checkboxOneState && checkboxTwoState}
      actionCancelFn={headerReturnAction}
      actionSubmitFn={() =>
        submitGeneratedForm(formList, "/spaces", null, {
          error: error,
          start: start,
          success: () => {
            headerReturnAction();
            success();
          },
        })
      }
      headerLabel="Espaços culturais"
      headerReturnAction={headerReturnAction}
    >
      {formList.map((form, indexOuter) => {
        return (
          <div key={indexOuter} className="my-10">
            <AtlasAccordion
              defaultOpen
              fullWidth
              shadow
              label={`Etapa ${indexOuter + 1}`}
            >
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
