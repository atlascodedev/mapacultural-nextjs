import React from "react";

export interface INavbarBase {
  navbarColor: "primary" | "secondary" | "tertiary";
}

const NavbarBase: React.FC<INavbarBase> = ({
  navbarColor: color,
  children,
}) => {
  return (
    <div
      className={`w-full ${
        color === "primary"
          ? "bg-primary-main"
          : color == "secondary"
          ? "bg-secondary-main"
          : color == "tertiary"
          ? "bg-tertiary-main"
          : "#fafafa"
      } h-auto  overflow-hidden md:h-24 2xl:h-28 grid grid-cols-2 md:grid-cols-3`}
    >
      {children}
    </div>
  );
};

export default NavbarBase;
