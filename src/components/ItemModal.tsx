import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select';
import { Switch } from '@headlessui/react';

interface ItemModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSave: (item: any) => void;
    initialData?: any;
    payerOptions: { value: string, label: string }[];
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onRequestClose, onSave, initialData, payerOptions }) => {
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        practitioner_id: '',
        payer: '',
        active: false
    });

    useEffect(() => {
        if (initialData) {
            const updatedData = {
                id: initialData.id || '',
                first_name: initialData.name?.[0]?.given || '',
                last_name: initialData.name?.[0]?.family || '',
                practitioner_id: initialData.id || '',
                payer: initialData.extension?.[0]?.valueString || '',
                active: initialData.active || false,
            };
            setFormData(updatedData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChange = (selectedOption: any) => {
        setFormData({ ...formData, payer: selectedOption.value });
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData({ ...formData, active: checked });
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
                    {initialData && <input
                        type="text"
                        name="practitioner_id"
                        value={formData.practitioner_id}
                        onChange={handleChange}
                        placeholder="Practitioner Id"
                        className="border p-2 mb-2 w-full rounded"
                    />}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Select
                        options={payerOptions}
                        onChange={handleSelectChange}
                        value={payerOptions.find(option => option.value === formData.payer)}
                        className="w-full mb-2"
                        placeholder="Select Payer"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center mb-2">
                        <span className="mr-2">Active:</span>
                        <Switch
                            checked={formData.active}
                            onChange={handleSwitchChange}
                            className={`${formData.active ? 'bg-blue-600' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className="sr-only">Enable active status</span>
                            <span
                                className={`${formData.active ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform bg-white rounded-full`}
                            />
                        </Switch>
                    </div>
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
