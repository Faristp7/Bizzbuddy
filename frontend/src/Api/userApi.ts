import axiosInstance from "../axios/axios";

export const userSignup = (values : object) => {    
    return axiosInstance('JwtToken').post('/signUp' ,values)
}