import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  data: {
    name: string;
    imageUrl: string;
    bio: string;
    phoneNumber: string;
    email: string;
  };
}

const currentUser: any = localStorage.getItem("userData");

const storedUserData = JSON.parse(currentUser);

const userSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    successMsg: "",
    errorMsg: "",
    error: false,
    currentUserData: storedUserData || {
        name: "",
        imageUrl: "",
        bio: "",
        phoneNumber: "",
        email: "",
      },
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
    setCurrentUserData: (state: any, action: { payload: UserData }) => {
      state.currentUserData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
