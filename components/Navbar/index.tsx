import React from "react";
import BurguerMenu from "../BurguerMenu";
import NavbarBase, { NavbarBaseProps } from "./NavbarBase";
import NavbarLogo, { NavbarLogoProps } from "./NavbarLogo";

export interface NavbarProps extends NavbarBaseProps, NavbarLogoProps {}

const Navbar = ({ color = "primary", externalPath }: NavbarProps) => {
  return (
    <NavbarBase color={color}>
      <div></div>
      <NavbarLogo />
      <div className="justify-self-end mr-7 md:mr-16 lg:mr-24 self-center">
        <BurguerMenu />
      </div>
    </NavbarBase>
  );
};

export default Navbar;
