import { TextField } from "@material-ui/core";
import { motion } from "framer-motion";
import React from "react";
import { FaArrowCircleLeft, FaArrowLeft } from "react-icons/fa";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import AtlasAccordion from "../Accordion";

export interface IFormPageContainerBase {
  actionCancelFn: (...args: any[]) => void;
}

export interface IFormPageContainer extends IFormPageContainerHeader {
  actionSubmitFn: (...args: any[]) => void;
}

interface IFormPageContainerHeader extends IFormPageContainerBase {
  headerLabel: string;
  headerHelpertext?: string;
}

const FormPageContainerHeader = ({
  headerLabel,
  headerHelpertext,
  actionCancelFn,
}: IFormPageContainerHeader) => {
  return (
    <div className="flex border-b border-gray-200 w-full items-center px-4 md:px-12 py-5">
      <div className="flex flex-col flex-grow">
        <div className="font-extrabold md:text-2xl pb-2 text-gray-800">
          {headerLabel}
        </div>
        <div>{headerHelpertext}</div>
      </div>

      <motion.button
        className="focus:outline-none"
        onClick={actionCancelFn}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoArrowBackCircleSharp className="text-gray-800 text-3xl md:text-4xl font-extrabold" />
      </motion.button>
    </div>
  );
};

const FormPageContainer: React.FC<IFormPageContainer> = ({
  actionCancelFn,
  actionSubmitFn,
  headerLabel,
  headerHelpertext,
  children,
}) => {
  return (
    <div className="md:mx-16 md:my-14 mt-5">
      <div className="w-full md:shadow-custom h-auto rounded-md ">
        <FormPageContainerHeader
          actionCancelFn={actionCancelFn}
          headerLabel={headerLabel}
          headerHelpertext={headerHelpertext}
        />
        <div className="md:px-12 px-2 py-10">{children}</div>
      </div>
    </div>
  );
};

export default FormPageContainer;
