import {api} from "../api/api";
import {ACCESS_TOKEN, UNSPLASH_ACCESS_KEY} from "../utils/constants";
import {checkToken} from "../utils/helperFn";
import {EditTaskOptions, LabelOptions} from "../utils/types";

export const createTask = async ({
                                     columnId,
                                     boardTag,
                                     taskName,
                                 }: {
    columnId: number;
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
    fd.append("taskColumnId", columnId.toString());

    return await api.post(`/tasks/${boardTag}`, fd, config);
};

export const moveTask = async ({
                                   boardRef,
                                   boardTag,
                                   taskColumnId,
                                   position,
                               }: {
    boardRef: string;
    boardTag: string;
    taskColumnId: number;
    position: number;
}): Promise<any> => {
    await checkToken();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
    };

    let data = {boardRef, taskColumnId, position};
    return await api.put(`/tasks/${boardTag}/move`, data, config);
};

export const createComment = async ({
                                        message,
                                        mentionedUsers,
                                        boardRef,
                                        boardTag
                                    }: {
    boardRef: string;
    boardTag: string;
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

    let data = {message, mentionedUsers};
    return await api.post(`/comments/${boardTag}/${boardRef}`, data, config);
};

export const getUnsplashPictures = async (imageName: string): Promise<any> => {
    const response = await api.get(
        `https://api.unsplash.com/search/photos?page=1&query=${imageName}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    return response.data.results;
};

export const editTask = async ({
                                   boardTag,
                                   boardRef,
                                   name,
                                   file,
                                   description,
                               }: EditTaskOptions): Promise<any> => {
    await checkToken();
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
    };

    const formData = new FormData();
    const optionalFields: [string, any][] = [["file", file], ["name", name], ["description", description]];
    optionalFields.forEach(([fieldName, fieldValue]) => {
        if (fieldValue != null) {
            formData.append(fieldName, fieldValue);
        }
    });

    return await api.put(`/tasks/${boardTag}/${boardRef}`, formData, config);
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

export const createAttachment = async (
    boardTag: string,
    boardRef: string,
    file: any
): Promise<any> => {
    await checkToken();

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
    };

    let formData = new FormData();
    formData.append("file", file);

    return api.post(
        `/tasks/${boardTag}/${boardRef}/add-attachment`,
        formData,
        config
    );
};

export const deleteAttachment = async (
    attachmentId: number,
    boardTag: string,
    boardRef: string
): Promise<any> => {
    await checkToken();

    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
    };
    return api.delete(`/tasks/${boardTag}/${boardRef}/${attachmentId}`, config);
};

export const createLabel = async (
    boardTag: string,
    boardRef: string,
    label: LabelOptions
): Promise<any> => {
    await checkToken();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
    };

    return api.post(
        `/labels/${boardTag}/${boardRef}`,
        {...label},
        config
    );
};
