import { api } from "../api/api";
import { ACCESS_TOKEN } from "../utils/constants";
import { checkToken } from "../utils/helperFn";

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

  return await api.post(`/boards`, fd, config);
};

export const getBoard = async (boardTag: string): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  return await api.get(`/boards/${boardTag}`, config);
};

export const getAllBoards = async (): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  return await api.get(`/boards`, config);
};

export const updateBoardImage = async ({
  boardTag,
  file,
}: {
  boardTag: string;
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
  fd.append("file", file);

  return await api.put(`boards/${boardTag}`, fd, config);
};
