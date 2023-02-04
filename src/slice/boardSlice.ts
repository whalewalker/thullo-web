import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    isLoading: false,
    successMsg: "",
    errorMsg: "",
    error: false,
    boardList: [],
  },
  reducers: {
    setIsLoading(state: any, action: { payload: boolean }) {
      state.isLoading = action.payload;
    },
    setSuccessMsg(state: any, action: any) {
      state.successMsg = action.payload;
    },
    setErrorMsg(state: any, action: any) {
      state.errorMsg = action.payload;
    },
    setError(state: any, action: { payload: boolean }) {
      state.error = action.payload;
    },
    addBoardToBoardList(state: any, action: any) {
      // adding board to board list
      state.boardList = [...state.boardList, action.payload];
    },
  },
});

export const boardAction = boardSlice.actions;
export default boardSlice.reducer;
