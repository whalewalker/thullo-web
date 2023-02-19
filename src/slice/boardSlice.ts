import { createSlice, current } from "@reduxjs/toolkit";
import { Board, dragDropColumn, Task } from "../utils/types";

const storedBoardList: any = localStorage.getItem("boardList");
const storedList = JSON.parse(storedBoardList);
const storedBoardTag: any = localStorage.getItem("boardTag");

const boardSlice = createSlice({
  name: "board",
  initialState: {
    displayAddTaskForm: false,
    displayAddColumnForm: false,
    displayTaskModal: false,
    boardTag: storedBoardTag || "",
    taskId: undefined,
    columnId: null,
    isLoading: false,
    successMsg: "",
    errorMsg: "",
    error: false,
    boardList: storedList || [],
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
    getAllBoards(state: any, action: any) {
      state.boardList = action.payload;

      localStorage.setItem("boardList", JSON.stringify(action.payload));
    },
    setColumnId(state: any, action: { payload: number | undefined }) {
      state.columnId = action.payload;
    },

    addBoardToBoardList(state: any, action: any) {
      // adding board to board list
      const list = [action.payload, ...state.boardList];
      state.boardList = list;

      localStorage.setItem("boardList", JSON.stringify(list));
    },

    addTask(
      state: any,
      action: { payload: { boardId: number; columnId: number; task: Task } }
    ) {
      const { boardId, columnId, task } = action.payload;

      const boardItemIndex = state.boardList.findIndex(
        (board: Board) => board.id === boardId
      );

      const boardItem = state.boardList[boardItemIndex];

      const boardColumnIndex = boardItem.taskColumns.findIndex(
        (column: dragDropColumn) => column.id === columnId
      );

      const boardColumn =
        state.boardList[boardItemIndex].taskColumns[boardColumnIndex];

      state.boardList[boardItemIndex].taskColumns[boardColumnIndex].tasks = [
        ...boardColumn.tasks,
        task,
      ];

      const list = state.boardList;

      localStorage.setItem("boardList", JSON.stringify(list));
    },
    moveTaskWithinBoardTaskColumn(
      state: any,
      action: { payload: { boardId: number; newColumn: dragDropColumn } }
    ) {
      const { boardId, newColumn } = action.payload;

      // process
      // find the index of existing board
      const boardIndex: number = state.boardList.findIndex(
        (board: Board) => board.id === boardId
      );

      // find  board
      const newBoard: Board = state.boardList[boardIndex];

      // find index of column
      const columnIndex: number = newBoard.taskColumns.findIndex(
        (column) => column.id === newColumn.id
      );
      // change the column on new board
      state.boardList[boardIndex].taskColumns[columnIndex] = newColumn;

      const list = state.boardList;

      localStorage.setItem("boardList", JSON.stringify(list));
    },
    moveTaskBetweenBoardTaskColumns(
      state: any,
      action: {
        payload: {
          boardId: number;
          startColumn: dragDropColumn;
          endColumn: dragDropColumn;
        };
      }
    ) {
      const { boardId, startColumn, endColumn } = action.payload;

      // process
      // find the index of existing board
      const boardIndex: number = state.boardList.findIndex(
        (board: Board) => board.id === boardId
      );
      // find  board
      const newBoard: Board = state.boardList[boardIndex];

      // find index of columns
      const startColumnIndex: number = newBoard.taskColumns.findIndex(
        (column) => column.id === startColumn.id
      );

      const endColumnIndex = newBoard.taskColumns.findIndex(
        (column) => column.id === endColumn.id
      );

      // change the columns on new board
      state.boardList[boardIndex].taskColumns[startColumnIndex] = startColumn;

      state.boardList[boardIndex].taskColumns[endColumnIndex] = endColumn;

      const list = state.boardList;

      localStorage.setItem("boardList", JSON.stringify(list));
    },
    toggleDispayAddTaskForm(state: any, action: { payload: boolean }) {
      state.displayAddTaskForm = action.payload;
    },
    toggleDispayAddColumnForm(state: any) {
      state.displayAddColumnForm = !state.displayAddColumnForm;
    },
    toggleDisplayTaskModal(
      state: any,
      action: {
        payload: { cardId: number | undefined; columnId: number | undefined };
      }
    ) {
      const { cardId, columnId } = action.payload;
      state.taskId = cardId;
      state.columnId = columnId;
      state.displayTaskModal = !state.displayTaskModal;
    },
    setBoardTag(state: any, action: { payload: string }) {
      state.boardTag = action.payload;

      localStorage.setItem("boardTag", action.payload);
    },
    addCommentToTaskComments(
      state: any,
      action: {
        payload: {
          user: string;
          boardRef: string;
          columnId: number;
          taskId: number;
          comment: string;
        };
      }
    ) {},
  },
});

export const boardAction = boardSlice.actions;
export default boardSlice.reducer;
