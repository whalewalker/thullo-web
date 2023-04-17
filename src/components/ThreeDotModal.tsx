import React from 'react';

interface ThreeDotModalProps {
    className: string,
    children: any,
    onClick?: () => {},
}

const ThreeDotModal: React.FC<ThreeDotModalProps> = ({className, children, onClick}) => {
    return (
        <div onClick={onClick}
             className={`transition-all duration-900 ease-in-out border border-color-grey-2 rounded-lg px-3 pr-10 bg-color-white ${className}`}>
            {children}
        </div>
    );
};

export default ThreeDotModal;