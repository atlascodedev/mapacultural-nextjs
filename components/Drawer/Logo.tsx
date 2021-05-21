import React from "react";

export interface IDrawerLogo {
  externalPath?: string;
}

const Logo = ({ externalPath }: IDrawerLogo) => {
  return (
    <div className="w-60 md:w-80 h-1/5 flex justify-center items-center shadow-md">
      <img
        className="w-full h-full object-contain"
        src={externalPath ? externalPath : "images/logo.png"}
        alt="Logotipo"
      />
    </div>
  );
};

export default Logo;
