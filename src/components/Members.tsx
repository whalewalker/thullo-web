import React from "react";
import Member from "./Member";

const Members = ({collaborators}: { collaborators: []; }) => {
    const displayedCollaborators = collaborators.slice(0, 3);

    return (
        <div className="flex items-center">

            {displayedCollaborators.map(({imageUrl, id, name}:{imageUrl: string, id: number, name: string}, index) => (
                <Member
                    username={name}
                    userAvatar={imageUrl}
                    index={index}
                    key={id}
                />
            ))}
            {collaborators.length > 3 && (
                <small className="ml-1 text-[#BDBDBD]">
                    + {collaborators.length - 3}{" "}
                    {collaborators.length - 3 === 1 ? "person" : "people"}
                </small>
            )}
        </div>
    );
};

export default Members;