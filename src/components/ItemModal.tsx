import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';

interface ItemModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSave: (item: any) => void;
    initialData?: any;
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onRequestClose, onSave, initialData }) => {
    const [formData, setFormData] = useState(initialData || { name: '', description: '' });

    useEffect(() => {
        setFormData(initialData || { name: '', description: '' });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl">{initialData ? 'Update Item' : 'Add Item'}</h2>
                    <button onClick={onRequestClose} className="text-red-500"><AiOutlineClose size={24} /></button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder="First name"
                        className="border p-2 mb-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="border p-2 mb-2 w-full rounded"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="practitioner_id"
                        value={formData.practitioner_id}
                        onChange={handleChange}
                        placeholder="Practitioner Id"
                        className="border p-2 mb-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="border p-2 mb-2 w-full rounded"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="payer"
                        value={formData.payer}
                        onChange={handleChange}
                        placeholder="Payer"
                        className="border p-2 mb-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="active"
                        value={formData.active}
                        onChange={handleChange}
                        placeholder="Active"
                        className="border p-2 mb-2 w-full rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mr-2">Save</button>
                    <button onClick={onRequestClose} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

export default ItemModal;
