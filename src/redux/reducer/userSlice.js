import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        totalUser: 0,
        users: [],
        error: null
    },
    reducers: {
        ADD_USERS: (state, action) => {
            state.users = action.payload.users
            state.totalUser = action.payload.total
        }
    }
});

export default userSlice.reducer;