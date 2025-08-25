import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login action expects token
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      // optional: save token in localStorage
      localStorage.setItem("accessToken", action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("accessToken");
    },
    // optional: initialize from localStorage
    initializeAuth: (state) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      }
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
