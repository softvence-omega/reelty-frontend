import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
}


interface UserState {
    user: UserProfile | null;
}


const initialState: UserState = {
    user: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProfile>) => {
            state.user = action.payload;
        },

        clearUser: (state) => {
            state.user = null;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;