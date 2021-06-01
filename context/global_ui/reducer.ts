import { GlobalUIActionTypes, IGlobalState } from "./types";

const globalUIReducer = (
  state: IGlobalState,
  action: GlobalUIActionTypes
): IGlobalState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default globalUIReducer;
