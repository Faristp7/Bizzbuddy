import {combineReducers} from '@reduxjs/toolkit'
import adminReducer from './admin/adminReducer'
import userReducer from './user/userReducer'

const rootReducer = combineReducers({
    admin : adminReducer,
    user : userReducer,
})

export default rootReducer