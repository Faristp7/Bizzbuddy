import {createSlice} from "@reduxjs/toolkit"

const initalState = {
     isLoggedIn:false
}

const userSlice = createSlice({
    name : 'user',
    initalState,
    reducers:{
        userLoggedIn: (state) => {
            state.isLoggedIn = true
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
        }
    }
})

export const {userLoggedIn , userLoggedOut} = userSlice.actions
export default userSlice.reducer;