import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem('expenses');
    return stored ? JSON.parse(stored) : [];
  });

  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
    const expense = Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0));

    if (income > 0) {
      const ratio = expense / income;
      if (ratio >= 0.9 && ratio < 1) {
        showToast('⚠️ Your expenses are close to your income!');
      } else if (ratio >= 1) {
        showToast('❌ Expense exceeds income!');
      }
    }
  }, [transactions]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  const handleAdd = () => {
    if (!desc.trim() || !amount) return;
    const newTransaction = {
      id: Date.now(),
      desc,
      amount: parseFloat(amount),
    };
    setTransactions([...transactions, newTransaction]);
    setDesc('');
    setAmount('');
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(txn => txn.id !== id));
  };

  const income = transactions.filter(t => t.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 rounded shadow"
      style={{ background: "linear-gradient(135deg, #f8f9fa, #e0f7fa)" }}
    >
      <h2 className="text-center mb-4 text-primary fw-bold">💸 Expense Tracker</h2>

      {/* Inputs */}
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control border-primary"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control border-primary"
            placeholder="Amount (+ for income, - for expense)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleAdd}>Add</button>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-4">
        <div className="p-2 rounded text-black fw-bold" style={{ background: "linear-gradient(to right, #33ffff, #ffffff)" }}>
          Income: ₹{income.toFixed(2)}
        </div>
        <div className="p-2 rounded text-white fw-bold" style={{ background: "linear-gradient(to right, #af0000, #dd1111)" }}>
          Expense: ₹{Math.abs(expense).toFixed(2)}
        </div>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="alert alert-warning text-center"
            role="alert"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {transactions.length === 0 ? (
        <p className="text-center text-muted">No transactions yet</p>
      ) : (
        <ul className="list-group">
          {transactions.map(t => (
            <motion.li
              key={t.id}
              className={`list-group-item d-flex justify-content-between align-items-center rounded mb-2 shadow-sm ${t.amount > 0 ? 'border-success' : 'border-danger'}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="fw-bold">{t.desc}</span>
              <span>
                ₹{t.amount.toFixed(2)}
                <button className="btn btn-sm btn-outline-danger ms-3 rounded-circle" onClick={() => handleDelete(t.id)}>×</button>
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

export default ExpenseTracker;
