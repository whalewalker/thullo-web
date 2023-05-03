import React from "react";
import CommentItem from "./CommentItem";
import {Comment} from "../utils/types";

interface CommentProps {
  comments: Comment[];
}

const Comments = ({comments}: CommentProps) => {

  return (
    <div className="mt-5">
      {comments?.map((comment: Comment) => (
        <CommentItem
            key={comment?.id}
            name={comment?.createdBy?.name}
            message={comment?.message}
            date={comment?.createdAt}
            profileImage={comment?.createdBy?.imageUrl}
        />
      ))}
    </div>
  );
};

export default Comments;
