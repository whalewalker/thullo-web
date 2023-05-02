import React, {useState, useRef, useEffect} from "react";
import {RiPencilFill} from "react-icons/ri";
import BtnIcon from "./BtnIcon";
import {updateTaskDetails} from "../actions/taskActions";
import {useAppDispatch} from "../hooks/customHook";

type EditableTextProps = {
    initialText: string;
    boardTag: string;
    boardRef: string;
};

const EditableText: React.FC<EditableTextProps> = ({boardTag, boardRef, initialText}) => {
    const [text, setText] = useState(initialText);
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useAppDispatch();


    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.width = "auto";
            textAreaRef.current.style.maxWidth = "100%";
        }
    }, [text]);

    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (textAreaRef.current && !textAreaRef.current.contains(e.target)) {
                handleCancel();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [textAreaRef]);

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter')
            handleSave()
    }

    const handleSave = () => {
        setEditing(false);
        if (text !== initialText)
            dispatch(updateTaskDetails({boardTag, boardRef, name: text}))
    };

    const handleCancel = () => {
        setText(initialText);
        setEditing(false);
    };

    return (
        <div className="flex items-center mb-2">
            {editing ? (
                <>
                    <textarea
                        className="outline-none border-2 border-color-btn rounded pl-2 py-1  min-w-full break-words"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={textAreaRef}
                    />

                </>
            ) : (
                <>
                    <p className="text-[#000000] font-normal text-base flex mb-2">{text}</p>
                    <BtnIcon onClick={() => setEditing(true)}>
                        <RiPencilFill className="text-current w-2.5 h-2.5 mr-2"/>
                        Edit
                    </BtnIcon>
                </>
            )}
        </div>
    );
};

export default EditableText;
