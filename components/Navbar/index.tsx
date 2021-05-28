import React from "react";
import useViewportDetect from "../../hooks/useSmallViewportDetect";
import BurguerMenu, { IBurguerMenu } from "../BurguerMenu";
import NavbarBase, { INavbarBase } from "./NavbarBase";
import NavbarLogo, { INavbarLogo } from "./NavbarLogo";

export interface INavbar extends INavbarBase, INavbarLogo, IBurguerMenu {}

const Navbar = ({
  navbarColor = "primary",
  onMenuClick,
  burguerMenuColor,
  active,
  externalPath,
}: INavbar) => {
  const isSmall = useViewportDetect({ attachEventListener: true });

  return (
    <div>
      <NavbarBase navbarColor={navbarColor}>
        {isSmall === "sm" ? null : <div></div>}
        <NavbarLogo />
        <div className="justify-self-end mr-7 md:mr-16 lg:mr-24 self-center">
          <BurguerMenu
            active={active}
            onMenuClick={onMenuClick}
            burguerMenuColor={burguerMenuColor}
          />
        </div>
      </NavbarBase>
      <div
        style={{ top: 0, left: 0 }}
        className="md:h-24 h-24 2xl:h-28 invisible relative w-full "
      ></div>
    </div>
  );
};

export default Navbar;
