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

export type GlobalUIActionTypes = SetGlobalLoadingActionTypes;

export type DispatchGlobalUI = (action: GlobalUIActionTypes) => void;

export interface IGlobalState {
  isLoading: boolean;
}
