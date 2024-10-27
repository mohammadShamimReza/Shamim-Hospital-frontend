import { combineReducers } from "@reduxjs/toolkit";




import { baseApi } from "./api/baseApi";
import { authSlice } from "./slice/authSlice";
import { initialRenderSlice } from "./slice/initialRenderSlice";

export const reducer = combineReducers({
  auth: authSlice.reducer,
  initialRenderSlice: initialRenderSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
