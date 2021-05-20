import React from "react";

export interface NavbarLogoProps {
  externalPath?: string;
}

const NavbarLogo = ({ externalPath }: NavbarLogoProps) => {
  return (
    <div className={"min-h-0 max-w-full flex justify-center"}>
      <img
        className={"h-full w-auto object-contain"}
        src={externalPath ? externalPath : "images/logo.png"}
        alt=""
      />
    </div>
  );
};

export default NavbarLogo;
