import React from 'react';

interface Item {
    id: number;
    name: { given: string[]; family: string }[];
    telecom: { system: string; value: string }[];
    extension: { url: string; valueString: string }[];
    gender: string;
    birthDate: string;
    active: boolean;
}

interface ItemTableProps {
    items: Item[];
    onEdit: (item: Item) => void;
    onDelete: (item: Item) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Practitioner Id</th>
                        <th className="py-2 px-4 border-b text-left">First name</th>
                        <th className="py-2 px-4 border-b text-left">Last name</th>
                        <th className="py-2 px-4 border-b text-left">Payer</th>
                        <th className="py-2 px-4 border-b text-left">Phone number</th>
                        <th className="py-2 px-4 border-b text-left">Active</th>
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td className="py-2 px-4 border-b text-left">{item.id}</td>
                            <td className="py-2 px-4 border-b text-left">{item.name[0]?.given}</td>
                            <td className="py-2 px-4 border-b text-left">{item.name[0]?.family}</td>
                            <td className="py-2 px-4 border-b text-left">{item.extension[0]?.valueString || ''}</td>
                            <td className="py-2 px-4 border-b text-left">{item.telecom.find(t => t.system === 'phone')?.value || ''}</td>
                            <td className="py-2 px-4 border-b text-left">{item.active ? 'Yes' : 'No'}</td>
                            <td className="py-2 px-4 border-b text-left">
                                <button onClick={() => onEdit(item)} className="bg-blue-500 text-white p-2 rounded mr-2">Edit</button>
                                <button onClick={() => onDelete(item)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemTable;
