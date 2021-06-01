import {
  GlobalUIActionTypes,
  IGlobalState,
  SET_FEEDBACK_DIALOG_HIDDEN,
  SET_FEEDBACK_DIALOG_VISIBLE,
  SET_GLOBAL_LOADING_FALSE,
  SET_GLOBAL_LOADING_TRUE,
} from "./types";

const globalUIReducer = (
  state: IGlobalState,
  action: GlobalUIActionTypes
): IGlobalState => {
  switch (action.type) {
    case SET_GLOBAL_LOADING_TRUE:
      return { ...state, isLoading: true };

    case SET_GLOBAL_LOADING_FALSE:
      return { ...state, isLoading: false };

    case SET_FEEDBACK_DIALOG_VISIBLE:
      return {
        ...state,
        feedbackMessage: action.payload.feedbackMessage,
        feedbackOpen: true,
        feedbackSeverity: action.payload.feedbackSeverity,
        feedbackTitle: action.payload.feedbackTitle,
      };

    case SET_FEEDBACK_DIALOG_HIDDEN:
      return {
        ...state,
        feedbackOpen: false,
      };

    default:
      return state;
  }
};

export default globalUIReducer;
