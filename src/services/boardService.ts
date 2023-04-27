import { api } from "../api/api";
import { ACCESS_TOKEN } from "../utils/constants";
import {checkToken} from "../utils/helperFn";
import {AddBoardData} from "../utils/types";

export const createBoard = async (data: AddBoardData): Promise<any> => {
  await checkToken();

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("file", data.file);
  formData.append("boardVisibility", data.visibility);

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

    return await api.post(`/boards`, formData, config);
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

export const editBoard = async ({
  boardTag,
  name,
  file,
  visibility,
}: AddBoardData): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  let fd = new FormData();
  fd.append("name", name);
  file && fd.append("file", file);
  fd.append("boardVisibility", visibility);

  return await api.put(`boards/${boardTag}`, fd, config);
};

export const deleteBoard = async (boardTag: string): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  return await api.delete(`boards/${boardTag}`, config);
};
