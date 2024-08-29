import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    expiresAt: null,
  },
  reducers: {
    login: (state, action) => {
      console.log("Login action payload:", action.payload); // Debug: Verifica i dati ricevuti nel reducer
      state.user = action.payload.user || null;
      state.token = action.payload.accessToken || null;
      state.expiresAt = action.payload.expiresAt || null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expiresAt = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
