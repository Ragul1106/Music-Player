import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GroceryList = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('groceryItems');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [editValue, setEditValue] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  const handleAdd = () => {
    if (!input.trim()) return;
    setItems(prev => [...prev, { id: Date.now(), name: input.trim(), purchased: false }]);
    setInput('');
    inputRef.current.focus();
  };

  const handleDelete = (id) => setItems(items.filter(item => item.id !== id));

  const handleToggle = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditValue(item.name);
  };

  const handleSaveEdit = (id) => {
    if (!editValue.trim()) return;
    setItems(items.map(item =>
      item.id === id ? { ...item, name: editValue.trim() } : item
    ));
    setEditingItem(null);
  };

  const filteredItems = items.filter(item => {
    if (filter === 'pending') return !item.purchased;
    if (filter === 'purchased') return item.purchased;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grocery-app container p-4 rounded-4 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #81ecec, #6c5ce7)',
        color: '#fff',
        minHeight: '90vh'
      }}
    >
      <h2 className="text-center fw-bold mb-4">🛒 Grocery Manager</h2>

      <div className="input-group mb-4 shadow-sm">
        <input
          type="text"
          ref={inputRef}
          className="form-control rounded-start"
          placeholder="Add a new grocery item..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn btn-warning fw-bold" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        {['all', 'pending', 'purchased'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`btn rounded-pill fw-semibold ${
              filter === type ? 'btn-light text-dark' : 'btn-outline-light'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {filteredItems.length === 0 ? (
          <motion.p
            className="text-center text-white fw-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No items found.
          </motion.p>
        ) : (
          <ul className="list-group">
            {filteredItems.map(item => (
              <motion.li
                key={item.id}
                className={`list-group-item d-flex justify-content-between align-items-center mb-2 rounded-3 shadow-sm ${
                  item.purchased ? 'bg-success-subtle' : 'bg-white'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="flex-grow-1">
                  {editingItem === item.id ? (
                    <input
                      className="form-control"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(item.id)}
                    />
                  ) : (
                    <span
                      className={`fs-5 ${
                        item.purchased ? 'text-decoration-line-through text-muted' : ''
                      }`}
                    >
                      {item.name}
                    </span>
                  )}
                </div>
                <div className="btn-group ms-3">
                  {editingItem === item.id ? (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleSaveEdit(item.id)}
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => handleToggle(item.id)}
                      >
                        {item.purchased ? 'Undo' : 'Done'}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GroceryList;
