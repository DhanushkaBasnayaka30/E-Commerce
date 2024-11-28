import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  const name = localStorage.getItem('name') || ""; 
  const mobile = localStorage.getItem('mobile') || ""; 
  const token= localStorage.getItem("token") || false;
  return { name, mobile,token };
};

const initialState = loadFromLocalStorage();

export const LoginSlice = createSlice({
  name: "loginslice",
  initialState,
  reducers: {
    setLoginValue: (state, action) => {
      const { name, mobile ,token} = action.payload;
      state.name = name; 
      state.mobile = mobile;
      state.token = token;
      localStorage.setItem('name', name); 
      localStorage.setItem('mobile', mobile); 
      localStorage.setItem('token', token); 
    },
    logoutFun: (state) => {
      state.name = ""; 
      state.mobile = "";
      state.token = false;

      localStorage.removeItem('name');
      localStorage.removeItem('mobile');
      localStorage.removeItem('token');

      if(localStorage.getItem('email') &&
      localStorage.getItem('mobile')){
 
        console.log("LocalStorege value  removed");
      }else{
        console.log("LocalStorege value not removed");
      }

    },
  },
});

export const { setLoginValue, logoutFun } = LoginSlice.actions;


export const selectEmail = (state) => state.loginslice.email;
export const selectmobile = (state) => state.loginslice.mobile;
export const selectToken = (state) => state.loginslice.token;

export default LoginSlice.reducer;
