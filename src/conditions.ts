import { state } from "./state";

export const isAtTitle = (): boolean => state.values.isAtTitle;
export const isMainGameOngoing = (): boolean => !state.values.isAtTitle;
