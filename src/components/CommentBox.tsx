import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/customHook";
import {addComment} from "../actions/taskActions";
import profilePic from "../asset/img/profile-pic.jpg";
import Btn from "./Btn";

interface CommentBoxProps {
    boardTag: string;
    boardRef: string;
    columnId: number;
}

const CommentBox = ({
                        boardTag,
                        boardRef,
                        columnId,
                    }: CommentBoxProps) => {
    const dispatchFn = useAppDispatch();
    const [comment, setComment] = useState("");

    const convertText = () => {
        return comment.replace(/(\n|^)([@#][^\s]+)/g, '\n$2');
    };


    const commentTextChangeHandler = (e: { target: { value: string } }) => {
        const text = e.target.value;
        setComment(text);
    };

    const postCommentHandler: any = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const users = comment
            .slice()
            .split(" ")
            .filter((word) => word.includes("@"));

        dispatchFn(
            addComment({
                columnId,
                boardTag,
                boardRef,
                message: comment,
                mentionedUsers: users,
            })
        );

        setComment("");
    };

    return (
        <div className="w-full flex flew-wrap p-3 shadow-4xl border border-[#E0E0E0] rounded">
            <img src={profilePic} className="w-[2.3rem] h-[2.3rem] mr-3 rounded-lg" alt=""/>
            <form className="flex flex-col flex-1 p-1" onSubmit={postCommentHandler}>
        <textarea
            className="w-full border-0 outline-0 active:outline-0 focus:outline-0 text-sm"
            placeholder={"Write a comment..."}
            rows={3}
            value={convertText()}
            onChange={commentTextChangeHandler}
        />
                <Btn
                    btnType="submit"
                    className="ml-auto bg-color-btn mt-2 px-2 py-1 rounded text-sm border border-color-btn text-color-white  hover:bg-color-white hover:text-color-btn hover:border-color-btn trasition-all duration-300 ease-linear "
                >Comment</Btn>
            </form>
        </div>
    );
};

export default CommentBox;
