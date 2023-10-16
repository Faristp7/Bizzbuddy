import axiosInstance from "../axios/axios";

//- user -\\

export const getUserProfile = () => axiosInstance('JwtToken').get('/getUserProfile')
export const getProfilePost = (page: number) => axiosInstance('JwtToken').get(`/getProfilePost/${page}`)
export const getAnotherUserProfile = (id: string) => axiosInstance('JwtToken').get(`/getAnotherUserProfile/${id}`)
export const searchAccount = (data: string) => axiosInstance('JwtToken').get('/searchAccount', { params: { data: data } })
export const searchTags = (data: string) => axiosInstance('JwtToken').get('/searchTags', { params: { data: data } })
export const searchBusiness = (data: string) => axiosInstance('JwtToken').get('/searchBusiness', { params: { data: data } })

export const userProfileUpdate = (values: object) => axiosInstance('JwtToken').patch('/updateUserData', values)
export const updateBusinessData = (values: object) => axiosInstance('JwtToken').patch('/updateBusinessData', values)

export const deletePost = (id: string) => axiosInstance('JwtToken').delete(`/deletePost/${id}`)

export const userSignup = (values: object) => axiosInstance('JwtToken').post('/signUp', values)
export const googleSignin = (values: object) => axiosInstance('JwtToken').post('/googleSignin', values)
export const saveUser = (values: object) => axiosInstance('JwtToken').post('/saveUser', values)
export const saveBussinessForm = (values: object) => axiosInstance('JwtToken').post('/saveBussinessForm', values)
export const createPost = (values: object) => axiosInstance('JwtToken').post('/createPost', values)
export const editUserPost = (values: object) => axiosInstance('JwtToken').post('/editUserPost', values)

//- admin -\\

export const getUserData = () => axiosInstance('JwtToken').get('/admin/getUserData')

export const adminLogin = (values: object) => axiosInstance('JwtToken').post('/admin/roleLogIn', values)
export const blockAndunBlock = (values: object) => axiosInstance('JwtToken').post('/admin/blockAndBlock', values)  