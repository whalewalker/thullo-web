import React, {useState} from "react";
import { DragDropContext, DropResult, DragStart } from "react-beautiful-dnd";
import DragDropColumn from "./DragDropColumn";
import { useAppSelector, useAppDispatch } from "../hooks/customHook";
import { dragDropColumn } from "../utils/types";
import {
  moveTaskWithinColumn,
  moveTaskBetweenColumn,
} from "../actions/taskActions";

const DragAndDropBox = () => {
  const boardItem = useAppSelector((state) => state.board.boardItem);

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

    // Set start and end variables
    const [start]: any = boardItem.taskColumn.filter(
      (column: any) => String(column.name) === source.droppableId
    );
    const [end]: any = boardItem.taskColumn.filter(
      (column: any) => String(column.name) === destination.droppableId
    );

    // (start, end);

    // If start is the same as end, we're in the same column
    if (start === end) {
      //   // Move the item within the list
      //   // Start by making a new list without the dragged item
      const newTasks = start.tasks.slice();
      const [removedCard] = newTasks.splice(source.index, 1);

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
          boardTag: boardItem.boardTag,
          boardRef: removedCard.boardRef,
          position: destination.index,
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
          boardTag: boardItem.boardTag,
          position: destination.index,
          boardRef: start.tasks[source.index].boardRef,
        })
      );

      return;
    }
  }

  const [columnModalId, setColumnModalId] = useState<any>(null);
  const onUpdateColumnModalId = (id: any) => setColumnModalId(id);


  return (
        <DragDropContext onDragEnd={onDragEnd} >
          {boardItem.taskColumn.map((column: dragDropColumn, _: any) => (
              <DragDropColumn onShowModalHandler={onUpdateColumnModalId} showModal={columnModalId} key={String(column.name)} column={column} />
          ))}
        </DragDropContext>

  );
};

export default DragAndDropBox;
