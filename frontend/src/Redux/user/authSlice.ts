import {createSlice} from "@reduxjs/toolkit"

const initialState = {
     isLoggedIn:false
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        userLoggedIn: (state ,action) => { 
            state.isLoggedIn = action.payload
        },
        userLoggedOut: (state ,action) => {
            state.isLoggedIn = action.payload;
        }
    }
})

export const {userLoggedIn ,userLoggedOut} = userSlice.actions
export default userSlice.reducer;

export type RootState = {
    user: {
        isLoggedIn : boolean
    }
}