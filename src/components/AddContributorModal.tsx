import React, { useState, useEffect } from "react";
import { getTaskContributors, searchUser } from "../actions/taskActions";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import SearchedUser from "./SearchedUser";
import { User } from "../utils/types";
import { RxCross2 } from "react-icons/rx";
import { boardAction } from "../slice/boardSlice";
import { addContributorToTask } from "../actions/taskActions";

const AddContributorModal = ({
  boardTag,
  boardRef,
  addMemberModalDisplay,
  setMemberModalDisplay,
}: {
  boardTag: string;
  boardRef: string;
  addMemberModalDisplay: boolean;
  setMemberModalDisplay: Function;
}) => {
  const [searchMemberName, setSearchMemberName] = useState("");

  const choosenContributors = useAppSelector(
    (state) => state.board.choosenContributorList
  );

  const dispatchFn = useAppDispatch();

  const userEmail: string = useAppSelector(
    (state) => state.user.currentUserData
  ).data.email;

  const searchedList = useAppSelector(
    (state) => state.board.searchedContributorsList
  ).filter((user: any) => user.email !== userEmail);

  useEffect(() => {
    let timeOut: any;
    timeOut = setTimeout(() => {
      dispatchFn(searchUser(searchMemberName));
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchMemberName, dispatchFn]);

  const searchMemberHandler = (e: { target: { value: string } }) => {
    setSearchMemberName(e.target.value);
  };

  const onSubmitMemberNameHandler = async (e: { preventDefault: Function }) => {
    e.preventDefault();

    await dispatchFn(
      addContributorToTask({ boardTag, boardRef, choosenContributors })
    );
    // dispatchFn(getTaskContributors({ boardTag, boardRef }));
    dispatchFn(boardAction.emptyChoosenContributorList());
  };

  return (
    <div
      className={`w-[15.5rem] h-max transition-all duration-800 ease-linear bg-color-white absolute top-[20rem] -right-[4rem] rounded-lg p-2 z-20  shadow-4xl cursor-default ${
        addMemberModalDisplay
          ? "opacity-100 visible"
          : "delay-300 opacity-0 invisible"
      }`}
      onMouseEnter={() => {
        setMemberModalDisplay(true);
      }}
      onMouseLeave={() => {
        setMemberModalDisplay(false);
      }}
    >
      <p className="text-xs font-semibold text-color-grey-4">Members</p>
      <p className="text-xs font-normal text-color-grey-3 leading-6">
        Assign members to this card
      </p>
      <form
        className={`w-full flex flex-col`}
        onSubmit={onSubmitMemberNameHandler}
      >
        <div className={`w-full flex  shadow-5xl rounded-lg mt-2.5 p-1 `}>
          <input
            type="text"
            placeholder="user..."
            className="px-2 py-1 border-0 outline-0 w-full !text-[12px]"
            value={searchMemberName}
            onChange={searchMemberHandler}
          />
        </div>

        {searchedList && searchedList.length > 0 && (
          <div className="mt-4 max-h-[7rem] overflow-y-auto scroll">
            {searchedList.map((user: any, i: number) => {
              return <SearchedUser user={user} key={i} />;
            })}
          </div>
        )}
        {choosenContributors && choosenContributors.length > 0 && (
          <div className="w-full   flex  py-1.5 mt-3 overflow-x-scroll no-scroll">
            {[...choosenContributors].reverse().map((contributor: User, i: number) => (
              <p
                key={i}
                className=" text-sm whitespace-nowrap flex justify-between items-center p-1 bg-color-grey-1 text-color-black rounded mr-2 "
              >
                {contributor.name}
                <RxCross2
                  className="w-4 h-4 text-color-black ml-2 cursor-pointer "
                  onClick={() => {
                    dispatchFn(
                      boardAction.removeSearchedContributor(contributor)
                    );
                  }}
                />
              </p>
            ))}
          </div>
        )}
        {choosenContributors && choosenContributors.length > 0 && (
          <button
            type="submit"
            className=" self-center py-1.5 px-4 text-xs mt-2 bg-color-btn text-center font-medium text-color-white rounded-lg"
          >
            invite
          </button>
        )}
      </form>
    </div>
  );
};

export default AddContributorModal;
