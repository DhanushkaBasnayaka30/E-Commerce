import { createSlice } from "@reduxjs/toolkit";

// Helper function to set sessionStorage with expiration
const setWithExpiry = (key, value, ttl) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  sessionStorage.setItem(key, JSON.stringify(item));
};

// Helper function to get sessionStorage with expiration check
const getWithExpiry = (key) => {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (item.expiry && now.getTime() > item.expiry) {
      sessionStorage.removeItem(key); // Remove if expired
      return null;
    }
    return item.value;
  } catch (error) {
    // If parsing fails, remove the item and return null
    sessionStorage.removeItem(key);
    return null;
  }
};

// Function to load from sessionStorage
const loadFromSessionStorage = () => {
  const name = getWithExpiry("name") || "";
  const mobile = getWithExpiry("mobile") || "";
  const token = getWithExpiry("token") || false;
  return { name, mobile, token };
};

// Initial state loaded from sessionStorage
const initialState = loadFromSessionStorage();

export const LoginSlice = createSlice({
  name: "loginslice",
  initialState,
  reducers: {
    setLoginValue: (state, action) => {
      const { name, mobile, token } = action.payload;
      state.name = name;
      state.mobile = mobile;
      state.token = token;

      // Set sessionStorage with 1-day expiration (24 hours in milliseconds)
      const oneDayInMs = 24 * 60 * 60 * 1000;
      setWithExpiry("name", name, oneDayInMs);
      setWithExpiry("mobile", mobile, oneDayInMs);
      setWithExpiry("token", token, oneDayInMs);
    },
    logoutFun: (state) => {
      state.name = "";
      state.mobile = "";
      state.token = false;

      sessionStorage.removeItem("name");
      sessionStorage.removeItem("mobile");
      sessionStorage.removeItem("token");

      if (!sessionStorage.getItem("name") && !sessionStorage.getItem("mobile") && !sessionStorage.getItem("token")) {
        console.log("SessionStorage values removed");
      } else {
        console.log("SessionStorage values not removed");
      }
    },
  },
});

export const { setLoginValue, logoutFun } = LoginSlice.actions;

export const selectName = (state) => state.loginslice.name;
export const selectmobile = (state) => state.loginslice.mobile;
export const selectToken = (state) => state.loginslice.token;

export default LoginSlice.reducer;
