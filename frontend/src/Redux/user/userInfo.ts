import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {},
  reducers: {
    getUserInfo: (state, action) => { 
      return { ...state, ...action.payload };
    },
  },
});

export const { getUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

export type RootState = {
    userInformation : object
}