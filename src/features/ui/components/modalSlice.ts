import { createSlice } from "@reduxjs/toolkit";

interface ModelState {
  userProfileModel: boolean;
}

const initialState: ModelState = {
  userProfileModel: false,
  
};

const modelSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openUserProfileModel: (state) => {
      state.userProfileModel = true;
    },
    closeUserProfileModal: (state) => {
      state.userProfileModel = false;
    },
    toggleUserProfileModal: (state) => {
      state.userProfileModel = !state.userProfileModel;
    },
  },
});

export const {
  openUserProfileModel,
  closeUserProfileModal,
  toggleUserProfileModal,
} = modelSlice.actions;
export default modelSlice.reducer;
