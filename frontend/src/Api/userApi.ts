import axiosInstance from "../axios/axios";

export const getUserProfile = () => axiosInstance('JwtToken').get('/getUserProfile')
export const userProfileUpdate = (values : object) => axiosInstance('JwtToken').patch('/updateUserData' , values)
export const userSignup = (values : object) => axiosInstance('JwtToken').post('/signUp' ,values)
export const googleSignin = (values : object) => axiosInstance('JwtToken').post('/googleSignin', values)
export const saveUser = (values : object) => axiosInstance('JwtToken').post('/saveUser', values)
export const saveBussinessForm = (values : object) => axiosInstance('JwtToken').post('/saveBussinessForm', values)

// admin
export const getUserData = () => axiosInstance('JwtToken').get('/admin/getUserData')  
export const adminLogin = (values : object) => axiosInstance('JwtToken').post('/admin/roleLogIn' ,values)  
export const blockAndunBlock = (values : object) => axiosInstance('JwtToken').post('/admin/blockAndBlock' ,values)  