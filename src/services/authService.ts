import {api} from "../api/api";

export const loginHandler = async (data : {}) : Promise<any> => {
    return  await api.post("/auth/login", data);
}

export const registerHandler = async (data : {}) : Promise<any> => {
    return  await api.post("/auth/register", data);
}

export const verifyUserHandler = async (token: string) : Promise<any> => {
    return await api.get("/auth/verify-token?token=" + token);
}

export const forgetPasswordHandler = async (email: string) : Promise<any> => {
    return await api.post("/auth/password/reset-token?email=" + email, {})
}

export const resetPasswordHandler = async (data: {}) : Promise<any> => {
    return await api.post("/auth/password/reset", data);
}