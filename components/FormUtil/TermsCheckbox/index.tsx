import { Checkbox, FormControlLabel } from "@material-ui/core";
import React from "react";

export interface ITermsCheckbox {
  checkboxOneCallback: (...args: any[]) => void;
  checkboxTwoCallback: (...args: any[]) => void;
  checkboxOneState: boolean;
  checkboxTwoState: boolean;
}

const TermsCheckbox = ({
  checkboxOneCallback,
  checkboxTwoCallback,
  checkboxOneState,
  checkboxTwoState,
}: ITermsCheckbox) => {
  return (
    <div className="flex flex-col w-full px-5 gap-10">
      <FormControlLabel
        control={
          <Checkbox
            checked={checkboxOneState}
            color="primary"
            onChange={checkboxOneCallback}
          />
        }
        label={
          "O declarante é responsável pela veracidade das informações inseridas na base de dados"
        }
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={checkboxTwoState}
            color="primary"
            onChange={checkboxTwoCallback}
          />
        }
        label={
          "Ao informar meus dados, eu concordo com a Política de Privacidade e com os termos de uso."
        }
      />
    </div>
  );
};

export default TermsCheckbox;
