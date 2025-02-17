import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  type: 'success',
  flag: false, // To track if a toast is displayed
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.flag = true;
    },
    clearToast: (state) => {
      state.message = '';
      state.type = 'success';
      state.flag = false;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
