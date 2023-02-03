import {api} from "../api/api";
import {ACCESS_TOKEN} from "../utils/constants";


const checkToken = () => {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject(new Error("Token is not set"));
    }
}

export const createBoard = async (file: any, boardName: string): Promise<any> => {
    await checkToken();
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
    };
    let fd = new FormData();
    fd.append('file', file)

    return await api.post(`/api/v1/thullo/create-board?boardName=${boardName}`,fd, config);
}