import { FeedbackSeverity } from "../../components/Utility/FeedbackDialog";

export const SET_GLOBAL_LOADING_TRUE = "SET_GLOBAL_LOADING_TRUE";
export const SET_GLOBAL_LOADING_FALSE = "SET_GLOBAL_LOADING_FALSE";

interface SetGlobalLoadingTrue {
  type: typeof SET_GLOBAL_LOADING_TRUE;
}

interface SetGlobalLoadingFalse {
  type: typeof SET_GLOBAL_LOADING_FALSE;
}

export type SetGlobalLoadingActionTypes =
  | SetGlobalLoadingFalse
  | SetGlobalLoadingTrue;

export const SET_FEEDBACK_DIALOG_VISIBLE = "SET_FEEDBACK_DIALOG_VISIBLE";
export const SET_FEEDBACK_DIALOG_HIDDEN = "SET_FEEDBACK_DIALOG_HIDDEN";

interface SetFeedbackDialogVisible {
  type: typeof SET_FEEDBACK_DIALOG_VISIBLE;
  payload: {
    feedbackTitle: string;
    feedbackMessage: string;
    feedbackSeverity: FeedbackSeverity;
  };
}

interface SetFeedbackDialogHidden {
  type: typeof SET_FEEDBACK_DIALOG_HIDDEN;
}

export type SetFeedbackDialogActionTypes =
  | SetFeedbackDialogVisible
  | SetFeedbackDialogHidden;

export type GlobalUIActionTypes =
  | SetGlobalLoadingActionTypes
  | SetFeedbackDialogActionTypes;

export type DispatchGlobalUI = (action: GlobalUIActionTypes) => void;

export interface IGlobalState {
  isLoading: boolean;
  feedbackTitle?: string;
  feedbackMessage?: string;
  feedbackSeverity?: FeedbackSeverity;
  feedbackOpen: boolean;
}
