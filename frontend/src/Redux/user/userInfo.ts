import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    _id: "",
    username: "",
    profileImage: "",
  },
  reducers: {
    getUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { getUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;

export type RootState = {
  userInformation: {
    _id: string;
    username: string;
    profileImage: string;
  };
};
