import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn : false
}

const userSlice = createSlice({
    name : 'admin',
    initialState,
    reducers:{
        adminLoggedIn : (state) => {
            state.isLoggedIn = true
        }
    }
})

export const {adminLoggedIn} = userSlice.actions
export default userSlice.reducer;