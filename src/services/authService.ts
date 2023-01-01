import {api} from "../api/api";

export const loginHandler = async (data : {}) : Promise<any> => {
    return  await api.post("/api/v1/thullo/auth/login", data);
}

export const registerHandler = async (data : {}) : Promise<any> => {
    return  await api.post("/api/v1/thullo/auth/register", data);
}

export const verifyUserHandler = async (token: string) : Promise<any> => {
    return await api.get("/api/v1/thullo/auth/verify-token?token=" + token);
}