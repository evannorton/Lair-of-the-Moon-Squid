import state from "../../state";

export const isMainGameOngoing = (): boolean => !state.values.isAtTitle;
