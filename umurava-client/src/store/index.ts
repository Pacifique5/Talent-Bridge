"use client";

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import challengesReducer from "./challengesSlice";
import communityReducer from "./communitySlice";
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        challenges: challengesReducer,
        community: communityReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
