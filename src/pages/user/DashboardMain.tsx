import React, { useState } from "react";
import boardImg from "../../asset/img/test-board-img.jpg";
import collabs from "../../asset/img/profile-pic - Copy.png";
import BoardItem from "../../components/BoardItem";
import AddBoardModal from "../../components/AddBoardModal";

interface Board {
  img: string;
  boardName: string;
  collaborators: string[];
  privateState: Boolean;
}

const boardsArray: Board[] = [
  {
    img: boardImg,
    boardName: "Devchallenges Board",
    collaborators: [collabs, collabs, collabs],
    privateState: false,
  },
  {
    img: boardImg,
    boardName: "Simple Project Board",
    collaborators: [collabs, collabs, collabs, collabs, collabs],
    privateState: true,
  },
  {
    img: boardImg,
    boardName: "Kanban Template",
    collaborators: [collabs, collabs],
    privateState: true,
  },
  {
    img: boardImg,
    boardName: "Habit Building Board",
    collaborators: [collabs, collabs, collabs, collabs],
    privateState: false,
  },
];

const DashboardMain = () => {
  const [displayAddBoardModal, setDisplayAddBoardModal] = useState(false);
  const [boardsList, setBoardsList] = useState(boardsArray);

  const toggleAddBoardModalHandler = () => {
    setDisplayAddBoardModal((prevState) => !prevState);
  };

  const addBoardHandler = (board: Board) => {
    setBoardsList((prevState) => [board, ...prevState]);
  };

  return (
    <section className="min-h-screen bg-[#F8F9FD] pt-14">
      <div className="w-[80%] mx-auto md:w-[90%]">
        <div className="flex items-center justify-between w-full">
          <p className="text-lg font-medium">All boards</p>
          <button
            className="bg-color-btn text-color-white px-3.5 py-2 rounded-lg text-base"
            onClick={toggleAddBoardModalHandler}
          >
            + Add
          </button>
        </div>
        <div className="grid grid-cols-16 gap-7 mt-10">
          {boardsList.map((board, i) => (
            <BoardItem
              key={i}
              img={board.img}
              boardName={board.boardName}
              collaborators={board.collaborators}
            />
          ))}
        </div>
      </div>
      {displayAddBoardModal && (
        <AddBoardModal
          closeModal={toggleAddBoardModalHandler}
          boardArray={boardsArray}
          addBoard={addBoardHandler}
        />
      )}
    </section>
  );
};

export default DashboardMain;
