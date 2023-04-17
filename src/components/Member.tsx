import {isImage} from "../utils/helperFn";
import React from "react";

const Avatar = ({src, alt}: { src: any, alt: string }) => (
    <div className="relative rounded-full w-8 h-8 mr-1 sm:w-9 sm:h-9">
        <img src={src} alt={alt} className="w-full h-full rounded-full"/>
    </div>
);

const Initial = ({username}: { username: string }) => (
    <div
        className="w-full h-full flex items-center justify-center bg-[#BDBDBD] text-color-white rounded-lg text-[12px]">
        {username}
    </div>
);

const Member = ({userAvatar, username,  index}: { userAvatar: any; username: string, index: number }) => {
    const isImageAvatar = isImage(userAvatar);
    return (
        <div
            className={`relative rounded-full w-8 h-8 mr-1 sm:w-9 sm:h-9 ${
                index === 0 ? "z-20" : index === 1 ? "z-10" : "z-0"
            }`}
        >
            {isImageAvatar ? (
                <Avatar src={userAvatar} alt="collab-img"/>
            ) : (
                <Initial username={username.slice(0, 2).toUpperCase()}/>
            )}
        </div>
    );
};

export default Member;