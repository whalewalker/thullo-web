import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AddBoardData, Board, Task, TaskColumn} from "../utils/types";

const storedBoardTag: any = localStorage.getItem("boardTag");
const storedBoardName: any = localStorage.getItem("boardName");


const defaultBoardItem: any = {}
const defaultBoardList: any = []

const boardSlice = createSlice({
        name: "board",
        initialState: {
            displayMenuModal: false,
            displayAddColumnForm: false,
            displayTaskModal: false,
            boardTag: storedBoardTag || "",
            boardName: storedBoardName || "",
            taskId: null,
            columnName: "",
            columnId: undefined,
            boardItem: defaultBoardItem,
            isLoading: false,
            successMsg: "",
            errorMsg: "",
            error: false,
            comments: [],
            boardList: defaultBoardList,
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
            },
            setColumnId(state: any, action: { payload: number | undefined }) {
                state.columnId = action.payload;
            },
            setColumnName(state: any, action: { payload: string | undefined }) {
                state.columnName = action.payload;
            },
            setBoard(state: any, action: { payload: Board }) {
                state.boardItem = action.payload;
            },
            addBoardToBoardList(state: any, action: any) {
                state.boardList = [action.payload, ...state.boardList];
            },
            addTaskColumn(state: any, action: { payload: { taskColumn: TaskColumn } }) {
                const {taskColumn} = action.payload;

                let updatedTaskColumns = [...state.boardItem.taskColumn];

                if (taskColumn.name.toLowerCase() === "no status") {
                    updatedTaskColumns = updatedTaskColumns.filter((column) => column.name.toLowerCase() !== "no status");
                    updatedTaskColumns.unshift(taskColumn);
                } else {
                    updatedTaskColumns.push(taskColumn);
                }

                state.boardItem = {
                    ...state.boardItem,
                    taskColumn: updatedTaskColumns,
                };
            },


            editTaskColumn(state: any, action: { payload: { taskColumn: TaskColumn, taskColumnId: number | undefined } }) {
                const {taskColumn, taskColumnId} = action.payload;

                const updatedTaskColumn = state.boardItem.taskColumn.map((column: TaskColumn) => {
                    if (column.id === taskColumnId)
                        return {...column, ...taskColumn};
                    return column;
                });

                state.boardItem = {
                    ...state.boardItem,
                    taskColumn: updatedTaskColumn,
                };
            },

            deleteTaskColumn(state: any, action: { payload: { taskColumnId: number | undefined } }) {
                const {taskColumnId} = action.payload;

                const updatedTaskColumn = state.boardItem.taskColumn.filter((column: TaskColumn) => {
                    return column.id !== taskColumnId;
                });

                state.boardItem = {
                    ...state.boardItem,
                    taskColumn: updatedTaskColumn,
                };
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
            },
            moveTaskWithinBoardTaskColumn(
                state: any,
                action: { payload: { newColumn: TaskColumn } }
            ) {
                const {newColumn} = action.payload;
                const newBoard: Board = state.boardItem;
                const columnIndex: number = newBoard.taskColumn.findIndex(
                    (column) => column.name === newColumn.name
                );
                state.boardItem.taskColumn[columnIndex] = newColumn;
            },
            moveTaskBetweenBoardTaskColumns(
                state: any,
                action: {
                    payload: { startColumn: TaskColumn; endColumn: TaskColumn };
                }
            ) {
                const {startColumn, endColumn} = action.payload;
                const newBoard: Board = state.boardItem;

                const startColumnIndex: number = newBoard.taskColumn.findIndex(
                    (column) => column.name === startColumn.name
                );

                const endColumnIndex = newBoard.taskColumn.findIndex(
                    (column) => column.name === endColumn.name
                );
                state.boardItem.taskColumn[startColumnIndex] = startColumn;
                state.boardItem.taskColumn[endColumnIndex] = endColumn;
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
            updateTask(state: any, action: { payload: Task }) {
                const {payload: newTask} = action;
                const board = {...state.boardItem};

                const columnIndex = board.taskColumn.findIndex((column: TaskColumn) => column.id === state.columnId);
                const taskIndex = board.taskColumn[columnIndex].tasks.findIndex((task: Task) => task.id === state.taskId);

                board.taskColumn[columnIndex].tasks[taskIndex] = {...newTask};

                state.boardItem = {
                    ...state.boardItem,
                    boardItem: board
                }
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
                }
            },
            deleteBoardItem: (state, action) => {
                const boardTag = action.payload;
                state.boardList = state.boardList.filter((boardItem: Board) => boardItem.boardTag !== boardTag);
            },

            addAttachmentToTask(state, action: {payload: {columnId: number | undefined, boardRef: string, attachmentData: any}}) {
                const {columnId, boardRef, attachmentData} = action.payload;
                const boardItem = state.boardItem;
                const targetColumn = boardItem.taskColumn.find((column: TaskColumn) => column.id === columnId);
                const targetTask = targetColumn.tasks.find((task: Task) => task.boardRef === boardRef);
                targetTask.attachments.push(attachmentData);

                state.boardItem = {
                    ...state.boardItem,
                    boardItem: boardItem
                }
            },


            addCommentToTaskComments(
                state: any,
                action: {
                    payload: {
                        comment: Comment;
                        boardRef: string;
                        columnId: number;
                    };
                }
            ) {
                const {comment, boardRef, columnId} = action.payload;

                const boardItem = state.boardItem;
                const targetColumn = boardItem.taskColumn.find((column: TaskColumn) => column.id === columnId);
                const targetTask = targetColumn.tasks.find((task: Task) => task.boardRef === boardRef);
                targetTask.comments.push(comment);

                state.boardItem = {
                    ...state.boardItem,
                    boardItem: boardItem
                }
            },
        },
    })
;

export const boardAction = boardSlice.actions;
export default boardSlice.reducer;
