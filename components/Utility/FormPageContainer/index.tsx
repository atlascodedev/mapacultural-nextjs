import { motion } from "framer-motion";
import React from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export interface IFormPageContainerHeader {
  headerLabel: string;
  headerHelpertext?: string;
  headerReturnAction: (...args: any[]) => void;
}

export interface IFormPageActions {
  actionSubmitFn: (...args: any[]) => void;
  actionCancelFn: (...args: any[]) => void;
  submitLabel?: string;
  cancelLabel?: string;
  isValid: boolean;
  isSubmitting: boolean;
}

export interface IFormPage extends IFormPageContainerHeader, IFormPageActions {}

const FormPageContainerHeader = ({
  headerLabel,
  headerHelpertext,
  headerReturnAction,
}: IFormPageContainerHeader) => {
  return (
    <div className="flex border-b border-gray-200 w-full items-center px-4 md:px-12 py-5">
      <div className="flex flex-col flex-grow">
        <div className="font-extrabold text-2xl pb-2 text-gray-800">
          {headerLabel}
        </div>
        <div>{headerHelpertext}</div>
      </div>

      <motion.button
        className="focus:outline-none"
        onClick={headerReturnAction}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoArrowBackCircleSharp className="text-gray-800 text-3xl md:text-4xl font-extrabold" />
      </motion.button>
    </div>
  );
};

const FormPageActions = ({
  actionCancelFn,
  actionSubmitFn,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
  isSubmitting,
  isValid,
}: IFormPageActions) => {
  console.log(isValid);

  return (
    <div className="flex w-full justify-center  flex-row-reverse items-center gap-20 py-10">
      <motion.button
        disabled={isSubmitting || !isValid}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`focus:outline-none disabled:opacity-40 disabled:pointer-events-none bg-secondary-main p-2 px-4 font-bold text-white rounded-md`}
        onClick={actionSubmitFn}
      >
        {submitLabel}
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="focus:outline-none border-2  border-secondary-main p-2 px-4 font-bold text-secondary-main rounded-md"
        onClick={actionCancelFn}
      >
        {cancelLabel}
      </motion.button>
    </div>
  );
};

const FormPageContainer: React.FC<IFormPage> = ({
  headerLabel,
  headerHelpertext,
  children,
  headerReturnAction,
  actionSubmitFn,
  actionCancelFn,
  cancelLabel,
  submitLabel,
  isSubmitting,
  isValid,
}) => {
  return (
    <div className="md:mx-16 md:my-14 mt-5">
      <div className="w-full md:shadow-custom h-auto rounded-md ">
        <FormPageContainerHeader
          headerLabel={headerLabel}
          headerReturnAction={headerReturnAction}
          headerHelpertext={headerHelpertext}
        />
        <div className="md:px-12 py-10">{children}</div>

        <FormPageActions
          isSubmitting={isSubmitting}
          isValid={isValid}
          cancelLabel={cancelLabel}
          submitLabel={submitLabel}
          actionCancelFn={actionCancelFn}
          actionSubmitFn={actionSubmitFn}
        />
      </div>
    </div>
  );
};

export default FormPageContainer;
