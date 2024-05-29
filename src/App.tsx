import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchItems, addItem, updateItem, deleteItem } from './services/api';
import ItemModal from './components/ItemModal';
import ItemTable from './components/ItemTable';
import { TailSpin } from 'react-loader-spinner';
import './App.css';

const App: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [payerOptions, setPayerOptions] = useState<any[]>([]);
  const [selectedPayers, setSelectedPayers] = useState<any[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [selectedPayers, items]);

  const loadItems = async () => {
    setLoading(true);
    const data = await fetchItems();
    setItems(data);
    setPayerOptions([...new Set(data.map((item: any) => item.extension[0]?.valueString))].map((payer: string) => ({ value: payer, label: payer })));
    setLoading(false);
  };

  const filterItems = () => {
    if (selectedPayers.length > 0) {
      const selectedPayerValues = selectedPayers.map(payer => payer.value);
      setFilteredItems(items.filter(item => selectedPayerValues.includes(item.extension[0]?.valueString)));
    } else {
      setFilteredItems(items);
    }
  };

  const handleAdd = () => {
    setCurrentItem(null);
    setModalIsOpen(true);
  };

  const handleEdit = (item: any) => {
    setCurrentItem(item);
    setModalIsOpen(true);
  };

  const handleSave = async (item: any) => {
    setLoading(true);
    if (currentItem) {
      await updateItem(currentItem.id, item);
    } else {
      await addItem(item);
    }
    setModalIsOpen(false);
    loadItems();
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    await deleteItem(id);
    loadItems();
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl mb-4">FHIR Integrated App</h1>
        <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded">Add Item</button>
      </div>
      <div className="mb-4">
        <Select
          isMulti
          options={payerOptions}
          onChange={(selected) => setSelectedPayers(selected || [])}
          className="w-1/4"
          placeholder="Filter by Payer"
        />
      </div>
      {loading ? (
        <div className="flex justify-center">
          <TailSpin height={50} width={50} color="#4A90E2" />
        </div>
      ) : (
        <ItemTable items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <ItemModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSave={handleSave}
        initialData={currentItem}
        payerOptions={payerOptions}
      />
    </div>
  );
};

export default App;
