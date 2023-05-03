import {api} from "../api/api";
import {ACCESS_TOKEN} from "../utils/constants";
import {checkToken} from "../utils/helperFn";
import {TaskColumnOptions} from "../utils/types";


export const createTaskColumn = async ({name, boardTag}: TaskColumnOptions): Promise<any> => {
    await checkToken();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
    };
    return await api.post(`/task-columns/${boardTag}`, {name}, config);
};

export const updateTaskColumn = async ({name, taskColumnId, boardTag}: TaskColumnOptions): Promise<any> => {
    await checkToken();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
    };
    return await api.put(`/task-columns/${boardTag}`, {name, taskColumnId}, config);
};

export const deleteTaskColumn = async ({taskColumnId, boardTag}: TaskColumnOptions): Promise<any> => {
    await checkToken();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        data: {
            taskColumnId: taskColumnId
        }
    };
    return await api.delete(`/task-columns/${boardTag}`, config);
};

export const getTaskColumn = async ({ name, boardTag }: TaskColumnOptions): Promise<any> => {
    await checkToken();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        params: {
            name,
        },
    };

    return await api.get(`/task-columns/${boardTag}`, config);
};
