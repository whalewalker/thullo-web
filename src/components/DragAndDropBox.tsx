import React from "react";
import { DragDropContext, DropResult, DragStart } from "react-beautiful-dnd";
import DragDropColumn from "./DragDropColumn";
import { useAppSelector, useAppDispatch } from "../hooks/customHook";
import { Board, dragDropColumn } from "../utils/types";
import {
  moveTaskWithinColumn,
  moveTaskBetweenColumn,
} from "../actions/taskActions";

const DragAndDropBox = () => {
  const boardList = useAppSelector((state) => state.board.boardList);

  const boardRef = useAppSelector((state) => state.board.boardTag);

  const [boardItem]: Board[] = boardList.filter(
    (board: Board) => board.boardTag === boardRef
  );

  const dispatchFn = useAppDispatch();

  function onDragEnd({ destination, source }: DropResult) {
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

    // console.log(boardItem.taskColumns);
    // console.log(source);

    // Set start and end variables
    const [start]: any = boardItem.taskColumns.filter(
      (column: any) => String(column.id) === source.droppableId
    );
    const [end]: any = boardItem.taskColumns.filter(
      (column: any) => String(column.id) === destination.droppableId
    );

    // console.log(start, end);

    // If start is the same as end, we're in the same column
    if (start === end) {
      //   // Move the item within the list
      //   // Start by making a new list without the dragged item
      const newTasks = start.tasks.slice();
      const [removedCard] = newTasks.splice(source.index, 1);

      // console.log(removedCard);

      //   // Then insert the item at the right location
      newTasks.splice(destination.index, 0, removedCard);

      //   // Then create a new copy of the column object
      const newCol: any = {
        ...start,
        tasks: newTasks,
      };
      //   // Update the state

      // pass the removed item id, destination index

      dispatchFn(
        moveTaskWithinColumn({
          newColumn: newCol,
          boardId: boardItem.id,
          position: destination.index,
          taskId: removedCard.id,
        })
      );
      return;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const otherTasks = start.tasks.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        ...start,
        tasks: otherTasks,
      };

      // Make a new end list array
      const newEndTasks = [...end.tasks];

      // Insert the item into the end list
      newEndTasks.splice(destination.index, 0, start.tasks[source.index]);

      // Create a new end column
      const newEndCol = {
        ...end,
        tasks: newEndTasks,
      };

      // Update the state

      // pass the removed item id, destination index

      dispatchFn(
        moveTaskBetweenColumn({
          startColumn: newStartCol,
          endColumn: newEndCol,
          boardId: boardItem.id,
          position: destination.index,
          taskId: start.tasks[source.index].id,
        })
      );

      return;
    }
  }

  function onDragStart(start: DragStart) {
    // console.log(start);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {boardItem.taskColumns.map((column: dragDropColumn, _) => (
        <DragDropColumn key={String(column.id)} column={column} />
      ))}
    </DragDropContext>
  );
};

export default DragAndDropBox;
