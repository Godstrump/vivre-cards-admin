import { createSelector } from "reselect";
import type { RootState } from "../../app/store";

export const selectLogState = (state: RootState) => state.logs;

export const selectLog = createSelector(
    [selectLogState], 
    (log) => log
)