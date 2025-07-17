// generalSlice.js

import { createSlice } from '@reduxjs/toolkit';
// import { store } from "../store";

const initialState = {
  loading: [],
  isMobile: false,
  menubar: false,
  confetti: {
    show: false,
    width: window.innerWidth,
    height: window.innerHeight,
    recycle: false,
    numberOfPieces: 200,
  },
  notifications: [],
  errors: [],
  userPreferences: {
    soundEnabled: true,
    animationsEnabled: true,
    theme: 'light',
  },
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    showLoader: state => {
      state.loading.push(1);
    },
    stopLoader: state => {
      state.loading.pop();
    },
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setMenubar: (state, action) => {
      state.menubar = action.payload;
    },
    startConfetti: state => {
      state.confetti.show = true;
    },
    stopConfetti: state => {
      state.confetti.show = false;
    },
    setConfetti: (state, action) => {
      state.confetti = { ...state.confetti, ...action.payload };
    },
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    addError: (state, action) => {
      state.errors.push({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
    },
    clearErrors: state => {
      state.errors = [];
    },
    updateUserPreferences: (state, action) => {
      state.userPreferences = { ...state.userPreferences, ...action.payload };
    },
  },
});

export const {
  showLoader,
  stopLoader,
  setMobile,
  setMenubar,
  setConfetti,
  startConfetti,
  stopConfetti,
  addNotification,
  removeNotification,
  addError,
  clearErrors,
  updateUserPreferences,
} = generalSlice.actions;

export default generalSlice.reducer;
