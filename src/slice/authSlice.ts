import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth" ,
    initialState: {
        isLoading: false,
        successMsg: "",
        errorMsg: "",
        error: false,
        data: "",
    },
     reducers: {
        setIsLoading: (state: any, action:{payload: any}) => {
            state.isLoading = action.payload;
        },
         setSuccessMsg: (state: any, action:{payload: any}) => {
             state.successMsg = action.payload;
         },
         setErrorMsg: (state: any, action:{payload: any}) => {
             state.errorMsg = action.payload;
         },
         setError: (state: any, action: { payload: any }) => {
             state.error = action.payload;
         },
         setData: (state: any, action:{payload: any}) => {
             state.data = action.payload;
         },
     }
})

export const authAction = authSlice.actions;
export default authSlice.reducer
