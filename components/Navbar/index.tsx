import React from "react";
import NavbarBase from "./NavbarBase";
import NavbarLogo from "./NavbarLogo";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <NavbarBase color="primary">
      <div></div>
      <NavbarLogo />
      <div></div>
    </NavbarBase>
  );
};

export default Navbar;
