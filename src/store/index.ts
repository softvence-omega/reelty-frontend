import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import modalReducer from "../features/ui/components/modalSlice";
import { baseApi } from "../features/baseApi";
import videoReducer from "../features/video/videoSlice";

// ✅ import করো তোমার baseApi

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    modal: modalReducer,
     video: videoReducer,

    // ✅ RTK Query reducer যোগ করতে হবে
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware), // ✅ middleware add করো
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
