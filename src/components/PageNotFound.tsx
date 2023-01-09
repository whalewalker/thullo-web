import React from 'react';
import pageNotFoundBg from "../asset/img/page-not-found-bg.png";

const PageNotFound = () => {
    return (
        <div
            className={`flex justify-center items-center text-center min-h-screen w-full bg-center bg-no-repeat bg-cover`} style={{
                backgroundImage: 'url(' + pageNotFoundBg + ")"
        }}>
            <main>
                <h2 className="text-[10rem] font-light text-[#2F80ED75]">404</h2>
                <h4 className="text-2xl font-bold capitalize">Page not found</h4>
                <p className="text-sm leading-8">Oops! The page you are looking for does not exist. It might have been
                    moved or deleted.</p>
                
                <div className="flex items-center justify-center mt-6 ">
                    <button className="text-color-white uppercase text-sm font-extralight border border-[#0765E3] bg-[#0765E3] rounded-full mr-3 px-10 py-2.5">go back</button>
                    <button className="border uppercase text-sm font-extralight px-10 py-2.5 rounded-full border-[#959595] text-[#959595]">home page</button>
                </div>
            </main>
        </div>
    );
};

export default PageNotFound;