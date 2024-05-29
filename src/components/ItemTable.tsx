import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { AiOutlineClose } from 'react-icons/ai';

interface ItemModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSave: (item: any) => void;
    initialData?: any;
    payerOptions: { value: string; label: string }[];
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onRequestClose, onSave, initialData, payerOptions }) => {
    const [formData, setFormData] = useState(initialData || { name: '', description: '' });

    useEffect(() => {
        setFormData(initialData || { name: '', description: '' });
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, gender: e.target.value });
    };

    const handlePayerChange = (selected: any) => {
        setFormData({ ...formData, payer: selected });
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
                        value={formData.first_name || ''}
                        onChange={handleChange}
                        placeholder="First name"
                        className="border p-2 mb-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name || ''}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="border p-2 mb-2 w-full rounded"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="practitioner_id"
                        value={formData.practitioner_id || ''}
                        onChange={handleChange}
                        placeholder="Practitioner Id"
                        className="border p-2 mb-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number || ''}
                        onChange={handleChange}
                        placeholder="Phone number"
                        className="border p-2 mb-2 w-full rounded"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border p-2 mb-2 w-full rounded"
                    />
                    <Select
                        options={payerOptions}
                        value={formData.payer}
                        onChange={handlePayerChange}
                        className="mb-2"
                        placeholder="Select Payer"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <label className="mr-2">Gender:</label>
                        <label className="mr-2">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={handleGenderChange}
                                className="mr-1"
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={handleGenderChange}
                                className="mr-1"
                            />
                            Female
                        </label>
                    </div>
                    <input
                        type="date"
                        name="birth_date"
                        value={formData.birth_date || ''}
                        onChange={handleChange}
                        className="border p-2 mb-2 w-full rounded"
                    />
                </div>
                <div className="flex items-center mb-4">
                    <label className="mr-2">Active:</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            name="active"
                            checked={formData.active || false}
                            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        />
                        <span className="slider round"></span>
                    </label>
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
