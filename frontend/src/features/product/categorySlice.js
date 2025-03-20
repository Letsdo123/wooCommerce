import { createSlice } from "@reduxjs/toolkit";
import { categoryApi } from "./categoryApi.js";

const categorySlice = createSlice({
    name:"category",
    initialState:{categories:null},
    extraReducers:(builder)=>{
        builder.addMatcher(
            categoryApi.endpoints.getCategoryDetails.matchFulfilled,
            (state,action)=>{
                state.categories = action.payload.data
                console.log("Category details has stored into redux:",state.categories);
            }
        )
    }
})

// I have to export this two things 
// actions and the reducers
export default categorySlice.reducer;