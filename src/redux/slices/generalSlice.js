import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: [],
  isMobile: false,
  menubar: false,
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loading.push(1);
    },
    stopLoader: (state) => {
      state.loading.pop();
    },
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setMenubar: (state, action) => {
      state.menubar = action.payload;
    },
  },
});

export const { showLoader, stopLoader, setMobile, setMenubar } =
  generalSlice.actions;

export default generalSlice.reducer;
