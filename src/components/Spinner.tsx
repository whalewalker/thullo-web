import React from 'react';
import ReactLoading from "react-loading";

const Spinner = () => {
    return (
            <div className="flex justify-center items-center min-h-[50%]">
                <ReactLoading type={"bubbles"} color="#2F80ED" width={80} height={80} />
            </div>
    );
};

export default Spinner;