import React from "react";
import getBreakpoint from "../../helper/getBreakpoint";
import useViewportDetect from "../../hooks/useSmallViewportDetect";
import BurguerMenu from "../BurguerMenu";
import NavbarBase, { NavbarBaseProps } from "./NavbarBase";
import NavbarLogo, { NavbarLogoProps } from "./NavbarLogo";

export interface NavbarProps extends NavbarBaseProps, NavbarLogoProps {}

const Navbar = ({ color = "primary", externalPath }: NavbarProps) => {
  const isSmall = useViewportDetect({ attachEventListener: true });

  return (
    <NavbarBase color={color}>
      {isSmall === "sm" ? null : <div></div>}
      <NavbarLogo />
      <div className="justify-self-end mr-7 md:mr-16 lg:mr-24 self-center">
        <BurguerMenu />
      </div>
    </NavbarBase>
  );
};

export default Navbar;
