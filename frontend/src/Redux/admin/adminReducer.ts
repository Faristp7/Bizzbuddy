import {createSlice} from "@reduxjs/toolkit"

const initalState = {
    isLoggedIn : false
}

const userSlice = createSlice({
    name : 'admin',
    initalState,
    reducers:{
        adminLoggedIn : (state) => {
            state.isLoggedIn = true
        }
    }
})

export const {adminLoggedIn} = userSlice.actions
export default userSlice.reducer;