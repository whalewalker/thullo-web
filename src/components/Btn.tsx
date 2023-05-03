import React from "react";

interface BtnProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className: string;
    label?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    btnType?: "button" | "submit" | "reset";
}

const Btn = ({
                 disabled = false,
                 onClick,
                 className,
                 label,
                 children,
                 btnType = "button", // Set the default value of btnType to "button"
             }: BtnProps) => {
    return (
        <button disabled={disabled} onClick={onClick} className={className} type={btnType}>
            {label}
            {children}
        </button>
    );
};

export default Btn;