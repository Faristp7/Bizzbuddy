import axiosInstance from "../axios/axios";

export const userSignup = (values : object) => axiosInstance('JwtToken').post('/signUp' ,values)
export const googleSignin = (values : object) => axiosInstance('JwtToken').post('/googleSignin', values)
export const saveUser = (values : object) => axiosInstance('JwtToken').post('/saveUser', values)
export const saveBussinessForm = (values : object) => axiosInstance('JwtToken').post('/saveBussinessForm', values)

// admin
export const adminLogin = (values : object) => axiosInstance('JwtToken').post('/admin/roleLogIn' ,values)  
export const getUserData = () => axiosInstance('JwtToken').get('/admin/getUserData')  
export const blockAndBlock = (values : object) => axiosInstance('JwtToken').post('/admin/blockAndBlock' ,values)  