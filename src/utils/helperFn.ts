import {toast} from "react-toastify";
import {ACCESS_TOKEN} from "./constants";

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
export const isImage = (url: string) => {
    const imageExtensions = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i;
    return imageExtensions.test(url)
};

export const checkToken = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject(new Error("Token is not set"));
    }
};

