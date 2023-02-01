import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";

interface CardItem {
  img: string | undefined;
  cardTitle: string;
  cardId: string;
  labels: { bgColor: string; textColor: string; text: string }[];
  collabs: string[];
}

const isImage = (url: string) => {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
};

const DragDropCard = ({ card, index }: { card: CardItem; index: number }) => {
  return (
    <Draggable draggableId={card.cardId} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-color-white rounded-lg  p-3 mb-4"
        >
          {card.img && (
            <img
              src={card.img}
              alt={card.cardTitle}
              className="rounded-lg mb-3 h-40 w-full object-cover"
            />
          )}
          <p className="text-[#000] font-normal mb-3">{card.cardTitle}</p>
          {card.labels && (
            <div className="flex items-center mb-4">
              {card.labels.map((label, i) => (
                <p
                  key={i}
                  className={`${label.bgColor} ${label.textColor} text-[10px] w-max px-2 py-1 mr-2 rounded-lg `}
                >
                  {label.text}
                </p>
              ))}
            </div>
          )}

          <div className="flex items-center ">
            {card.collabs &&
              card.collabs.map((userAvatar, i) => {
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
            <div className="w-8 h-8 flex items-center rounded-lg justify-center bg-color-btn ml-2 cursor-pointer">
              <BsPlusLg className="text-color-white " />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};
export default DragDropCard;
