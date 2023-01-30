import {api} from "../api/api";
import {ACCESS_TOKEN} from "../utils/constants";

const checkToken = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject(new Error("Token is not set"));
    }
}

export const getCurrentUser = async () : Promise<any> => {
    await checkToken();
    return await api.get("/api/v1/thullo/users/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
    });
}

export const updateUserDetails = async (data: {}) : Promise<any> => {
    await checkToken();
    return await api.post("/api/v1/thullo/users/edit", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` },
    });
}
