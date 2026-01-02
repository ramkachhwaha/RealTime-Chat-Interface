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
        },
        ADD_NEW_CHAT: (state, action) => {
            state.chats.unshift(action.payload)
        }
    }
});

export default chatsSlice.reducer;