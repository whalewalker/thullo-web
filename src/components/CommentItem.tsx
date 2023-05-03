import React from "react";
import Btn from "./Btn";

interface CommentItemProps {
    message: string;
    name: string;
    profileImage: string;
    date: string
}

const CommentItem = ({message, name, profileImage, date}: CommentItemProps) => {
    const regex = /(@\w+|#\w+|https?:\/\/\S+)/g;
    const parts = message.split(regex);

    return (
        <div className="w-full flex flex-col border-b border-color-grey-2 last:border-0 pt-2 pb-1">
            <div className="flex mb-2 items-start">

                {profileImage && <img
                    src={profileImage}
                    alt={name}
                    className="w-[2.3rem] h-[2.3rem] rounded-lg mr-3"
                />}

                {!profileImage && <p className="w-[2.3rem] h-[2.3rem] flex items-center mr-3 justify-center bg-[#BDBDBD] text-color-white rounded-lg text-sm uppercase">{name.slice(0, 2)}</p>}

                <div className="flex-1 flex-col  ">
                    <p className="text-xs font-bold text-[#000000]">{name}</p>
                    <p className="text-[#BDBDBD] text-[10px] font-medium">{date}</p>
                </div>
                <div className="flex items-center text-xs text-color-grey-3">
                    Edit
                    <Btn label="" btnType="button" className="border-0 outline-0"/>
                    <small className="mx-1">-</small>
                    <Btn label="Delete" btnType="button" className="border-0 outline-0"/>
                </div>
            </div>
            <div className="text-[#000000] text-sm font-normal py-2">
                {parts.map((part, index) =>
                    regex.test(part) ? (part.startsWith("http") ? (
                            <a target="_blank" key={index} href={part} className="text-[#2F80ED]"
                               rel="noreferrer">{part}</a>) :
                        (<span key={index} className="text-[#2F80ED]">{part}</span>)) : part)}
            </div>
        </div>
    );
};


export default CommentItem;
