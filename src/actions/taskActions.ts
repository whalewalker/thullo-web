import { boardAction } from "../slice/boardSlice";
import { extractMessage, toastError, toastSuccess } from "../utils/helperFn";
import {
  createTask,
  moveTask,
  createCommentReq,
} from "../services/taskService";
import { dragDropColumn } from "../utils/types";

export const addTask = ({
  columnId,
  boardId,
  taskName,
  file,
}: {
  columnId: number;
  boardId: number;
  taskName: string;
  file: any;
}) => {
  return async (dispatch: Function) => {
    dispatch(boardAction.setIsLoading(true));

    try {
      // request for create task
      const response: any = await createTask({ columnId, taskName, file });
      dispatch(boardAction.setIsLoading(false));
      dispatch(
        boardAction.setSuccessMsg(extractMessage(response.data.message))
      );
      const task = response.data.data;
      dispatch(boardAction.addTask({ boardId, columnId, task }));
      toastSuccess(extractMessage(response.data.message));
    } catch (err) {
      dispatch(boardAction.setIsLoading(false));
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

export const moveTaskWithinColumn = ({
  newColumn,
  boardId,
  position,
  taskId,
}: {
  newColumn: dragDropColumn;
  boardId: number;
  position: number;
  taskId: number;
}) => {
  return async (dispatch: Function) => {
    try {
      dispatch(
        boardAction.moveTaskWithinBoardTaskColumn({ newColumn, boardId })
      );
      const response: any = await moveTask({
        position,
        taskId,
        newColumnId: newColumn.id,
      });
    } catch (err) {
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

export const moveTaskBetweenColumn = ({
  startColumn,
  endColumn,
  boardId,
  position,
  taskId,
}: {
  startColumn: dragDropColumn;
  endColumn: dragDropColumn;
  boardId: number;
  position: number;
  taskId: number;
}) => {
  console.log(typeof boardId);
  return async (dispatch: Function) => {
    try {
      dispatch(
        boardAction.moveTaskBetweenBoardTaskColumns({
          startColumn,
          endColumn,
          boardId,
        })
      );

      const response: any = await moveTask({
        position,
        taskId,
        newColumnId: endColumn.id,
      });
    } catch (err) {
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};

export const createComment = ({
  boardRef,
  message,
  mentionedUsers,
  taskId,
  user,
  columnId,
}: {
  boardRef: string;
  user: string;
  taskId: number;
  message: string;
  columnId: number;
  mentionedUsers: string[];
}) => {
  return async (dispatch: Function) => {
    try {
      console.log({
        boardRef,
        message,
        mentionedUsers,
        taskId,
        user,
      });
      // const response = await createCommentReq({
      //   boardRef,
      //   message,
      //   mentionedUsers,
      //   taskId,
      // });

      dispatch(
        boardAction.addCommentToTaskComments({
          user,
          boardRef,
          columnId,
          taskId,
          comment: message,
        })
      );

      // console.log(response);
    } catch (err) {
      dispatch(boardAction.setError(true));
      const errorMsg = extractMessage(err);
      toastError(extractMessage(errorMsg));
      dispatch(boardAction.setErrorMsg(errorMsg));
    }
  };
};
