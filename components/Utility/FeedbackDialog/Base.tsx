import React from "react";

export interface IFeedbackDialogBase {
  children: React.ReactNode;
}

const FeedbackDialogBase = ({ children }: IFeedbackDialogBase) => {
  return (
    <div className="md:min-w-450px md:max-w-450px m-w-95pc bg-white md:h-600px h-500px shadow-custom rounded-lg rounded-t-lg flex flex-col">
      {children}
    </div>
  );
};

export default FeedbackDialogBase;
