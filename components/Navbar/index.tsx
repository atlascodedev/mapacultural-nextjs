import React from "react";
import getBreakpoint from "../../helper/getBreakpoint";
import useViewportDetect from "../../hooks/useSmallViewportDetect";
import BurguerMenu, { IBurguerMenu } from "../BurguerMenu";
import NavbarBase, { INavbarBase } from "./NavbarBase";
import NavbarLogo, { INavbarLogo } from "./NavbarLogo";

export interface INavbar extends INavbarBase, INavbarLogo, IBurguerMenu {}

const Navbar = ({
  navbarColor = "primary",
  externalPath,
  onMenuClick,
  burguerMenuColor,
}: INavbar) => {
  const isSmall = useViewportDetect({ attachEventListener: true });

  return (
    <NavbarBase navbarColor={navbarColor}>
      {isSmall === "sm" ? null : <div></div>}
      <NavbarLogo />
      <div className="justify-self-end mr-7 md:mr-16 lg:mr-24 self-center">
        <BurguerMenu
          onMenuClick={onMenuClick}
          burguerMenuColor={burguerMenuColor}
        />
      </div>
    </NavbarBase>
  );
};

export default Navbar;
