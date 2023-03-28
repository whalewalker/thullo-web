import {api} from "../api/api";

export const downloadFile = async (fileUrl: string | null): Promise<any> => {
    return api.get(`${fileUrl}?asAttachment=true`);
}