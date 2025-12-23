import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/userSlice";

export default configureStore({
    reducer : {
        userState : userSlice
    }
});