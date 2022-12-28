import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserState/UserSlice';
import homeReducer from './HomeState/HomeSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    home: homeReducer,
  },
});

export default store;
