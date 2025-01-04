import { configureStore } from "@reduxjs/toolkit";
import statusSlice from "./StatusSlice";
import authSlice from './AuthSlice'
import actionSlice from './ActionSlice'

export const store = configureStore({

    reducer: {
        status: statusSlice,
        auth: authSlice,
        action: actionSlice,
    },
    devTools: process.env.NODE_ENV === 'development',

})