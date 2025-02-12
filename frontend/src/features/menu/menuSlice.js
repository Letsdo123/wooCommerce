import { createSlice } from "@reduxjs/toolkit";
import { menuApi } from "./menuApi";

const menuSlice = createSlice({
    name:"menu",
    initialState:{menu:null},
    extraReducers:(builder)=>{
        builder.addMatcher(
            menuApi.endpoints.fetchMenuItem.matchFulfilled,
            (state,action)=>{
                state.menu = action.payload.data
                console.log("Menu details has stored into redux:",state.menu);
            }
        )
    }
})

// I have to export this two things 
// actions and the reducers
export default menuSlice.reducer;