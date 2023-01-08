import React from 'react';
// import pageNotFoundPageImg from "../asset/img/pageNotFound.png"

const PageNotFound= () => {
    return (
        <div className="flex justify-center items-center text-center min-h-screen w-full bg-center bg-no-repeat bg-cover bg-[url('../..src/asset/img/pageNotFound.png')]" >
            <main>
                <h2 className="text-[10rem] font-light text-[#2F80ED75]">404</h2>
                <h4 className="text-2xl font-bold">Page not found</h4>
                <p className="text-sm leading-8">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p></main>
        </div>
    );
};

export default PageNotFound;