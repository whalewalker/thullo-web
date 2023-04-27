import React from "react";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import DragDropColumn from "./DragDropColumn";
import {useAppDispatch, useAppSelector} from "../hooks/customHook";
import {TaskColumn} from "../utils/types";
import {moveTaskBetweenColumn, moveTaskWithinColumn,} from "../actions/taskActions";

interface DragAndDropBoxProps {
    editTaskName: string;
    setEditTaskName: React.Dispatch<React.SetStateAction<string>>;
    onUpdateColumnModalId: (columnId: string) => void;
    columnModalId: string;
    closeModal: any;
}

const DragAndDropBox: React.FC<DragAndDropBoxProps> = ({
                                                           editTaskName,
                                                           setEditTaskName,
                                                           onUpdateColumnModalId,
                                                           columnModalId,
                                                           closeModal
                                                       }) => {
    const dispatch = useAppDispatch();
    const boardItem = useAppSelector((state) => state.board.boardItem);

    const onDragEnd = ({ destination, source }: DropResult) => {
        // Make sure we have a valid destination
        if (!destination) {
            return;
        }

        // If the source and destination columns are the same
        // AND if the index is the same, the item isn't moving
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // Find the start and end columns
        const startColumn = boardItem.taskColumn.find(
            (column: TaskColumn) => column.id.toString() === source.droppableId
        );
        const endColumn = boardItem.taskColumn.find(
            (column: TaskColumn) => column.id.toString() === destination.droppableId
        );


        // Make sure we found the start and end columns
        if (!startColumn || !endColumn) {
            console.error('Could not find start or end column');
            return;
        }

        // Get the dragged item from the start column
        const draggedItem = startColumn.tasks[source.index];

        // If start is the same as end, we're in the same column
        if (startColumn === endColumn) {
            // Move the item within the column
            const newTasks = Array.from(startColumn.tasks);
            newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, draggedItem);
            const newColumn = { ...startColumn, tasks: newTasks };

            // Update the state
            dispatch(
                moveTaskWithinColumn({
                    newColumn,
                    boardTag: boardItem.boardTag,
                    boardRef: draggedItem.boardRef,
                    position: destination.index,
                })
            );
        } else {
            // Move the item between columns
            const startTasks = Array.from(startColumn.tasks);
            startTasks.splice(source.index, 1);
            const newStartColumn = { ...startColumn, tasks: startTasks };

            const endTasks = Array.from(endColumn.tasks);
            endTasks.splice(destination.index, 0, draggedItem);
            const newEndColumn = { ...endColumn, tasks: endTasks };

            // Update the state
            dispatch(
                moveTaskBetweenColumn({
                    startColumn: newStartColumn,
                    endColumn: newEndColumn,
                    boardTag: boardItem.boardTag,
                    boardRef: draggedItem.boardRef,
                    position: destination.index,
                })
            );
        }
    }


    const onDragStart = () => {

    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          {boardItem.taskColumn.map((column: TaskColumn, index: any) => (
              <DragDropColumn
                  boardTag={boardItem.boardTag}
                  editTaskName={editTaskName}
                  setEditTaskName={setEditTaskName}
                  onShowModalHandler={onUpdateColumnModalId}
                  showModal={columnModalId}
                  column={column}
                  closeModal={closeModal}
                  key={index}
              />
          ))}
        </DragDropContext>

  );
};

export default DragAndDropBox;
