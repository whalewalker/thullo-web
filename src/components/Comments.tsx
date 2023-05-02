import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "../utils/types";
import {useAppSelector} from "../hooks/customHook";


const Comments = () => {
  const comments = useAppSelector(state => state.board.comments);
  return (
    <div className="mt-5">
      {comments.map((comment: Comment) => (
        <CommentItem
            key={comment.id}
            name={comment.user.name}
            message={comment.message}
            date={comment.createdAt}
            profileImage={comment.user.imageUrl}
        />
      ))}
    </div>
  );
};

export default Comments;
