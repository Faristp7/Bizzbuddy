import { combineReducers } from "@reduxjs/toolkit";
import adminReducer from "./admin/adminAuth";
import userReducer from "./user/authSlice";
import dataSlice from "./user/dataSlice";
import userInfo from "./user/userInfo";

const rootReducer = combineReducers({
  // user
  user: userReducer,
  signUpData: dataSlice,
  userInformation: userInfo,
  // admin
  admin: adminReducer,
});

export default rootReducer;
