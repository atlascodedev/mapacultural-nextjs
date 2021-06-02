import React from "react";
import { FeedbackSeverity } from ".";

export interface IFeedbackDialogButton {
  severity: FeedbackSeverity;
  action: (...args: any[]) => void;
}

const FeedbackDialogButton = ({ severity, action }: IFeedbackDialogButton) => {
  return (
    <div
      onClick={action}
      style={{ borderRadius: "64px" }}
      className={`${
        severity === "success"
          ? "bg-alert-success"
          : severity === "error"
          ? "bg-alert-error"
          : severity === "info"
          ? "bg-alert-info"
          : "bg-alert-warning"
      } text-white px-6 py-2 md:text-lg font-bold cursor-pointer hover:shadow-custom transition-shadow text-base`}
    >
      Fechar
    </div>
  );
};

export default FeedbackDialogButton;
