import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
    videoURL: string | "";

}

const initialState: VideoState = {
    videoURL: "",
}

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        setVideoLink: (state, action : PayloadAction<string>) =>{
            state.videoURL = action.payload;
        }
        ,
        clearVideoLink: (state) => {
            state.videoURL = "";
        }
    }
})

export const { setVideoLink, clearVideoLink} = videoSlice.actions;
export default videoSlice.reducer;