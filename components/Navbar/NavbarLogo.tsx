import React from "react";
import { useRouter } from "next/router";

export interface INavbarLogo {
  externalPath?: string;
}

const NavbarLogo = ({ externalPath }: INavbarLogo) => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        if (global.window.location.pathname == "/") {
          global.window.scrollTo(0, 0);
          return;
        }
        router.push("/");
      }}
      className={"min-h-0 max-w-full flex justify-center cursor-pointer"}
    >
      <img
        className={"h-full w-auto object-contain"}
        src={externalPath ? externalPath : "images/logo.png"}
        alt=""
      />
    </div>
  );
};

export default NavbarLogo;
