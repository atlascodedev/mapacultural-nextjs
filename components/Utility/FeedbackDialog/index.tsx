import React from "react";
import FeedbackDialogBase from "./Base";
import FeedbackDialogButton from "./Button";
import Header from "./Header";

export type FeedbackSeverity = "success" | "error" | "warning" | "info";

export interface IFeedbackDialog {
  severity?: FeedbackSeverity;
  title?: string;
  message?: string;
}

const FeedbackDialog = ({
  severity = "info",
  title = "Placeholder Title text",
  message = "Placeholder lorem ipsum message goes here",
}: IFeedbackDialog) => {
  return (
    <FeedbackDialogBase>
      <Header severity={severity} />
      <div className="flex flex-col justify-around items-center h-full w-full">
        <div className="font-extrabold md:text-2xl text-xl text-gray-700">
          {title}
        </div>
        <div className="text-gray-600 text-base md:text-lg">{message}</div>
        <FeedbackDialogButton severity={severity} />
      </div>
    </FeedbackDialogBase>
  );
};

export default FeedbackDialog;
