import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "../utils/types";

const commentLists = [
  {
    name: "Ejim Favour",
    message: "@dan I have added the required tasks in the other boards",
  },
  { name: "Ezima Daniel", message: "@ejim please forward the tasks" },
  {
    name: "Abdulahi Joseph",
    message:
      "@ejim and @dan, weldone for your awesome work. Looking forward to progressing...",
  },
];

const CommentList = ({ comments }: { comments: Comment[] }) => {
  console.log(comments);

  return (
    <div className="mt-5">
      {commentLists.map((comment: any, i) => (
        <CommentItem key={i} name={comment.name} message={comment.message} />
      ))}
    </div>
  );
};

export default CommentList;
