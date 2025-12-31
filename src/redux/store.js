import { configureStore } from "@reduxjs/toolkit";
import chatsSlice from "./reducer/chatsSlice";
import userSlice from "../redux/reducer/loggedSlice"

export default configureStore({
    reducer: {
        chatState: chatsSlice,
        user : userSlice
    }
});