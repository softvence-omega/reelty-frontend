import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  initialized: boolean; // ✅ add this
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  initialized: false, // default false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("accessToken", action.payload);
      state.initialized = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("accessToken");
      state.initialized = true;
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      }
      state.initialized = true; // ✅ mark initialized
    },
  },
});

export const { loginState, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
