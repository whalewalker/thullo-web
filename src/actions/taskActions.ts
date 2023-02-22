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
  boardTag,
  taskName,
  file,
}: {
  columnId: string;
  boardId: number;
  boardTag: string;
  taskName: string;
  file: any;
}) => {
  return async (dispatch: Function) => {
    dispatch(boardAction.setIsLoading(true));

    try {
      // request for create task
      const response: any = await createTask({
        columnId,
        boardTag,
        taskName,
        file,
      });
      console.log(response);
      dispatch(boardAction.setIsLoading(false));
      dispatch(
        boardAction.setSuccessMsg(extractMessage(response.data.message))
      );
      const task = response.data.data;
      console.log(task, boardId);
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
  boardTag,
  boardRef,
  position,
}: {
  newColumn: dragDropColumn;
  boardTag: string;
  boardRef: string;
  position: number;
}) => {
  return async (dispatch: Function) => {
    try {
      dispatch(boardAction.moveTaskWithinBoardTaskColumn({ newColumn }));
      await moveTask({
        position,
        boardRef,
        boardTag,
        status: newColumn.name,
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
  boardTag,
  boardRef,
  position,
}: {
  startColumn: dragDropColumn;
  endColumn: dragDropColumn;
  boardTag: string;
  position: number;
  boardRef: string;
}) => {
  return async (dispatch: Function) => {
    try {
      dispatch(
        boardAction.moveTaskBetweenBoardTaskColumns({
          startColumn,
          endColumn,
        })
      );

      await moveTask({
        boardTag,
        boardRef,
        position,
        status: endColumn.name,
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
