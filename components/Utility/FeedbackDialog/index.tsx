import React from "react";
import Backdrop from "../Backdrop";
import FeedbackDialogBase from "./Base";
import FeedbackDialogButton from "./Button";
import Header from "./Header";

export type FeedbackSeverity = "success" | "error" | "warning" | "info";

export interface IFeedbackDialog {
  severity?: FeedbackSeverity;
  title?: string;
  message?: string;
  open: boolean;
  closeFn: (...args: any[]) => void;
}

const FeedbackDialog = ({
  severity = "info",
  title = "Placeholder Title text",
  message = "Placeholder lorem ipsum message goes here",
  open,
  closeFn,
}: IFeedbackDialog) => {
  return (
    <Backdrop
      className="justify-center items-center"
      closeFn={closeFn}
      open={open}
    >
      <FeedbackDialogBase>
        <Header severity={severity} />
        <div className="flex flex-col justify-around items-center h-full w-full px-4">
          <div className="font-extrabold md:text-2xl text-xl text-gray-700">
            {title}
          </div>
          <div className="text-gray-600 text-base md:text-lg text-center">
            {message}
          </div>
          <FeedbackDialogButton action={closeFn} severity={severity} />
        </div>
      </FeedbackDialogBase>
    </Backdrop>
  );
};

export default FeedbackDialog;
