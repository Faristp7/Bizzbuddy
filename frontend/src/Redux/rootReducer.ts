import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminAuth";
import userReducer from "./user/authSlice";
import dataSlice from "./user/dataSlice";

const rootReducer = combineReducers({
    // user
    user: userReducer,
    signUpData:dataSlice,
    // admin
    admin: adminReducer,
});

export default rootReducer;
