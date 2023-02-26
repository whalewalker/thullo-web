import React from "react";
import CommentItem from "./CommentItem";
import { Comment } from "../utils/types";

const commentLists = [
  {
    name: "Ejim Favour",
    message: "Hey @Jane, have you seen the new #React tutorial yet?",
  },
  { name: "Ezima Daniel", message: "@ejim please forward the tasks" },
  {
    name: "Abdulahi Joseph",
    message:
      "@ejim and @dan, weldone for your awesome work. Looking forward to progressing.. https://google.com",
  },
];

const CommentList = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="mt-5">
      {commentLists.map((comment: any, i) => (
        <CommentItem key={i} name={comment.name} message={comment.message} />
      ))}
    </div>
  );
};

export default CommentList;
