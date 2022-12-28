import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './HomeState/HomeSlice';
import userReducer from './UserState/UserSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
  },
});

export default store;
