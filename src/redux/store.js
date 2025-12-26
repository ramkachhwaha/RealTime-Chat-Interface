import { configureStore } from "@reduxjs/toolkit";
import chatsSlice from "./reducer/chatsSlice";

export default configureStore({
    reducer: {
        chatState: chatsSlice
    }
});