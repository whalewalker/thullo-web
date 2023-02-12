import { api } from "../api/api";
import { ACCESS_TOKEN } from "../utils/constants";

const checkToken = () => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error("Token is not set"));
  }
};

export const createBoard = async (
  file: any,
  boardName: string
): Promise<any> => {
  await checkToken();
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };
  let fd = new FormData();
  fd.append("boardName", boardName);
  fd.append("file", file);

  return await api.post(`/api/v1/thullo/boards`, fd, config);
};

export const getAllBoards = async (): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  return await api.get(`/api/v1/thullo/boards`, config);
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

  let raw =
    '{\n    "taskId": taskId,\n    "newColumnId": newColumnId,\n    "position": position\n}';

  return await api.put(`/api/v1/thullo/tasks/move`, raw, config);
};
