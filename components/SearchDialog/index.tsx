import React from "react";
import Backdrop, { BackdropProps } from "../Utility/Backdrop";
import Container from "./Container";
import Content, { ISearchDialogContent } from "./Content";
import Header, { ISearchDialogHeader } from "./Header";

export interface ISearchDialog
  extends ISearchDialogContent,
    ISearchDialogHeader {
  BackdropProps: Omit<BackdropProps, "closeFn">;
}

const SearchDialog = ({ BackdropProps, closeFn, content }: ISearchDialog) => {
  return (
    <Backdrop
      closeFn={closeFn}
      className="justify-center place-items-center"
      {...BackdropProps}
    >
      <Container>
        <Header closeFn={closeFn} />
        <Content content={content} />
      </Container>
    </Backdrop>
  );
};

export default SearchDialog;
