import { createSlice, current } from "@reduxjs/toolkit";
import { Board, dragDropColumn, Task, User } from "../utils/types";

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
    searchedContributorsList: [],
    choosenContributorList: [],
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
    setBoard(state: any, action: { payload: Board | undefined }) {
      state.boardItem = action.payload;
      const storedItem: any = action.payload
        ? JSON.stringify(action.payload)
        : undefined;
      localStorage.setItem("boardItem", storedItem);
    },
    addBoardToBoardList(state: any, action: any) {
      // adding board to board list
      const list = [action.payload, ...state.boardList];
      state.boardList = list;

      localStorage.setItem("boardList", JSON.stringify(list));
      localStorage.setItem("boardItem", JSON.stringify(action.payload));
    },
    addTask(
      state: any,
      action: { payload: { boardId: number; columnId: string; task: Task } }
    ) {
      const { columnId, task } = action.payload;
      const boardItem = state.boardItem;
      console.log("here", current(boardItem));
      const boardColumnIndex = boardItem.taskColumn.findIndex(
        (column: dragDropColumn) => column.name === columnId
      );

      const boardColumn = state.boardItem.taskColumn[boardColumnIndex];

      console.log(current(boardColumn));

      state.boardItem.taskColumn[boardColumnIndex].tasks = [
        ...boardColumn.tasks,
        task,
      ];
      console.log(current(state.boardItem));

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
    toggleDispayAddColumnForm(state: any) {
      state.displayAddColumnForm = !state.displayAddColumnForm;
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
    displaySearchedContributors(state: any, action: { payload: [] }) {
      state.searchedContributorsList = action.payload;
    },
    addSearchedContributor(state: any, action: { payload: User }) {
      const user = action.payload;
      const contributor = state.choosenContributorList.find(
        (contributor: User) => contributor.id === user.id
      );

      if (contributor) {
        return;
      }
      state.choosenContributorList.push(user);
    },
    emptyChoosenContributorList(state: any) {
      state.choosenContributorList = [];
    },
    removeSearchedContributor(state: any, action: { payload: User }) {
      const user = action.payload;

      state.choosenContributorList = state.choosenContributorList.filter(
        (contributor: User) => contributor.id !== user.id
      );
    },
    addContributor(
      state: any,
      action: {
        payload: User[];
      }
    ) {
      const contributors = action.payload;

      const boardIndex = state.boardList.findIndex(
        (board: Board) => board.boardTag === state.boardItem.boardTag
      );

      const columnIndex = state.boardItem.taskColumn.findIndex(
        (column: dragDropColumn) => column.name === state.columnId
      );

      const taskIndex = state.boardItem.taskColumn[columnIndex].tasks.findIndex(
        (task: any) => task.id === state.taskId
      );

      contributors.forEach((contributor) => {
        const contributorsArr =
          state.boardItem.taskColumn[columnIndex].tasks[taskIndex].contributors;

        const contributorItem =
          contributorsArr.length > 0
            ? contributorsArr.find(
                (contributorItem: User) => contributorItem.id === contributor.id
              )
            : undefined;

        if (!contributorItem) {
          const contributorsArr =
            state.boardItem.taskColumn[columnIndex].tasks[taskIndex]
              .contributors;
          console.log(contributorsArr);
          state.boardItem.taskColumn[columnIndex].tasks[
            taskIndex
          ].contributors = [contributor, ...contributorsArr];
        }
      });

      const item = state.boardItem;
      state.boardList[boardIndex] = item;
      const list = state.boardList;
      localStorage.setItem("boardList", JSON.stringify(list));
      localStorage.setItem("boardItem", JSON.stringify(item));
    },
    removeContributor(state: any, action: { payload: User }) {
      const contributor = action.payload;

      const boardIndex = state.boardList.findIndex(
        (board: Board) => board.boardTag === state.boardItem.boardTag
      );

      const columnIndex = state.boardItem.taskColumn.findIndex(
        (column: dragDropColumn) => column.name === state.columnId
      );

      const taskIndex = state.boardItem.taskColumn[columnIndex].tasks.findIndex(
        (task: any) => task.id === state.taskId
      );

      const contributorsArr =
        state.boardItem.taskColumn[columnIndex].tasks[taskIndex].contributors;

      state.boardItem.taskColumn[columnIndex].tasks[taskIndex].contributors =
        contributorsArr.filter(
          (contributorItem: User) => contributorItem.id !== contributor.id
        );

      const item = state.boardItem;
      state.boardList[boardIndex] = item;
      const list = state.boardList;

      localStorage.setItem("boardList", JSON.stringify(list));
      localStorage.setItem("boardItem", JSON.stringify(item));
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
