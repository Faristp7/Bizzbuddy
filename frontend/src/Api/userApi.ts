import axiosInstance from "../axios/axios";

//- user -\\

export const getUserProfile = () => axiosInstance('JwtToken').get('/getUserProfile')
export const getFollowData = (id : string) => axiosInstance('JwtToken').get(`/getFollowData/${id}`)
export const getAnotherUserProfile = (id: string) => axiosInstance('JwtToken').get(`/getAnotherUserProfile/${id}`)
export const searchTags = (data: string) => axiosInstance('JwtToken').get('/searchTags', { params: { data: data } })
export const getHomePagePost = (queryParams: object) => axiosInstance('JwtToken').get(`/getHomePagePost?${queryParams}`)
export const searchAccount = (data: string) => axiosInstance('JwtToken').get('/searchAccount', { params: { data: data } })
export const searchBusiness = (data: string) => axiosInstance('JwtToken').get('/searchBusiness', { params: { data: data } })
export const getComment = (id: string, currentPage: number) => axiosInstance('JwtToken').get(`/getComment/${id}/${currentPage}`)
export const getProfilePost = (userId: string, page: number) => axiosInstance('JwtToken').get(`/getProfilePost/${userId}/${page}`)

export const userProfileUpdate = (values: object) => axiosInstance('JwtToken').patch('/updateUserData', values)
export const updateBusinessData = (values: object) => axiosInstance('JwtToken').patch('/updateBusinessData', values)

export const deletePost = (id: string) => axiosInstance('JwtToken').delete(`/deletePost/${id}`)

export const userSignup = (values: object) => axiosInstance('JwtToken').post('/signUp', values)
export const saveUser = (values: object) => axiosInstance('JwtToken').post('/saveUser', values)
export const createPost = (values: object) => axiosInstance('JwtToken').post('/createPost', values)
export const manageLike = (values: object) => axiosInstance('JwtToken').post('/manageLike', values)
export const reportPost = (values: object) => axiosInstance('JwtToken').post('/reportPost', values)
export const addComment = (values: object) => axiosInstance('JwtToken').post('/addComment', values)
export const editUserPost = (values: object) => axiosInstance('JwtToken').post('/editUserPost', values)
export const googleSignin = (values: object) => axiosInstance('JwtToken').post('/googleSignin', values)
export const manageFollow = (values: object) => axiosInstance('JwtToken').post('/manageFollow', values)
export const saveBussinessForm = (values: object) => axiosInstance('JwtToken').post('/saveBussinessForm', values)

//- admin -\\

export const getUserData = () => axiosInstance('JwtToken').get('/admin/getUserData')

export const adminLogin = (values: object) => axiosInstance('JwtToken').post('/admin/roleLogIn', values)
export const blockAndunBlock = (values: object) => axiosInstance('JwtToken').post('/admin/blockAndBlock', values)  