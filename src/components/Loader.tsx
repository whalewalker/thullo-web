import React from 'react';
import ReactLoading from "react-loading";

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <ReactLoading type="bubbles" color="#2F80ED" width={70} height={70}/>
        </div>
    );
};

export default Loader;