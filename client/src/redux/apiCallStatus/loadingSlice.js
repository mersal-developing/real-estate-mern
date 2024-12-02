import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  loading: false,
};

export const apiCallingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    apiCallStart: (state) => {
      state.loading = true;
    },
    apiCallSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    apiCallFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { apiCallStart, apiCallSuccess, apiCallFailed } =
  apiCallingSlice.actions;
export default apiCallingSlice.reducer;
