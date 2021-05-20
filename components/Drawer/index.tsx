import React from "react";
import Base, { IDrawerBase } from "./Base";
import List, { IDrawerList } from "./List";
import Logo, { IDrawerLogo } from "./Logo";

interface IDrawer extends IDrawerBase, IDrawerLogo, IDrawerList {}

const Drawer = ({ externalPath, items }: IDrawer) => {
  return (
    <Base>
      <Logo />
      <List items={[]} />
    </Base>
  );
};

export default Drawer;
