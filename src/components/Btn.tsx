import React from "react";

interface BtnProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className: string;
    label?: string;
    children?: React.ReactNode;
    btnType?: "button" | "submit" | "reset";
}

const Btn = ({
                 onClick,
                 className,
                 label,
                 children,
                 btnType = "button", // Set the default value of btnType to "button"
             }: BtnProps) => {
    return (
        <button onClick={onClick} className={className} type={btnType}>
            {label}
            {children}
        </button>
    );
};

export default Btn;