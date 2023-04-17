import React from 'react';
import Modal from "./Modal";
import Btn from "./Btn";


type ModalProps = {
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
    title: string;
    message: string;
};
const DeleteWarningModal: React.FC<ModalProps> = ({
                                                      title,
                                                      message,
                                                      onConfirm,
                                                      onCancel,
                                                      isOpen,
                                                  }) => {
    return (
        <Modal isOpen={isOpen}>
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <p className="mb-4 text-color-grey-1 text-sm">{message}</p>

            <div className="flex justify-end mt-6">
                <Btn
                    onClick={onCancel}
                    className="bg-gray-200 px-3 py-1.5 rounded-lg mr-4 text-sm bg-color-white text-color-btn"
                    label="Cancel"
                />

                <Btn
                    onClick={onConfirm}
                    className="bg-blue-600 hover:bg-blue-400 px-3 py-1.5 rounded-lg mr-4 text-sm bg-color-red text-color-white"
                    label="Delete"
                />

            </div>
        </Modal>
    );
};

export default DeleteWarningModal;