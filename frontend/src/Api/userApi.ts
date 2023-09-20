import axiosInstance from "../axios/axios";

export const userSignup = (values : object) => axiosInstance('JwtToken').post('/signUp' ,values)
export const googleSignin = (values : object) => axiosInstance('JwtToken').post('/googleSignin', values)