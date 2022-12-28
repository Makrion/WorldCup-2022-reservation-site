import { createSlice } from "@reduxjs/toolkit"


const initialState = {
   inferredRole: ''
 }
 
 const reducers = {
 
   SetInferredRole(state, action) {
      state.inferredRole = action.payload
    },
 }

const homeSlice = createSlice({name: "home", initialState, reducers})

export const { SetInferredRole } = homeSlice.actions
export default homeSlice.reducer