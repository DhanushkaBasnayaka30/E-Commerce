import { configureStore } from "@reduxjs/toolkit";

import LoginReducer from "../Slices/UserSlice.js"

export const store = configureStore({
  reducer: {
    
    loginslice:LoginReducer,
 
  },
});