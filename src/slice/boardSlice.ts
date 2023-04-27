import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddBoardData, Board, TaskColumn, Task} from "../utils/types";
import boardItem from "../components/BoardItem";

const storedBoardList: any = localStorage.getItem("boardList");
const storedList = JSON.parse(storedBoardList);
const storedBoardTag: any = localStorage.getItem("boardTag");
const storedBoardName: any = localStorage.getItem("boardName");
const storedBoard: any = localStorage.getItem("boardItem");
const storedBoardItem = JSON.parse(storedBoard);

const boardSlice = createSlice({
    name: "board",
    initialState: {
        displayMenuModal: false,
        displayAddColumnForm: false,
        displayTaskModal: false,
        boardTag: storedBoardTag || "",
        boardName: storedBoardName || "",
        taskId: undefined,
        columnName: "",
        columnId: undefined,
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
        setColumnId(state: any, action: { payload: number | undefined }) {
            state.columnId = action.payload;
        },
        setColumnName(state: any, action: { payload: string | undefined }) {
            state.columnName = action.payload;
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
        addTaskColumn(state: any, action: { payload: {taskColumn: TaskColumn} }) {
            const { taskColumn } = action.payload;

            let updatedTaskColumns = [...state.boardItem.taskColumn];

            if (taskColumn.name.toLowerCase() === "no status") {
                // remove any existing "no status" column
                updatedTaskColumns = updatedTaskColumns.filter((column) => column.name.toLowerCase() !== "no status");
                // add the new "no status" column at the beginning
                updatedTaskColumns.unshift(taskColumn);
            } else {
                updatedTaskColumns.push(taskColumn);
            }

            const updatedBoardItem = {
                ...state.boardItem,
                taskColumn: updatedTaskColumns,
            };

            state.boardItem = updatedBoardItem;
            localStorage.setItem('boardItem', JSON.stringify(updatedBoardItem));
        },


        editTaskColumn(state: any, action: { payload: {taskColumn: TaskColumn, taskColumnId: number | undefined} }) {
            const { taskColumn, taskColumnId } = action.payload;

            const updatedTaskColumn = state.boardItem.taskColumn.map((column: TaskColumn) => {
                if (column.id === taskColumnId)
                    return {...column, ...taskColumn};
                return column;
            });

            const updatedBoardItem = {
                ...state.boardItem,
                taskColumn: updatedTaskColumn,
            };
            state.boardItem = updatedBoardItem;
            localStorage.setItem('boardItem', JSON.stringify(updatedBoardItem));
        },

        deleteTaskColumn(state: any, action: { payload: {taskColumnId: number | undefined} }) {
            const { taskColumnId } = action.payload;

            const updatedTaskColumn = state.boardItem.taskColumn.filter((column: TaskColumn) => {
                return column.id !== taskColumnId;
            });

            const updatedBoardItem = {
                ...state.boardItem,
                taskColumn: updatedTaskColumn,
            };

            state.boardItem = updatedBoardItem;
            localStorage.setItem('boardItem', JSON.stringify(updatedBoardItem));
        },

        addTask(
            state: any,
            action: { payload: { boardId: number; columnId: number; task: Task } }
        ) {
            const {columnId, task} = action.payload;
            const boardItem = state.boardItem;
            const boardColumnIndex = boardItem.taskColumn.findIndex(
                (column: TaskColumn) => column.id === columnId
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
            action: { payload: { newColumn: TaskColumn } }
        ) {
            const {newColumn} = action.payload;
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
                payload: { startColumn: TaskColumn; endColumn: TaskColumn };
            }
        ) {
            const {startColumn, endColumn} = action.payload;
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
        toggleDisplayAddColumnForm(state: any, action: { payload: boolean }) {
            state.displayAddColumnForm = action.payload;
        },

        setDisplayMenuModal(state: any, action: { payload: boolean }) {
            state.displayMenuModal = action.payload
        },

        toggleDisplayTaskModal(
            state: any,
            action: {
                payload: { cardId: number | undefined; columnId: number | undefined };
            }
        ) {
            const {cardId, columnId} = action.payload;
            state.displayTaskModal = !state.displayTaskModal;
            state.taskId = cardId;
            state.columnId = columnId;
        },
        addImageToTaskCard(state: any, action: { payload: string | undefined }) {
            // find the task
            const board: Board = state.boardItem;

            const columnIndex: number = board.taskColumn.findIndex(
                (column: TaskColumn) => column.id === state.columnId
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
        setBoardName(state: any, action: { payload: string }) {
            state.boardName = action.payload;
            localStorage.setItem("boardName", action.payload);
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
                (column: TaskColumn) => column.id === state.columnId
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
        editBoardItem: (state, action: PayloadAction<AddBoardData>) => {
            const {boardTag, name, imageUrl, visibility} = action.payload;

            const boardIndex = state.boardList.findIndex(
                (board: Board) => board.boardTag === boardTag
            );

            if (boardIndex !== -1) {
                state.boardList[boardIndex] = {
                    ...state.boardList[boardIndex],
                    name,
                    imageUrl,
                    visibility,
                };
                localStorage.setItem("boardList", JSON.stringify(state.boardList));
            }
        },
        deleteBoardItem: (state, action) => {
            const boardTag = action.payload;
            state.boardList = state.boardList.filter((boardItem: Board) => boardItem.boardTag !== boardTag);
            localStorage.setItem("boardList", JSON.stringify(state.boardList));
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
        ) {
        },
    },
});

export const boardAction = boardSlice.actions;
export default boardSlice.reducer;
