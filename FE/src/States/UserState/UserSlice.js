import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api } from '../api';




const initialState = {
   userInfo: {
   firstName: '',
   lastName: '',
   username: '',
   email: '',
   country: '',
   birthDate: '',
   gender: '',
   role: '',
   accessToken: '',
   id: '',
   isVerified: false
   },
   isLoggedIn: false,
   isLoading: false,
   error: null,
   updateIsLoading: false,
   updateError: null,
   updateSuccess: false,
    logoutIsLoading: false,
    logoutError: null,
    logoutSuccess: false,
 }
 
 const reducers = {

    SetUserInfo(state, action) {
      state.userInfo = action.payload
    },
    SetIsLoggedIn(state, action){
      state.isLoggedIn = action.payload
    },
    loadInitialState(state){
      if(localStorage.getItem('userInfo')){
        state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        state.isLoggedIn = true
      }
      else {
        state.userInfo = initialState.userInfo
        state.isLoggedIn = false
      }
    },
    ResetCard(state){
      state.updateError = null
      state.updateSuccess = false
    }




 }

 export const loginAPI = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const api = 'http://141.147.48.195:8000'
    const response = await axios.post(`${api}/api/user/login`, credentials);
    console.log(response)
    return response.data;
  }
);

export const signUpAPI = createAsyncThunk(
  'user/signup',
  async (credentials) => {
    const api = 'http://141.147.48.195:8000'
    const response = await axios.post(`${api}/api/user/register`, credentials);
    return response.data;   
  }
);

export const logoutAPI = createAsyncThunk(
  'user/logout',
  async (token) => {
    const api = 'http://141.147.48.195:8000'
    // make a post request and pass the access token in the header 
    const response = await axios.post(`${api}/api/user/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } 
);

export const updateAPI = createAsyncThunk(
  'user/update',
  async (credentials) => {
    const updatedCredentials = {}
    const api = 'http://141.147.48.195:8000'

    updatedCredentials.old_password = credentials.oldPassword
    if (credentials.firstName) updatedCredentials.first_name = credentials.firstName
    if (credentials.lastName) updatedCredentials.last_name = credentials.lastName
    if (credentials.country) updatedCredentials.nationality = credentials.country
    if (credentials.birthDate) updatedCredentials.birth_date = (new Date(credentials.birthDate)).getTime()/1000 
    if (credentials.newPassword) updatedCredentials.password = credentials.newPassword

  
    const response = await axios.put(`${api}/api/user/update`, updatedCredentials, {
      headers: {
        Authorization: `Bearer ${credentials.accessToken}`
        }
        });

        console.log(response)
    return response.data;
  }
);


const extraReducers = {
  [loginAPI.fulfilled]: (state, action) => {
    state.userInfo.firstName = action.payload.first_name;
    state.userInfo.lastName = action.payload.last_name;
    state.userInfo.username = action.payload.username;
    state.userInfo.accessToken = action.payload.access_token;
    state.userInfo.email = action.payload.email;
    state.userInfo.birthDate = action.payload.birth_date
    state.userInfo.gender = (action.payload==="m")? "Male" : "Female"
    state.userInfo.country = action.payload.nationality
    state.userInfo.id = action.payload.id
    state.userInfo.role = action.payload.role
    state.userInfo.isVerified = action.payload.is_verified  
    state.isLoggedIn = true;
    // save userInfo to local storage
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn))
  },
  [loginAPI.pending]: (state, action) => {
    state.isLoading = true;
  },
  [loginAPI.rejected]: (state, action) => {
    state.error = "Could not log in. Please check your credentials and try again."
    state.isLoading = false;
  },
  [logoutAPI.pending]: (state, action) => {
    state.logoutIsLoading = true;
  },

  [logoutAPI.rejected]: (state, action) => {
    state.logoutError = "Could not log out. Please try again."
    state.logoutIsLoading = false;
  },

  [logoutAPI.fulfilled]: (state, action) => {
    state.userInfo = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      country: '',
      birth_date: '',
      gender: '',
      role: '',
      accessToken: '',
      id: '',
      isVerified: false
    }
    state.isLoggedIn = false;
    state.logoutIsLoading = false;
    state.logoutSuccess = true;
    // remove userInfo from local storage
    localStorage.removeItem('userInfo')
  },



  [signUpAPI.fulfilled]: (state, action) => {
    state.userInfo.firstName = action.payload.first_name;
    state.userInfo.lastName = action.payload.last_name;
    state.userInfo.username = action.payload.username;
    state.userInfo.accessToken = action.payload.access_token;
    state.userInfo.email = action.payload.email;
    state.userInfo.birthDate = action.payload.birth_date
    state.userInfo.gender = (action.payload==="m")? "Male" : "Female"
    state.userInfo.country = action.payload.nationality
    state.userInfo.id = action.payload.id
    state.userInfo.role = action.payload.role
    state.userInfo.isVerified = action.payload.is_verified    
    state.isLoggedIn = true;
    // save userInfo to local storage
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  [signUpAPI.pending]: (state, action) => {
    state.isLoading = true;
  },
  [signUpAPI.rejected]: (state, action) => {
   state.error = action.error.message
   state.isLoading = false;
   
  },
  [updateAPI.fulfilled]: (state, action) => {
    state.userInfo.firstName = action.payload.first_name;
    state.userInfo.lastName = action.payload.last_name;
    state.userInfo.username = action.payload.username;
    state.userInfo.accessToken = action.payload.access_token;
    state.userInfo.email = action.payload.email;
    state.userInfo.birthDate = action.payload.birth_date
    console.log(action.payload.birth_date)
    state.userInfo.gender = (action.payload.gender==="m")? "Male" : "Female"
    state.userInfo.country = action.payload.nationality
    state.userInfo.id = action.payload.id
    state.userInfo.role = action.payload.role
    state.userInfo.isVerified = action.payload.is_verified   
    console.log(action.payload)
    console.log(state.userInfo.gender)
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    state.updateSuccess = true
    state.updateIsLoading = false;
  },
  [updateAPI.pending]: (state, action) => {
    state.updateIsLoading = true;
  },
  [updateAPI.rejected]: (state, action) => {
    state.updateError = action.error.message
    state.updateIsLoading = false;

    }
}




const userSlice = createSlice({name: "user", initialState, reducers, extraReducers})

export const { SetUserInfo, SetIsLoggedIn, loadInitialState, ResetCard } = userSlice.actions
export default userSlice.reducer