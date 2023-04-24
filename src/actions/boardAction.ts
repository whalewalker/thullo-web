import { extractMessage, toastError, toastSuccess } from "../utils/helperFn";
import {
  createBoard,
  getBoard,
  getAllBoards, editBoard,

} from "../services/boardService";
import { boardAction } from "../slice/boardSlice";
import {AddBoardData} from "../utils/types";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const addBoard = createAsyncThunk(
    "board/addBoard",
    async (data: AddBoardData, { dispatch }) => {
      dispatch(boardAction.setIsLoading(true));
      try {
        // sending a request for board to be added
        const response: any = await createBoard(data);
        dispatch(boardAction.setIsLoading(false));
        toastSuccess(extractMessage(response.data.message));

        // dispatching an action that adds board to boardList
        dispatch(boardAction.addBoardToBoardList(response.data.data));
        return response.data.data;
      } catch (err) {
        dispatch(boardAction.setIsLoading(false));
        dispatch(boardAction.setError(true));
        const errorMsg = extractMessage(err);
        toastError(extractMessage(errorMsg));
        dispatch(boardAction.setErrorMsg(errorMsg));
        throw err;
      }
    }
);

export const getBoardItem = (boardTag: string) => {
  return async (dispatch: Function) => {
    dispatch(boardAction.setIsLoading(true));
    try {
      const response = await getBoard(boardTag);
      dispatch(boardAction.setBoard(response.data.data));
    } catch (err) {
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

export const getBoards = () => {
  return async (dispatch: Function) => {
    try {
      const response: any = await getAllBoards();
      // dispatching an action that adds board to boardList
      dispatch(boardAction.getAllBoards(response.data.data));
    } catch (err) {
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

export const editBoardAction = (data: AddBoardData) => {
  return async (dispatch: Function) => {
    try {
      // dispatch(boardAction.editBoardItem(data));

      await editBoard(data);
    } catch (error) {
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(error);
      toastError(errorMsg);
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

