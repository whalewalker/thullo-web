import { api } from "../api/api";
import { ACCESS_TOKEN } from "../utils/constants";

const checkToken = () => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error("Token is not set"));
  }
};

export const createTask = async ({
  columnId,
  boardTag,
  taskName,
}: {
  columnId: string;
  boardTag: string;
  taskName: string;
}): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  let fd = new FormData();
  fd.append("name", taskName);
  fd.append("status", columnId);

  return await api.post(
    `https://thullo-backend-production.up.railway.app/api/v1/thullo/tasks/${boardTag}`,
    fd,
    config
  );
};

export const moveTask = async ({
  boardRef,
  boardTag,
  status,
  position,
}: {
  boardRef: string;
  boardTag: string;
  status: string;
  position: number;
}): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  let data = { boardRef, status, position };
  return await api.put(
    `api/v1/thullo/tasks/${boardTag}/move`,
    JSON.stringify(data),
    config
  );
};

export const createCommentReq = async ({
  boardRef,
  message,
  mentionedUsers,
  taskId,
}: {
  boardRef: string;
  taskId: number;
  message: string;
  mentionedUsers: string[];
}): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  let data = {
    message,
    taskId,
    mentionedUsers,
  };

  const raw = JSON.stringify(data);

  return await api.put(`api/v1/thullo/comments/boardRef`, raw, config);
};
