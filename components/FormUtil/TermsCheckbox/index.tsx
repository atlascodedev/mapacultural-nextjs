import { Checkbox, FormControlLabel } from "@material-ui/core";
import Link from "next/link";
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
          <div>
            Ao informar meus dados, eu concordo com a{" "}
            <Link href="/politica-privacidade">
              <a className="text-purple-800 underline font-black">
                política de privacidade
              </a>
            </Link>{" "}
            e com os{" "}
            <Link href="/termos-de-uso">
              <a className="text-purple-800 underline font-black">
                termos de uso
              </a>
            </Link>
            .
          </div>
        }
      />
    </div>
  );
};

export default TermsCheckbox;
