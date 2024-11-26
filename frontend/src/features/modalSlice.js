import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState:{
        isModalOpen:false,
        isFooter:false,
        modalTitle:"Sample Modal",
        modalType:null, // This is the iniatial state here it will replce by different type like 'login','register' etc,
        extraModalInfo:null
    },
    reducers:{
        openModal:(state,action)=>{
            state.isModalOpen = true
            state.modalType=action.payload.modalType
            state.isFooter = action.payload.footer
            state.modalTitle = action.payload.modalTitle
            state.extraModalInfo = action.payload?.extraModalInfo
        },
        // Inside this function we are setting all value to the previous state
        closeModal:(state)=>{
            state.isModalOpen=false
            state.modalType=null
        }
    }
})

export const {openModal,closeModal} = modalSlice.actions
export default modalSlice.reducer