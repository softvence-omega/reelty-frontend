import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
    videoURL: string | "";
    loading: boolean

}

const initialState: VideoState = {
    videoURL: "",
    loading: false
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideoLink: (state, action: PayloadAction<string>) => {
            state.videoURL = action.payload;
        }
        ,
        clearVideoLink: (state) => {
            state.videoURL = "";
        },
        setVideoGenerate: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
})

export const { setVideoLink, clearVideoLink, setVideoGenerate } = videoSlice.actions;
export default videoSlice.reducer;