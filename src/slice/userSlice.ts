import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    successMsg: "",
    errorMsg: "",
    error: false,
    currentUserData: { data: { name: "" } },
  },
  reducers: {
    setIsLoading: (state: any, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    setSuccessMsg: (state: any, action: any) => {
      state.successMsg = action.payload;
    },
    setErrorMsg: (state: any, action: any) => {
      state.errorMsg = action.payload;
    },
    setError: (state: any, action: { payload: boolean }) => {
      state.error = action.payload;
    },
    setCurrentUserData: (state: any, action: any) => {
      state.currentUserData = action.payload;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
