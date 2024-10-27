import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialRender: true,
};

export const initialRenderSlice = createSlice({
  name: "initialRenderSlice",
  initialState,
  reducers: {
    storeInitialRender: (state, action) => {
      state.initialRender = action.payload;
    },
  },
});

export const { storeInitialRender } = initialRenderSlice.actions;
