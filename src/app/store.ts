import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/users/user.reducer"
import logReducer from "../redux/app-logs/app-log.reducer";
import { apiSlice } from "./api-slice";

export const store = configureStore({
    reducer: {
        users: userReducer,
        logs: logReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
