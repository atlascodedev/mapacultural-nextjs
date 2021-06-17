import React from "react";
import useGlobalUI from "../../../../context/global_ui/hook";

const useFormCallback = (
  success: {
    successTitle: string;
    successMessage: string;
  },
  error: {
    errorTitle: string;
    errorMessage;
  }
) => {
  const { dispatch } = useGlobalUI();

  const successDispatch = () => {
    dispatch({ type: "SET_GLOBAL_LOADING_FALSE" });

    dispatch({
      type: "SET_FEEDBACK_DIALOG_VISIBLE",
      payload: {
        feedbackMessage: success.successMessage,
        feedbackSeverity: "success",
        feedbackTitle: success.successTitle,
      },
    });
  };

  const errorDispatch = () => {
    dispatch({ type: "SET_GLOBAL_LOADING_FALSE" });

    dispatch({
      type: "SET_FEEDBACK_DIALOG_VISIBLE",
      payload: {
        feedbackMessage: error.errorMessage,
        feedbackSeverity: "error",
        feedbackTitle: error.errorTitle,
      },
    });
  };

  return {
    start: () => dispatch({ type: "SET_GLOBAL_LOADING_TRUE" }),
    success: successDispatch,
    error: errorDispatch,
  };
};

export default useFormCallback;
