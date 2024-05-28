import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { fetchItems, addItem, updateItem, deleteItem } from './services/api';
import ItemModal from './components/ItemModal';
import ItemTable from './components/ItemTable';
import { TailSpin } from 'react-loader-spinner';
import './App.css';

const App: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItems(page + 1);
  }, [page]);

  const loadItems = async (page: number) => {
    setLoading(true);
    const data = await fetchItems(page, 10);
    setItems(data);
    setPageCount(5); // Example page count, should be set according to total items
    setLoading(false);
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
    loadItems(page + 1);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    await deleteItem(id);
    loadItems(page + 1);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl mb-4">CRUD Application</h1>
        <button onClick={handleAdd} className="bg-green-500 text-white p-2 rounded">Add Item</button>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <TailSpin height={50} width={50} color="#4A90E2" />
        </div>
      ) : (
        <ItemTable items={items} onEdit={handleEdit} onDelete={handleDelete} />
      )}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={(selectedItem) => setPage(selectedItem.selected)}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <ItemModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSave={handleSave}
        initialData={currentItem}
      />
    </div>
  );
};

export default App;
