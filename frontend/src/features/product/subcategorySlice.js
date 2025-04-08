import { createSlice } from "@reduxjs/toolkit";
import { subcategoryApi } from "./subcategoryApi.js";

const subcategorySlice = createSlice({
    name:"subcategory",
    initialState:{subcategories:null},
    extraReducers:(builder)=>{
        builder.addMatcher(
            subcategoryApi.endpoints.getSubCategoryDetails.matchFulfilled,
            (state,action)=>{
                state.subcategories = action.payload.data
                console.log("Sub Category details has stored into redux:",state.subcategories);
            }
        )
    }
})

// I have to export this two things 
// actions and the reducers
export default subcategorySlice.reducer;