import {boardAction} from "../slice/boardSlice";
import {extractMessage, toastError} from "../utils/helperFn";
import {
    createAttachment,
    createTask,
    deleteAttachment,
    moveTask,
    editTask, createComment, createLabel,
} from "../services/taskService";
import {EditTaskOptions, LabelOptions, TaskColumn} from "../utils/types";

export const addTask = ({
                            columnId,
                            boardId,
                            boardTag,
                            taskName,
                        }: {
    columnId: number;
    boardId: number;
    boardTag: string;
    taskName: string;
}) => {
    return async (dispatch: Function) => {
        dispatch(boardAction.setIsLoading(true));

        try {
            // request for create task
            const response: any = await createTask({
                columnId,
                boardTag,
                taskName,
            });
            dispatch(boardAction.setIsLoading(false));
            const task = response.data.data;
            dispatch(boardAction.addTask({boardId, columnId, task}));
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
    newColumn: TaskColumn;
    boardTag: string;
    boardRef: string;
    position: number;
}) => {
    return async (dispatch: Function) => {
        try {
            dispatch(boardAction.moveTaskWithinBoardTaskColumn({newColumn}));
            await moveTask({
                position,
                boardRef,
                boardTag,
                taskColumnId: newColumn.id,
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
    startColumn: TaskColumn;
    endColumn: TaskColumn;
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
                taskColumnId: endColumn.id,
            });
        } catch (err) {
            dispatch(boardAction.setError(true));
            const errorMsg = extractMessage(err);
            toastError(extractMessage(errorMsg));
            dispatch(boardAction.setErrorMsg(errorMsg));
        }
    };
};

export const updateTaskDetails = ({
                                      boardTag,
                                      boardRef,
                                      name,
                                      file,
                                      description
                                  }: EditTaskOptions) => async (dispatch: Function) => {
    try {
        const response = await editTask({
            boardTag,
            boardRef,
            name,
            file,
            description,
        });
        dispatch(boardAction.updateTask(response.data.data))
    } catch (err) {
        dispatch(boardAction.setError(true));
        const errorMsg = extractMessage(err);
        toastError(errorMsg);
        dispatch(boardAction.setErrorMsg(errorMsg));
    }
};


export const addComment = ({
                               boardRef,
                               message,
                               mentionedUsers,
                               columnId,
                               boardTag
                           }: {
    boardRef: string;
    boardTag: string;
    message: string;
    columnId: number;
    mentionedUsers: string[];
}) => {
    return async (dispatch: Function) => {
        dispatch(boardAction.setIsLoading(true));
        try {
            const response = await createComment({
                boardTag,
                boardRef,
                message,
                mentionedUsers
            });
            const comment = response.data.data;
            dispatch(boardAction.setIsLoading(false));
            dispatch(
                boardAction.addCommentToTaskComments({boardRef, columnId, comment})
            );
        } catch (err) {
            dispatch(boardAction.setIsLoading(false));
            dispatch(boardAction.setError(true));
            const errorMsg = extractMessage(err);
            toastError(extractMessage(errorMsg));
            dispatch(boardAction.setErrorMsg(errorMsg));
        }
    };
};

export const addAttachment =
    (boardRef: string, boardTag: string, columnId: number | undefined, file: string) =>
        async (dispatch: Function) => {
            try {
                const response = await createAttachment(boardTag, boardRef, file);
                const attachmentData = response.data.data;
                dispatch(boardAction.addAttachmentToTask({columnId, boardRef, attachmentData}))
                return attachmentData;
            } catch (err) {
                dispatch(boardAction.setError(true));
                const errorMsg = extractMessage(err);
                toastError(extractMessage(errorMsg));
                dispatch(boardAction.setErrorMsg(errorMsg));
                return null; // Return null if there was an error
            }
        };

export const removeAttachment =
    (
        boardRef: string,
        boardTag: string,
        columnId: string | undefined,
        attachmentId: number,
        callback: Function
    ) =>
        async (dispatch: Function) => {
            try {
                await deleteAttachment(Number(attachmentId), boardTag, boardRef);
                let storedBoard = JSON.parse(localStorage.getItem("boardItem") || "{}");
                const column = storedBoard.taskColumn.find(
                    (column: { name: string }) => column.name === columnId
                );
                const task = column.tasks.find(
                    (task: { boardRef: string; attachments: any[] }) =>
                        task.boardRef === boardRef
                );
                task.attachments = task.attachments.filter(
                    (attachment: { id: number }) => attachment.id !== Number(attachmentId)
                );

                const attachments = storedBoard.taskColumn
                    .find((column: { name: string }) => column.name === columnId)
                    .tasks.find(
                        (task: { boardRef: string; attachments: any[] }) =>
                            task.boardRef === boardRef
                    ).attachments;
                callback(attachments);
            } catch (err) {
                dispatch(boardAction.setError(true));
                const errorMsg = extractMessage(err);
                toastError(errorMsg);
                dispatch(boardAction.setErrorMsg(errorMsg));
            }
        };

export const addLabel = ({label, boardTag, boardRef}:
                             {label: LabelOptions, boardTag: string , boardRef: string}) => {
    return async (dispatch: Function) =>{
        try {
            const response = await createLabel(boardTag, boardRef, label);
            const labelData = response.data.data;
            console.log(labelData)
            dispatch(boardAction.addLabelToCard(labelData));
        } catch (err) {
            dispatch(boardAction.setError(true));
            const errorMsg = extractMessage(err);
            toastError(extractMessage(errorMsg));
            dispatch(boardAction.setErrorMsg(errorMsg));
        }
    }
}
