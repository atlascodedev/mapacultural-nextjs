import React from "react";

export interface IFeedbackDialogBase {
  children: React.ReactNode;
}

const FeedbackDialogBase = ({ children }: IFeedbackDialogBase) => {
  return (
    <div className="md:min-w-450px md:h-600px shadow-custom flex flex-col">
      {children}
    </div>
  );
};

export default FeedbackDialogBase;
