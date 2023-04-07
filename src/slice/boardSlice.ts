import { createSlice } from "@reduxjs/toolkit";
import { Board, dragDropColumn, Task } from "../utils/types";

const storedBoardList: any = localStorage.getItem("boardList");
const storedList = JSON.parse(storedBoardList);
const storedBoardTag: any = localStorage.getItem("boardTag");
const storedBoard: any = localStorage.getItem("boardItem");
const storedBoardItem = JSON.parse(storedBoard);

const boardSlice = createSlice({
  name: "board",
  initialState: {
    displayAddColumnForm: false,
    displayTaskModal: false,
    boardTag: storedBoardTag || "",
    taskId: undefined,
    columnId: null,
    boardItem: storedBoardItem || undefined,
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
    setColumnId(state: any, action: { payload: string | undefined }) {
      state.columnId = action.payload;
    },
    setBoard(state: any, action: { payload: Board }) {
      state.boardItem = action.payload;
      localStorage.setItem("boardItem", JSON.stringify(action.payload));
    },
    addBoardToBoardList(state: any, action: any) {
      // adding board to board list
      const list = [action.payload, ...state.boardList];
      state.boardList = list;

      localStorage.setItem("boardList", JSON.stringify(list));
    },
    addTask(
      state: any,
      action: { payload: { boardId: number; columnId: string; task: Task } }
    ) {
      const { columnId, task } = action.payload;
      const boardItem = state.boardItem;
      const boardColumnIndex = boardItem.taskColumn.findIndex(
        (column: dragDropColumn) => column.name === columnId
      );

      const boardColumn = state.boardItem.taskColumn[boardColumnIndex];

      state.boardItem.taskColumn[boardColumnIndex].tasks = [
        ...boardColumn.tasks,
        task,
      ];

      const item = state.boardItem;
      localStorage.setItem("boardItem", JSON.stringify(item));
    },
    moveTaskWithinBoardTaskColumn(
      state: any,
      action: { payload: { newColumn: dragDropColumn } }
    ) {
      const { newColumn } = action.payload;
      // process

      // get  board
      const newBoard: Board = state.boardItem;

      // find index of column
      const columnIndex: number = newBoard.taskColumn.findIndex(
        (column) => column.name === newColumn.name
      );

      // change the column on new board
      state.boardItem.taskColumn[columnIndex] = newColumn;
      const item = state.boardItem;
      localStorage.setItem("boardItem", JSON.stringify(item));
    },
    moveTaskBetweenBoardTaskColumns(
      state: any,
      action: {
        payload: { startColumn: dragDropColumn; endColumn: dragDropColumn };
      }
    ) {
      const { startColumn, endColumn } = action.payload;
      // process

      // Get board
      const newBoard: Board = state.boardItem;

      // find index of columns
      const startColumnIndex: number = newBoard.taskColumn.findIndex(
        (column) => column.name === startColumn.name
      );

      const endColumnIndex = newBoard.taskColumn.findIndex(
        (column) => column.name === endColumn.name
      );

      // change the columns on new board
      state.boardItem.taskColumn[startColumnIndex] = startColumn;

      state.boardItem.taskColumn[endColumnIndex] = endColumn;

      const item = state.boardItem;
      localStorage.setItem("boardItem", JSON.stringify(item));
    },
    toggleDispayAddColumnForm(state: any, action: { payload: boolean }) {
      state.displayAddColumnForm = action.payload;
    },

    toggleDisplayTaskModal(
      state: any,
      action: {
        payload: { cardId: number | undefined; columnId: string | undefined };
      }
    ) {
      const { cardId, columnId } = action.payload;
      state.displayTaskModal = !state.displayTaskModal;
      state.taskId = cardId;
      state.columnId = columnId;
    },
    addImageToTaskCard(state: any, action: { payload: string | undefined }) {
      // find the task
      const board: Board = state.boardItem;

      const columnIndex: number = board.taskColumn.findIndex(
        (column: dragDropColumn) => column.name === state.columnId
      );

      const taskIndex: number = board.taskColumn[columnIndex].tasks.findIndex(
        (task: Task) => task.id === state.taskId
      );
      // change the imageUrl
      state.boardItem.taskColumn[columnIndex].tasks[taskIndex].imageUrl =
        action.payload;

      const item = state.boardItem;

      localStorage.setItem("boardItem", JSON.stringify(item));
    },
    setBoardTag(state: any, action: { payload: string }) {
      state.boardTag = action.payload;

      localStorage.setItem("boardTag", action.payload);
    },
    addLabelToCard(
      state: any,
      action: {
        payload: {
          name: string;
          backgroundCode: string;
          colorCode: string;
        };
      }
    ) {
      const board: Board = state.boardItem;

      const columnIndex: number = board.taskColumn.findIndex(
        (column: dragDropColumn) => column.name === state.columnId
      );

      const taskIndex: number = board.taskColumn[columnIndex].tasks.findIndex(
        (task: Task) => task.id === state.taskId
      );

      const label =
        state.boardItem.taskColumn[columnIndex].tasks[taskIndex].labels;

      state.boardItem.taskColumn[columnIndex].tasks[taskIndex].labels = [
        ...label,
        action.payload,
      ];

      const item = state.boardItem;

      localStorage.setItem("boardItem", JSON.stringify(item));
    },
    updateBoardImage(
      state: any,
      action: { payload: { boardTag: string; imageUrl: string | undefined } }
    ) {
      const { boardTag, imageUrl } = action.payload;

      const boardIndex = state.boardList.findIndex(
        (board: Board) => board.boardTag === boardTag
      );

      state.boardList[boardIndex].imageUrl = imageUrl;
    },
    editBoardName(
      state: any,
      action: { payload: { boardTag: string; name: string } }
    ) {
      const { boardTag, name } = action.payload;

      const boardIndex = state.boardList.findIndex(
        (board: Board) => board.boardTag === boardTag
      );

      state.boardList[boardIndex].name = name;
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
