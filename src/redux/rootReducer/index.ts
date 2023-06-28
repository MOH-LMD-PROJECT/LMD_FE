import authSlice from "../slices/auth";
import {combineReducers } from "@reduxjs/toolkit";



  const rootReducer = combineReducers({
    auth: authSlice
  });
  
  export default rootReducer