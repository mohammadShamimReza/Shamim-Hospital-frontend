import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  name: string;
  email: string;
  role: string;
  id: string;
  phone: number;
  address: string
}

interface AuthState {
  userInfo: UserInfo;
  authToken: string | null;
}

const initialState: AuthState = {
  userInfo: {
    name: "",
    email: "",
    role: "",
    id: "",
    phone: 0, // Initial value for phone (default to 0 or your preferred placeholder)
    address: "", // Initial value for address (default to an empty string)
  },
  authToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    storeAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
    removeAuthToken: (state) => {
      state.authToken = null;
    },
  },
});

export const { storeAuthToken, storeUserInfo, removeAuthToken } =
  authSlice.actions;
export default authSlice.reducer;
