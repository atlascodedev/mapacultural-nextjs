import React from "react";
import PartnerSlider, { IPartnerSlider } from "./PartnerSlider";

export interface IPartners extends IPartnerSlider {}

const Partners = ({ partnersItems }: IPartners) => {
  return (
    <div className={"py-16 bg-tertiary-main"}>
      <div className="w-full md:px-96 px-5 text-white text-center flex justify-center">
        Projeto executado através do Edital Criação e Formação Diversidade das
        Culturas realizado com recursos da Lei Aldir Blanc nº 14.017/20.
      </div>

      <PartnerSlider partnersItems={partnersItems} />
    </div>
  );
};

export default Partners;
