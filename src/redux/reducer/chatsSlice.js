import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
    name: "chatsSlice",
    initialState: {
        chats: [],
        error: null
    },
    reducers: {
        SET_MY_CHATS: (state, action) => {
            state.chats = action.payload
        }
    }
});

export default chatsSlice.reducer;