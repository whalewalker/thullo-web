import React from "react";
import Member from "./Member";
import {User} from "../utils/types";

const Members = ({collaborators}: { collaborators: User[]; }) => {
    const displayedCollaborators = collaborators?.slice(0, 3);

    return (
        <div className="flex items-center">

            {displayedCollaborators?.map((collaborator:User, index) => (
                <Member
                    username={collaborator?.name}
                    userAvatar={collaborator?.imageUrl}
                    index={index}
                    key={collaborator?.id}
                />
            ))}
            {collaborators?.length > 3 && (
                <small className="ml-1 text-[#BDBDBD]">
                    + {collaborators?.length - 3}{" "}
                    {collaborators?.length - 3 === 1 ? "person" : "people"}
                </small>
            )}
        </div>
    );
};

export default Members;