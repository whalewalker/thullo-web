import { extractMessage, toastError, toastSuccess } from "../utils/helperFn";
import {
  createBoard,
  getAllBoards,
  createTask,
} from "../services/boardService";
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

export const getBoards = () => {
  return async (dispatch: Function) => {
    try {
      const response: any = await getAllBoards();
      console.log(response.data.data);
      dispatch(boardAction.setIsLoading(false));

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

export const addTask = ({
  columnId,
  boardId,
  taskName,
  file,
}: {
  columnId: string;
  boardId: string;
  taskName: string;
  file: any;
}) => {
  return async (dispatch: Function) => {
    dispatch(boardAction.setIsLoading(true));

    try {
      const [response1, response2] = await Promise.all([
        await createTask({ columnId, taskName, file }),
        await getAllBoards(),
      ]);
      // const response: any = await createTask({ columnId, taskName, file });
      // console.log(response);
      // const response2: any = await getAllBoards();
      console.log(response2.data.data);
      const boardList = response2.data.data;
      console.log(boardList, boardId);
      const [board] = boardList.filter((board: any) => board.id === boardId);
      console.log(board);
      const [boardColumn] = board.taskColumns.filter(
        (column: any) => column.id === columnId
      );
      const [task] = boardColumn.tasks.slice(-1);
      console.log(task);
      dispatch(boardAction.setIsLoading(false));
      dispatch(
        boardAction.setSuccessMsg(extractMessage(response1.data.message))
      );
      const cardData = response1.data.data;
      console.log(cardData);
      dispatch(boardAction.addTask({ boardId, columnId, task }));
      console.log("Boards");
      toastSuccess(extractMessage(response1.data.message));
      // dispatching an action that adds board to boardList
      // dispatch(boardAction.addBoardToBoardList(response.data));
    } catch (err) {
      dispatch(boardAction.setIsLoading(false));
      console.log(err);
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

// export const addBoardTask = (file: any, boardName: string) => {
//   return async (dispatch: Function) => {
//     dispatch(boardAction.setIsLoading(true));
//     try {
//       // sending a request for board to be added
//       const response: any = await createBoard(file, boardName);
//       dispatch(boardAction.setIsLoading(false));
//       toastSuccess(extractMessage(response.data.message));

//       // dispatching an action that adds board to boardList
//       dispatch(boardAction.addBoardToBoardList(response.data));
//     } catch (err) {
//       dispatch(boardAction.setIsLoading(false));
//       dispatch(boardAction.setError(true));
//       const errorMsg = extractMessage(err);
//       toastError(extractMessage(errorMsg));
//       dispatch(boardAction.setErrorMsg(errorMsg));
//     }
//   };
// };
