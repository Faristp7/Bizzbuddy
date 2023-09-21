import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "formData",
  initialState: {
    username: "",
    email: "",
    password: "",
  },
  reducers: {
    updateFormData: (state, action) => {  
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFormData } = dataSlice.actions;
export default dataSlice.reducer;

export type RootState = {
    signUpData: {
        username : string
        email : string
        password : string
    }
}
