import React from 'react';

const FormCard: React.FC<any> = (props) => {
    return (
        <section className="flex justify-center items-center py-5 min-h-screen ">
            <div className={`${props.width ? props.width : "w-1/3"} border border-color-border rounded-3xl px-10 py-7 sm:w-full sm:border-0  lg:p-6 md:w-3/5 lg:w-1/2 xl:w-2/5`}>
                {props.children}
            </div>
        </section>
    )
};

export default FormCard;