import React from "react";
import { FormPageProps } from "../AgentForm";
import * as Yup from "yup";
import FormPageContainer from "../../Utility/FormPageContainer";
import AtlasAccordion from "../../Utility/Accordion";
import useFormGenerator from "../../../hooks/useFormGenerator";
import FieldWrapper from "../../FormUtil/FieldWrapper";
import { brazilStates, categories } from "../../../constants";
import { Checkbox, FormControlLabel } from "@material-ui/core";

interface IEventForms extends FormPageProps {}

let StringRequired = Yup.string().required("Este campo é obrigatório");

const EventsForm = ({ headerReturnAction }: IEventForms) => {
  return (
    <FormPageContainer
      headerLabel={"Eventos"}
      actionCancelFn={() => console.log("this cancels")}
      actionSubmitFn={() => console.log("this submits")}
      headerReturnAction={headerReturnAction}
    >
      <div className="flex flex-col w-full px-5 gap-10">
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => {
                console.log("checked");
              }}
            />
          }
          label={
            "O declarante é responsável pela veracidade das informações inseridas na base de dados"
          }
        />

        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              onChange={(
                event: React.ChangeEvent<HTMLInputElement>,
                checked: boolean
              ) => {
                console.log("checked");
              }}
            />
          }
          label={
            "Ao informar meus dados, eu concordo com a Política de Privacidade e com os termos de uso."
          }
        />
      </div>
    </FormPageContainer>
  );
};

export default EventsForm;
