import React from "react";
import Backdrop, { BackdropProps } from "../Utility/Backdrop";
import Base, { IDrawerBase } from "./Base";
import List, { IDrawerList } from "./List";
import Logo, { IDrawerLogo } from "./Logo";

interface IDrawer
  extends IDrawerBase,
    IDrawerLogo,
    IDrawerList,
    BackdropProps {}

const Drawer = ({
  externalPath,
  items,
  closeFn,
  open,
  blur,
  onClose,
}: IDrawer) => {
  return (
    <Backdrop open={open} closeFn={closeFn} onClose={onClose} blur={blur}>
      <Base>
        <Logo />
        <List closeFn={closeFn} items={items} />
      </Base>
    </Backdrop>
  );
};

export default Drawer;
