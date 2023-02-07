import { extractMessage, toastError, toastSuccess } from "../utils/helperFn";
import { createBoard } from "../services/boardService";
import { boardAction } from "../slice/boardSlice";

export const addBoard = (file: any, boardName: string) => {
  return async (dispatch: Function) => {
    dispatch(boardAction.setIsLoading(true));
    try {
      // sending a request for board to be added
      const response: any = await createBoard(file, boardName);
      dispatch(boardAction.setIsLoading(false));
      toastSuccess(extractMessage(response.data.message));

      // dispatching an action that adds board to boardList
      dispatch(boardAction.addBoardToBoardList(response.data));
    } catch (err) {
      dispatch(boardAction.setIsLoading(false));
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};
