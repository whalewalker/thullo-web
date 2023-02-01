import { createSlice } from "@reduxjs/toolkit";
import dragAndDropData from "../utils/dragAndDropData";

const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState: {
    newColumnModal: false,
    columnId: "",
    data: dragAndDropData,
  },
  reducers: {
    moveCardWithinColumn(state: any, action: any) {
      const newCol = action.payload;
      state.data = { ...state.data, [newCol.columnId]: newCol };
    },
    moveCardBetweenColumns(state: any, action: any) {
      const { newStartCol, newEndCol } = action.payload;
      console.log(action.payload);
      state.data = {
        ...state.data,
        [newStartCol.columnId]: newStartCol,
        [newEndCol.columnId]: newEndCol,
      };
    },
    changeColumnId(state: any, action: { payload: string }) {
      state.columnId = action.payload;
    },
    addCardToColumn(state: any, action: any) {
      const { img, cardName } = action.payload;

      const column: any = state.data[state.columnId];

      console.log(column);

      const newCards = [...column.cards];
      newCards.push({
        img: img,
        cardTitle: cardName,
        cardId: `${cardName}-${Math.floor(Math.random() * 1000)}`,
        labels: undefined,
        collabs: undefined,
      });

      const newCol = { ...column, cards: newCards };

      state.data = { ...state.data, [column.columnId]: newCol };
    },
    toggleNewColumnModal(state: any, action: { payload: boolean }) {
      state.newColumnModal = action.payload;
    },
    addNewColumn(state: any, action: { payload: string }) {
      const newColumnName = action.payload;
      state.data = {
        ...state.data,
        [newColumnName]: {
          columnTitle: newColumnName,
          columnId: newColumnName,
          cards: [],
        },
      };
    },
   
  },
});

export const dragAndDropAction = dragAndDropSlice.actions;

export default dragAndDropSlice.reducer;
