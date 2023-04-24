import React, { useState, useEffect } from "react";
import BoardItem from "../../components/BoardItem";
import AddBoardModal from "../../components/AddBoardModal";
import { useAppSelector, useAppDispatch } from "../../hooks/customHook";
import { getBoards } from "../../actions/boardAction";
import { Board } from "../../utils/types";

const DashboardMain = () => {
  const [displayAddBoardModal, setDisplayAddBoardModal] = useState<boolean>(false);
  const [displayUpdateBoardModal, setDisplayUpdateBoardModal] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  const boardList: Board[] = useAppSelector((state) => state.board.boardList);

  const toggleAddBoardModalHandler: React.MouseEventHandler = () => {
    setDisplayAddBoardModal((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const hideUpdateBoardModalHandler: any = (e: {
    target: { dataset: { close: string } };
  }) => {
    if (e.target.dataset.close) {
      setDisplayUpdateBoardModal(null);
    }
  };

  return (
    <section
      className="min-h-[calc(100vh-5rem)] bg-[#F8F9FD] pt-14"
      onClick={hideUpdateBoardModalHandler}
      data-close="true"
    >
      <div className="w-[83%] xl:w-[85%]  mx-auto lg:w-[90%]">
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
          <div
            className="grid grid-cols-18 gap-6 mt-10 pb-10 justify-between xl:grid-cols-[repeat(3,_minmax(15rem,_23rem))] lg:grid-cols-[repeat(3,_minmax(15rem,_17rem))] md:grid-cols-[repeat(2,_20rem)] smd:grid-cols-[repeat(2,_16.5rem)] sm:grid-cols-1"
            data-close="true"
          >
            {boardList.map((board: Board, i) => (
              <BoardItem
                key={board.id}
                boardId={board.id}
                img={board.imageUrl}
                boardTag={board.boardTag}
                boardName={board.name}
                boardVisibility={board.boardVisibility}
                collaborators={board.collaborators}
                boardRef={board.boardTag}
                displayUpdateBoardModal={displayUpdateBoardModal}
                setDisplayUpdateBoardModal={setDisplayUpdateBoardModal}
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
