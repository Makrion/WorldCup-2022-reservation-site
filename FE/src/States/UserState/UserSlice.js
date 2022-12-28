import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
   userInfo: {
   firstName: '',
   lastName: '',
   username: '',
   email: '',
   birth_data: '',
   gender: '',
   role: '',
   accessToken: '',
   id: ''
   },
   isLoggedIn: false
 }
 
 const reducers = {

    SetUserInfo(state, action) {
      state.userInfo = action.payload
    },
    SetIsLoggedIn(state, action){
      state.isLoggedIn = action.payload
    }

 }

 export const login = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const response = await axios.post('/api/login', credentials);
    return response.data;
  }
);

export const signup = createAsyncThunk(
  'user/signup',
  async (credentials) => {
    const response = await axios.post('/api/signup', credentials);
    return response.data;
  }
);

const extraReducers = {
  [login.fulfilled]: (state, action) => {
    state.userInfo = action.payload;
    state.isLoggedIn = true;
  },
  [signup.fulfilled]: (state, action) => {
    state.userInfo = action.payload;
    state.isLoggedIn = true;
  }
}




const userSlice = createSlice({name: "user", initialState, reducers, extraReducers})

export const { SetUserInfo, SetIsLoggedIn } = userSlice.actions
export default userSlice.reducer