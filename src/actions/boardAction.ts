import { extractMessage, toastError, toastSuccess } from "../utils/helperFn";
import { createBoard, getBoard, getAllBoards } from "../services/boardService";
import { boardAction } from "../slice/boardSlice";

export const addBoard = (file: any, boardName: string) => {
  return async (dispatch: Function) => {
    dispatch(boardAction.setIsLoading(true));
    try {
      // sending a request for board to be added
      const response: any = await createBoard(file, boardName);
      console.log(response.data.data);
      dispatch(boardAction.setIsLoading(false));
      toastSuccess(extractMessage(response.data.message));

      // dispatching an action that adds board to boardList
      dispatch(boardAction.addBoardToBoardList(response.data.data));
    } catch (err) {
      dispatch(boardAction.setIsLoading(false));
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

export const getBoardItem = (boardTag: string) => {
  return async (dispatch: Function) => {
    try {
      const response = await getBoard(boardTag);
      console.log(response.data.data);
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
      console.log(response);
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
