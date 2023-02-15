import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
import { Task } from "../utils/types";
import { boardAction } from "../slice/boardSlice";
import { useAppDispatch } from "../hooks/customHook";

const DragDropCard = ({
  card,
  index,
  columnId,
}: {
  card: Task;
  index: number;
  columnId: number;
}) => {
  const dispatchFn = useAppDispatch();

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const displayTaskModal = () => {
    dispatchFn(
      boardAction.toggleDisplayTaskModal({
        cardId: card.id,
        columnId: columnId,
      })
    );
  };

  return (
    <Draggable draggableId={String(card.id)} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-color-white rounded-lg  p-3 mb-4 shadow-3xl"
          onClick={displayTaskModal}
        >
          {card.imageUrl && (
            <img
              src={card.imageUrl}
              alt={card.name}
              className="rounded-lg mb-3 h-40 w-full object-cover"
            />
          )}
          <small className="text-sm text-color-grey-3">{card.boardRef}</small>
          <p className="text-[#000] font-normal mb-3">{card.name}</p>
          {card.labels && (
            <div className="flex items-center mb-4 w-full flex-wrap">
              {card.labels.map((label, i) => (
                <p
                  key={i}
                  className={`${
                    "bg-" + [label.backgroundCode]
                  } bg-[#D5E6FB] text-[#2F80ED] text-[${
                    label.colorCode
                  }] text-[10px] w-max px-2 py-1 mr-2 rounded-lg `}
                >
                  {label.name}
                </p>
              ))}
            </div>
          )}

          <div className="flex items-center ">
            {card.contributors &&
              card.contributors.map((userAvatar: any, i) => {
                return isImage(userAvatar) ? (
                  <img
                    src={userAvatar}
                    alt="collab-img"
                    key={i}
                    className={`w-8 h-8 mr-1 sm:w-9 sm:h-9 relative rounded-full ${
                      i === 0 ? "z-20" : i === 1 ? "z-10" : "z-0"
                    }`}
                  />
                ) : (
                  <p
                    key={i}
                    className="w-8 h-8 flex items-center justify-center bg-[#BDBDBD] mr-1 text-color-white rounded-lg text-xs"
                  >
                    {userAvatar.slice(0, 2).toUpperCase()}
                  </p>
                );
              })}
            <div
              className={`w-8 h-8 mt-5 flex items-center rounded-lg justify-center ${
                card.contributors.length > 0 ? "ml-2" : "ml-0"
              } bg-color-btn  cursor-pointer`}
            >
              <BsPlusLg className="text-color-white " />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
export default DragDropCard;
