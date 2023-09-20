import axiosInstance from "../axios/axios";

export const userSignup = (values : object) => {    
    return axiosInstance('JwtToken').post('/signUp' ,values)
}

export const googleSignin = (values : object) => {
    return axiosInstance('JwtToken').post('/googleSignin', values)
}