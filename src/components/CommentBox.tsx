import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import { createComment } from "../actions/taskActions";
import profilePic from "../asset/img/profile-pic.jpg";

const CommentBox = ({
  taskId,
  boardRef,
  columnId,
}: {
  taskId: number;
  boardRef: string;
  columnId: number;
}) => {
  const dispatchFn = useAppDispatch();

  const userDetails = useAppSelector((state) => state.user.currentUserData);

  const [comment, setComment] = useState("");

  const commentTextChangeHandler = (e: { target: { value: string } }) => {
    const text = e.target.value;
    console.log(text);

    setComment(text);
  };

  const postCommentHandler: any = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const users = comment
      .slice()
      .split(" ")
      .filter((word) => word.includes("@"));

    dispatchFn(
      createComment({
        user: userDetails.data.name,
        taskId,
        columnId,
        boardRef,
        message: comment,
        mentionedUsers: users,
      })
    );
  };

  return (
    <div className="w-full flex flew-wrap p-3 shadow-4xl border border-[#E0E0E0] rounded-lg">
      <img src={profilePic} className="w-10 h-10 mr-2 rounded-lg" alt="" />
      <form className="flex flex-col flex-1 p-1" onSubmit={postCommentHandler}>
        <textarea
          className="w-full border-0 outline-0 active:outline-0 focus:outline-0 "
          placeholder={"Write a comment..."}
          rows={4}
          value={comment}
          onChange={commentTextChangeHandler}
        />
        <button
          type="submit"
          className="ml-auto bg-color-btn mt-2 py-1 px-2 text-base border border-color-btn text-color-white  rounded-lg hover:bg-color-white hover:text-color-btn hover:border-color-btn trasition-all duration-300 ease-linear "
        >
          Comment
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
