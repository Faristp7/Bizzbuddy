import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminLoggedIn: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoggedIn: (state, action) => {      
      state.isAdminLoggedIn = action.payload;
    },
    adminLoggedOut: (state, action) => {
      state.isAdminLoggedIn = action.payload;
    },
  },
});

export const { adminLoggedIn, adminLoggedOut } = adminSlice.actions;
export default adminSlice.reducer;

export type rootState = {
  admin: {
    isAdminLoggedIn: boolean;
  };
};
