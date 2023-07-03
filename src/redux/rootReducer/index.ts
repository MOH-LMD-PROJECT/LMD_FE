import authSlice from "../slices/auth";
import condomSlice from "../slices/condom";
import {combineReducers } from "@reduxjs/toolkit";



  const rootReducer = combineReducers({
    condom:condomSlice
  });
  
  export default rootReducer



  