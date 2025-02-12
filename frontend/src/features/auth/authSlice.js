import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const authSlice = createSlice({
    name:"auth",
    initialState:{user:null},
    extraReducers:(builder)=>{
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state,action)=>{
                state.user = action.payload.data
                console.log("User details has stored into redux:",state.user);
            }
        )
        .addMatcher(
            authApi.endpoints.logout.matchFulfilled,
            (state)=>{
                state.user = null;
                console.log("User logged out successfully , state cleared.");
            }
        )
    }
})

// I have to export this two things 
// actions and the reducers
export default authSlice.reducer;