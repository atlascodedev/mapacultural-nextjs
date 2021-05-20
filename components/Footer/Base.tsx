import React from "react";

export interface FooterBaseProps {}

const FooterBase: React.FC<FooterBaseProps> = ({ children }) => {
  return (
    <div
      className={`w-full h-full py-10 px-12 bg-tertiary-dark flex text-white flex-col  gap-10`}
    >
      {children}
    </div>
  );
};

export default FooterBase;
