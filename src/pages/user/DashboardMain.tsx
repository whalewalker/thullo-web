import React, { useState, useEffect } from "react";
import BoardItem from "../../components/BoardItem";
import AddBoardModal from "../../components/AddBoardModal";
import { useAppSelector, useAppDispatch } from "../../hooks/customHook";
import { getBoards } from "../../actions/boardAction";
import { Board } from "../../utils/types";

const DashboardMain = () => {
  const [displayAddBoardModal, setDisplayAddBoardModal] = useState(false);

  const dispatchFn = useAppDispatch();

  // getting the board list data
  const boardList: Board[] = useAppSelector((state) => state.board.boardList);

  const toggleAddBoardModalHandler: React.MouseEventHandler = () => {
    setDisplayAddBoardModal((prevState) => !prevState);
  };

  useEffect(() => {
    dispatchFn(getBoards());
  }, [dispatchFn]);

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
        {boardList.length > 0 && (
          <div className="grid grid-cols-18 gap-6 mt-10 justify-between">
            {boardList.map((board, i) => (
              <BoardItem
                key={i}
                img={board.imageUrl}
                boardName={board.name}
                collaborators={board.collaborators}
              />
            ))}
          </div>
        )}
      </div>
      {displayAddBoardModal && (
        <AddBoardModal closeModal={toggleAddBoardModalHandler} />
      )}
    </section>
  );
};

export default DashboardMain;
