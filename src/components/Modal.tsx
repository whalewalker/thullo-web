import React from "react";


interface ModalProps {
    isOpen: boolean,
    children: any,
}


const Modal = ({
                   isOpen,
                   children,
               }: ModalProps) => {

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-[#2F80ED] text-color-white p-4 rounded-lg shadow-lg w-1/4 max-h-screen overflow-y-auto">
                        {children}
                    </div>
                </div>
            )}
        </>
    );

};

Modal.defaultProps ={
    disabled: false
}

export default Modal;