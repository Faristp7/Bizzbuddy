import axiosInstance from "../axios/axios";

export const userSignup = (values : object) => axiosInstance('JwtToken').post('/signUp' ,values)
export const googleSignin = (values : object) => axiosInstance('JwtToken').post('/googleSignin', values)
export const saveUser = (values : object) => axiosInstance('JwtToken').post('/saveUser', values)
export const adminLogin = (values : object) => axiosInstance('JwtToken').post('/admin/roleLogIn' ,values)  
export const blockAndBlock = (values : object) => axiosInstance('JwtToken').post('/admin/blockAndBlock' ,values)  

export const getUserData = () => axiosInstance('JwtToken').get('/admin/getUserData')  