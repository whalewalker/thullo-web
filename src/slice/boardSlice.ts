import { createSlice, current } from "@reduxjs/toolkit";
import { Board, dragDropColumn, Task } from "../utils/types";

const storedBoardList: any = localStorage.getItem("boardList");
const storedList = JSON.parse(storedBoardList);

const boardSlice = createSlice({
  name: "board",
  initialState: {
    displayAddTaskForm: false,
    columnId: "",
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
    setColumnId(state: any, action: any) {
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
      action: { payload: { boardId: string; columnId: string; task: Task } }
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

    // moveTaskWithinBoardTaskColumn(
    //   state: any,
    //   action: { payload: { boardName: string; newColumn: dragDropColumn } }
    // ) {
    //   const { boardName, newColumn } = action.payload;

    //   // process
    //   // find the index of existing board
    //   const boardIndex: number = state.boardList.findIndex(
    //     (board: Board) => board.data.name === boardName
    //   );
    //   // find  board
    //   const newBoard: Board = state.boardList[boardIndex];

    //   // find index of column
    //   const columnIndex = newBoard.data.taskColumns.findIndex(
    //     (column) => column.id === newColumn.id
    //   );
    //   // change the column on new board
    //   newBoard.data.taskColumns[columnIndex] = newColumn;

    //   // using the index of the board, put the new board in the board list array
    //   state.boardList[boardIndex] = newBoard;

    //   // const [boardItem]: Board[] = state.boardList.filter(
    //   //   (board: Board) => board.data.name === boardName
    //   // );

    //   // const previousColumnIndex = boardItem.data.taskColumns.findIndex(
    //   //   (column) => column.id === newColumn.id
    //   // );

    //   // boardItem.data.taskColumns[previousColumnIndex] = newColumn;
    // },
    // moveTaskBetweenBoardTaskColumns(
    //   state: any,
    //   action: {
    //     payload: {
    //       boardName: string;
    //       startColumn: dragDropColumn;
    //       endColumn: dragDropColumn;
    //     };
    //   }
    // ) {
    //   const { boardName, startColumn, endColumn } = action.payload;

    //   // process
    //   // find the index of existing board
    //   const boardIndex: number = state.boardList.findIndex(
    //     (board: Board) => board.data.name === boardName
    //   );
    //   // find  board
    //   const newBoard: Board = state.boardList[boardIndex];

    //   // find index of columns
    //   const startColumnIndex = newBoard.data.taskColumns.findIndex(
    //     (column) => column.id === startColumn.id
    //   );

    //   const endColumnIndex = newBoard.data.taskColumns.findIndex(
    //     (column) => column.id === endColumn.id
    //   );

    //   // change the columns on new board
    //   newBoard.data.taskColumns[startColumnIndex] = startColumn;

    //   newBoard.data.taskColumns[endColumnIndex] = endColumn;

    //   // using the index of the board, put the new board in the board list array
    //   state.boardList[boardIndex] = newBoard;
    // },

    // addTaskToBoardTaskColumn(state: any, action: any) {
    //   // process
    //   // find board index
    //   // find board
    //   // find column
    //   // add task to column task array
    // },
    toggleDispayAddTaskForm(state: any, action: { payload: boolean }) {
      state.displayAddTaskForm = action.payload;
    },
  },
});

export const boardAction = boardSlice.actions;
export default boardSlice.reducer;
