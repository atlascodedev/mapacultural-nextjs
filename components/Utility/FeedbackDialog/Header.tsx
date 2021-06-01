import React from "react";
import { FeedbackSeverity } from ".";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { VscError } from "react-icons/vsc";
import { AiOutlineWarning } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";

export interface IFeedbackDialogHeader {
  severity: FeedbackSeverity;
}

const Header = ({ severity }: IFeedbackDialogHeader) => {
  return (
    <div
      style={{ height: "45%" }}
      className={`w-full flex justify-center items-center bg-alert-${severity}`}
    >
      {severity === "success" ? (
        <IoMdCheckmarkCircleOutline />
      ) : severity === "error" ? (
        <VscError />
      ) : severity === "warning" ? (
        <AiOutlineWarning />
      ) : (
        <BsFillInfoCircleFill />
      )}
    </div>
  );
};

export default Header;
