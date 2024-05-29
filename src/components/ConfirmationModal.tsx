import React from 'react';
import Modal from 'react-modal';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onConfirm,
    onCancel,
    message,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            className="bg-white p-6 rounded shadow-lg w-full max-w-md mx-auto"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
        >
            <h2 className="text-lg font-bold mb-4">Confirmation</h2>
            <p className="mb-6">{message}</p>
            <div className="flex justify-end">
                <button
                    onClick={onCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded mr-2"
                >
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                    Confirm
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;