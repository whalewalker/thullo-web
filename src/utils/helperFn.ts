import { toast } from "react-toastify";
import { UNSPLASH_ACCESS_KEY } from "./constants";

export const extractMessage = (error: any) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

export const fileHandler = (e: any) => {
  if (e.target.files && e.target.files[0])
    return URL.createObjectURL(e.target.files[0]);
};

export const toastError = (msg: string) => {
  toast.error(msg, {
    hideProgressBar: true,
    autoClose: 2000,
  });
};

export const toastSuccess = (msg: string) => {
  toast.success(msg, {
    hideProgressBar: true,
    autoClose: 2000,
  });
};

export const getUnsplashPictures = async (imageName: string): Promise<any> => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${imageName}&client_id=${UNSPLASH_ACCESS_KEY}`
  );
  console.log(res);

  const data = await res.json();

  const result = data.results;

  return result;
};
