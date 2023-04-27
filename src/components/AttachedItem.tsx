import React, {useRef} from "react";
import {extractMessage, isImage, toastError, toastSuccess} from "../utils/helperFn";
import {useAppDispatch} from "../hooks/customHook";
import {removeAttachment} from "../actions/taskActions";
import axios from "axios";


interface DownloadButtonProps {
    name: string;
    id: number | null | undefined
    onClick: (arg: any) => void;
}

interface AttachmentItemProps {
    boardRef: string,
    boardTag: string,
    columnId: string | undefined
    attachment: { fileName: string; fileUrl: string; createdAt: string, id: number };
    setAttachments: Function
}

const AttachmentButton: React.FC<DownloadButtonProps> = ({onClick, name, id}) => {
    return (
        <button
            data-attachment_id={id}
            type="button"
            className="text-color-grey-3 border border-color-border font-medium text-[10px] hover:text-color-grey-4 hover:border-color-grey-4 rounded-lg transition-all duration-300 ease-linear mr-3 py-1 px-2"
            onClick={onClick}
        >
            {name}
        </button>
    );
};

const AttachedItem = ({attachment, columnId, boardRef, boardTag, setAttachments}: AttachmentItemProps) => {
        const dispatchFn = useAppDispatch();
        const imgRef = useRef<HTMLImageElement>(null);
        const formatDate = (dateString: string | number | Date) => {
            let date;
            if (dateString) date = new Date(dateString);
            else date = new Date();

            const options = {month: "long", day: "numeric", year: "numeric"};
            return date.toLocaleDateString("en-US", options);
        }
        const truncateFileName = (fileName: string, maxLength: number): string => {
            if (fileName.length <= maxLength) {
                return fileName;
            }

            const extensionIndex = fileName.lastIndexOf(".");
            const extension = extensionIndex !== -1 ? fileName.slice(extensionIndex) : "";

            const middle = Math.floor(maxLength / 2);
            const firstPart = fileName.slice(0, middle);
            const lastPart = fileName.slice(-maxLength + middle + extension.length);

            return `${firstPart}...${lastPart}${extension}`;
        }

        if (!attachment || (Array.isArray(attachment) && attachment.length === 0)
            || (typeof attachment === 'object' && Object.keys(attachment).length === 0)) {
            return null;
        }


        const handleDownload = () => {
            const img = imgRef.current;
            if (img) {
                const fileUrl = img.getAttribute('src');
                // @ts-ignore
                const fileName: string = img.getAttribute("alt") ? img.getAttribute("alt") : 'file';
                axios.get(`${fileUrl}?asAttachment=true`, {responseType: 'blob'})
                    .then(res => {
                        const url = window.URL.createObjectURL(new Blob([res.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', fileName);
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => toastError(extractMessage(err)));
            }
        }

        const handleDelete = async (e: any) => {
            const attachmentId = e.target.dataset.attachment_id;

            dispatchFn(removeAttachment(boardRef, boardTag, columnId, attachmentId, setAttachments));
            toastSuccess("Attachment removed successfully");
        }


        return (
            <div className="flex mb-2">
                {isImage(attachment.fileUrl) ? (
                    <img
                        src={attachment.fileUrl}
                        alt={attachment.fileName}
                        className="w-[4.5rem] h-[4.5rem] rounded-lg object-cover"
                        ref={imgRef}

                    />
                ) : (
                    <p className="w-[4.5rem] h-[4.5rem] flex items-center justify-center bg-[#BDBDBD] mr-1 text-color-white rounded-lg text-xl">
                        {attachment.fileName.slice(0, 2).toUpperCase()}
                    </p>

                )}
                <div className="ml-2">
                    <p className="text-[#bdbdbd] text-xs font-medium">
                        Added {formatDate(attachment.createdAt)}
                    </p>
                    <p className="font-medium text-[#000000] text-sm">{truncateFileName(attachment.fileName, 30)}</p>
                    <div className="flex mt-1.5">
                        <AttachmentButton id={attachment.id ? attachment.id : null} onClick={handleDownload}
                                          name="Download"/>
                        <AttachmentButton id={attachment.id ? attachment.id : null} onClick={handleDelete} name="Delete"/>
                    </div>
                </div>
            </div>
        );
    }
;

export default AttachedItem;
