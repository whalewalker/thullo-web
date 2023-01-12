import React from "react";
import { useParams } from "react-router-dom";

const BoardDetail = () => {
  const params: any = useParams();

  return <div>{params.boardId}</div>;
};

export default BoardDetail;
