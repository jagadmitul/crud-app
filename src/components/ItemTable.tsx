import React from 'react';

interface ItemTableProps {
    items: any[];
    onEdit: (item: any) => void;
    onDelete: (id: number) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ items, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">First name</th>
                        <th className="py-2 px-4 border-b">Last name</th>
                        <th className="py-2 px-4 border-b">Practitioner Id</th>
                        <th className="py-2 px-4 border-b">Phone number</th>
                        <th className="py-2 px-4 border-b">Payer</th>
                        <th className="py-2 px-4 border-b">Active</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td className="py-2 px-4 border-b">{item.first_name}</td>
                            <td className="py-2 px-4 border-b">{item.last_name}</td>
                            <td className="py-2 px-4 border-b">{item.practitioner_id}</td>
                            <td className="py-2 px-4 border-b">{item.phone_number}</td>
                            <td className="py-2 px-4 border-b">{item.payer}</td>
                            <td className="py-2 px-4 border-b">{item.active}</td>
                            <td className="py-2 px-4 border-b">
                                <button onClick={() => onEdit(item)} className="bg-blue-500 text-white p-2 rounded mr-2">Edit</button>
                                <button onClick={() => onDelete(item.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ItemTable;
