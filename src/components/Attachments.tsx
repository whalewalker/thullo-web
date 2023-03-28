import React, {useState} from "react";
import {MdDescription} from "react-icons/md";
import {AiOutlinePlus} from "react-icons/ai";
import {toastError} from "../utils/helperFn";
import AttachedItem from "./AttachedItem";
import {useAppDispatch, useAppSelector} from "../hooks/customHook";
import {addAttachment} from "../actions/taskActions";
import {dragDropColumn, Task} from "../utils/types";


interface AttachmentsProps {
    boardTag: string;
    boardRef: string;
}

const Attachments = ({boardTag, boardRef}: AttachmentsProps) => {

        const boardItem = useAppSelector((state) => state.board.boardItem);
        const columnId = useAppSelector((state) => state.board.columnId);
        const cardId = useAppSelector((state) => state.board.taskId);

        let columnItem = boardItem.taskColumn.filter(
            (column: dragDropColumn) => column.name === columnId
        )[0];

        let [cardItem] = columnItem.tasks.filter(
            (task: Task) => task.id === cardId
        );

        const [attachments, setAttachments] = useState([...cardItem.attachments]);
        const [displayMoreAttachments, setDisplayMoreAttachments] = useState<boolean>(false);
        const dispatchFn = useAppDispatch();

        const fileUploadHandler = async (e: { target: { files: any } }) => {
            const file = e.target.files[0];
            if (file.size / 1024 / 1024 > 1) {
                toastError("File size cannot exceed 1MB");
                return;
            }

            const attachmentExists = (name: string) => {
                return attachments.some((attachment: { fileName: string; }) => attachment.fileName === name);
            };

            if (attachmentExists(file.name)) {
                toastError("File already exists");
                return;
            }

            const newAttachment = await dispatchFn(addAttachment(boardRef, boardTag, columnId, file));
            if (newAttachment) {
                setAttachments((prevState: { fileName: string; createdAt: string; fileUrl: string }[]): any => {
                    return [...prevState, newAttachment];
                });
            }
        }

        const toggleDisplayMoreAttachmentsHandler = () => {
            setDisplayMoreAttachments((prevState) => !prevState);
        };

        const sliceNumber = displayMoreAttachments ? attachments.length : 3;

        let updateFileValue = (e: any) => {
            e.target.value = null;
        };

        return (
            <div className="mt-3 w-full mb-5">
                <div className="flex items-center">
                    <p className="flex text-[#bdbdbd] items-center">
                        <MdDescription className="text-current w-2.5 h-2.5"/>
                        <span className=" text-xs font-semibold ml-1">Attachments</span>
                    </p>
                    <input
                        type="file"
                        id="add-file"
                        className="hidden"
                        onChange={fileUploadHandler}
                        onClick={updateFileValue}
                    />
                    <label
                        htmlFor="add-file"
                        className="cursor-pointer ml-3 border px-2.5 py-1 rounded-lg  text-xs flex items-center text-color-grey-3 border-color-border hover:text-color-grey-4 hover:border-color-grey-4"
                    >
                        <AiOutlinePlus className="text-current w-2.5 h-2.5 mr-2"/>
                        Add
                    </label>
                </div>
                <div
                    className={`mt-3  transition-all duration-300 ease-out ${
                        displayMoreAttachments ? "h-[15rem] overflow-auto scroll" : "overflow-hidden"
                    } `}
                >
                    {attachments
                        .slice(0, sliceNumber)
                        .map(({
                                  fileName,
                                  fileUrl,
                                  createdAt,
                                  id
                              }: { fileName: string, fileUrl: string, createdAt: string, id: number }) => (
                            <AttachedItem key={createdAt} attachment={{fileName, fileUrl, createdAt, id}}
                                          boardRef={boardRef} boardTag={boardTag} columnId={columnId}
                                          setAttachments={setAttachments}/>
                        ))
                    }

                </div>
                {attachments.length > 3 && (
                    <p
                        className="text-sm text-color-grey-3 cursor-pointer mt-1"
                        onClick={toggleDisplayMoreAttachmentsHandler}
                    >
                        {displayMoreAttachments ? "Show less" : "Show more"}
                    </p>
                )}
            </div>
        );
    }
;

export default Attachments;
