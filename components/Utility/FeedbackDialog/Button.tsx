import React from "react";
import { FeedbackSeverity } from ".";

export interface IFeedbackDialogButton {
  severity: FeedbackSeverity;
}

const FeedbackDialogButton = ({ severity }: IFeedbackDialogButton) => {
  return (
    <div
      style={{ borderRadius: "64px" }}
      className={`bg-alert-${severity} text-white px-3 py-1 md:text-2xl text-base`}
    >
      Fechar
    </div>
  );
};

export default FeedbackDialogButton;
