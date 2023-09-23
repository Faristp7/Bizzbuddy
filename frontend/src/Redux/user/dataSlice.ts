import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "formData",
  initialState: {
    username: "",
    email: "",
    password: "",
    ReenterPassword: "",
    phone : ""
  },
  reducers: {
    updateFormData: (state, action) => {  
      return { ...state, ...action.payload };
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    clearFormData:(_state ,_action)  => {
      return{
        username : '',
        email : '',
        password: '',
        ReenterPassword: '',
        phone : ''
      }
    }
  },
});

export const { updateFormData, clearFormData } = dataSlice.actions;
export default dataSlice.reducer;

export type RootState = {
    signUpData: {
        username : string
        email : string
        password : string,
        ReenterPassword: string
        phone: string
    }
}
