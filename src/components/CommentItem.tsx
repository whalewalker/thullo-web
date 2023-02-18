import React from "react";
import profileImage from "../asset/img/profile-pic.jpg";


const CommentItem = ({message, name}: { message: string; name: string }) => {
    const regex = /(@\w+|#\w+)/g;
    const parts = message.split(regex);

    return (
        <div className="w-full flex flex-col border-b border-color-grey-2 last:border-0 pt-2 pb-1">
            <div className="flex mb-2 items-start">
                <img
                    src={profileImage}
                    alt={name}
                    className="w-10 h-10 rounded-lg mr-3"
                />
                <div className="flex-1 flex-col  ">
                    <p className="text-xs font-bold text-[#000000]">{name}</p>
                    <p className="text-[#BDBDBD] text-[10px] font-medium">
                        24 August at 20:43
                    </p>
                </div>
                <div className="flex items-center text-xs text-color-grey-3">
                    <button type="button" className="border-0 outline-0">
                        Edit
                    </button>
                    <small className="mx-1">-</small>
                    <button type="button" className="border-0 outline-0">
                        Delete
                    </button>
                </div>
            </div>
            <div className="text-[#000000] text-sm font-normal py-2">
                {parts.map((part, index) =>
                    regex.test(part) ?
                        <span key={index} className="text-[#2F80ED]">{part}</span> :
                        part
                )}
            </div>
        </div>
    );
};

export default CommentItem;
