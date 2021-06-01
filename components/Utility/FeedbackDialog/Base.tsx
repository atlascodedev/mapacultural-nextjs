import React from "react";

export interface IFeedbackDialogBase {
  children: React.ReactNode;
}

const FeedbackDialogBase = ({ children }: IFeedbackDialogBase) => {
  return (
    <div
      style={{ maxWidth: "95%" }}
      className="md:min-w-450px  bg-white md:h-600px h-500px shadow-custom rounded-lg rounded-t-lg flex flex-col"
    >
      {children}
    </div>
  );
};

export default FeedbackDialogBase;
