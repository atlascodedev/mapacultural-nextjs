import React from "react";

export interface NavbarBaseProps {
  color: "primary" | "secondary" | "tertiary";
}

const NavbarBase: React.FC<NavbarBaseProps> = ({ color, children }) => {
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
      } h-16 overflow-hidden md:h-24 2xl:h-28 grid grid-cols-3`}
    >
      {children}
    </div>
  );
};

export default NavbarBase;
