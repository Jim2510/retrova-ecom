// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Importa il tuo reducer dell'autenticazione

export const store = configureStore({
  reducer: {
    auth: authReducer,
    devTools: process.env.NODE_ENV !== "production",
  },
});
