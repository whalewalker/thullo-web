import {api} from "../api/api";
import {ACCESS_TOKEN, UNSPLASH_ACCESS_KEY} from "../utils/constants";
import {checkToken} from "../utils/helperFn";

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
    `/tasks/${boardTag}`,
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
    `/tasks/${boardTag}/move`,
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

  return await api.put(`/comments/boardRef`, raw, config);
};

export const getUnsplashPictures = async (imageName: string): Promise<any> => {
  const {json} = await api.get(
      `https://api.unsplash.com/search/photos?page=1&query=${imageName}&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  // @ts-ignore
  const data = await json();
  return data.results;
};

export const getTaskCoverImage = async (boardTag: string, boardRef: string): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  const data = await api.get(`/tasks/${boardTag}/${boardRef}/cover-image`, config);
  return data.data.data.imageUrl;
}


export const createAttachment = async (boardTag: string, boardRef: string, file: any): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  let formData = new FormData();
  formData.append("file", file);

  return api.post(`/tasks/${boardTag}/${boardRef}/add-attachment`, formData, config);
}

export const deleteAttachment = async (attachmentId: number, boardTag: string, boardRef: string): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };
  return api.delete(`/tasks/${boardTag}/${boardRef}/${attachmentId}`, config);
}
