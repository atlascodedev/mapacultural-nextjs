import React from "react";
import { BsArrowRight } from "react-icons/bs";

interface ICTAButton {
  icon: React.FC<any>;
  action: (...args: any[]) => void;
  label: string;
}

const CTAButton = ({ action, icon: Icon, label }: ICTAButton) => {
  return (
    <div className="w-auto flex">
      <div className="flex w-40 flex-col rounded-tl-xl rounded-bl-xl justify-center bg-primary-main p-2 px-3 text-gray-900">
        <Icon className="text-4xl" />
        <div className="font-bold">{label}</div>
      </div>
      <div className="bg-secondary-main flex flex-col cursor-pointer justify-center p-3 rounded-tr-xl rounded-br-xl items-center">
        <div className="text-white text-xs mt-5">Cadastre-se</div>
        <BsArrowRight className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default CTAButton;
