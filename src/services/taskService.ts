import { api } from "../api/api";
import { ACCESS_TOKEN, UNSPLASH_ACCESS_KEY } from "../utils/constants";

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

  return await api.post(`/tasks/${boardTag}`, fd, config);
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
  return await api.put(`/tasks/${boardTag}/move`, JSON.stringify(data), config);
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
  const { json }: any = await api.get(
    `https://api.unsplash.com/search/photos?page=1&query=${imageName}&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  // @ts-ignore
  const data = await json();
  return data.results;
};

export const getTaskCoverImage = async (
  boardTag: string,
  boardRef: string
): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  const data = await api.get(
    `/tasks/${boardTag}/${boardRef}/cover-image`,
    config
  );
  return data.data.data.imageUrl;
};

export const getContributors = async ({
  boardTag,
  boardRef,
}: {
  boardTag: string;
  boardRef: string;
}): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  const data = await api.get(
    `/tasks/${boardTag}/${boardRef}/contributors`,
    config
  );

  return data.data.data;
};

export const searchForUser = async (name: string): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  const data = await api.get(`users/search?params=${name}`, config);

  return data.data.data;
};

export const addContributor = async ({
  boardTag,
  boardRef,
  contributors,
}: {
  boardTag: string;
  boardRef: string;
  contributors: string[];
}): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  console.log(contributors);

  const data = await api.put(
    `/tasks/${boardTag}/${boardRef}/contributors`,
    contributors,
    config
  );

  return data;
};

export const removeContributor = async ({
  boardTag,
  boardRef,
  contributorArr,
}: {
  boardTag: string;
  boardRef: string;
  contributorArr: string[];
}): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  console.log("present");

  const data = await api.put(
    `/tasks/${boardTag}/${boardRef}/remove/contributors`,
    contributorArr,
    config
  );

  return data;
};
