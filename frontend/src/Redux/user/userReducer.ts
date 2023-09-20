import {createSlice} from "@reduxjs/toolkit"

const initialState = {
     isLoggedIn:false
}


const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        userLoggedIn: (state) => {     
            console.log(state);
                   
            state.isLoggedIn = true
        },
        userLoggedOut: (state) => {
            state.isLoggedIn = false;
        }
    }
})

export const {userLoggedIn , userLoggedOut} = userSlice.actions
export default userSlice.reducer;