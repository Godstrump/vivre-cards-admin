import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VariantType } from "notistack";

interface InitialLogProps {
    msg: string | null;
    location: string| null;
    variant: VariantType
}

const initialState: InitialLogProps = {
    msg: null,
    location: null,
    variant: '' as Partial<VariantType>,
} as InitialLogProps

const logSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addLog: (state, action: PayloadAction<InitialLogProps>) => {
            state.msg = action.payload.msg;
            state.location = action.payload.location;
            state.variant = action.payload.variant
        },
        clearLog: () => initialState
    }
})

export const { addLog, clearLog } = logSlice.actions;
export default logSlice.reducer