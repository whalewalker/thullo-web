import { api } from "../api/api";
import { ACCESS_TOKEN } from "../utils/constants";

const checkToken = () => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error("Token is not set"));
  }
};

export const createTask = async ({
  columnId,
  taskName,
  file,
}: {
  columnId: number;
  taskName: string;
  file: any;
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
  file && fd.append("file", file);

  return await api.post(`api/v1/thullo/tasks/${Number(columnId)}`, fd, config);
};

export const moveTask = async ({
  taskId,
  newColumnId,
  position,
}: {
  taskId: number;
  newColumnId: number;
  position: number;
}): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  let data = { taskId, newColumnId, position };
  return await api.put(`api/v1/thullo/tasks/move`, data, config);
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
