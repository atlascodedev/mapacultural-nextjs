import React from "react";
import { IconType } from "react-icons";

export interface IFormField {
  IconComponent?: IconType;
}

const FormField: React.FC<IFormField> = ({ IconComponent, children }) => {
  return (
    <div className="flex items-center">
      {IconComponent ? (
        <div className="flex justify-center">
          <IconComponent className="text-deepBlue text-xl mr-5" />
        </div>
      ) : null}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default FormField;
