import { api } from "../api/api";
import { ACCESS_TOKEN } from "../utils/constants";

const checkToken = () => {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject(new Error("Token is not set"));
  }
};

export const getCurrentUser = async (): Promise<any> => {
  await checkToken();
  return await api.get("/users/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
  });
};

export const updateUserDetails = async (data: {}): Promise<any> => {
  await checkToken();
  return await api.post("/users/edit", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
  });
};

export const getUserDetail = async (): Promise<any> => {
  await checkToken();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  };

  //   return await api.get();
};
