import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [result, setResult] = useState(null);
  const [rates, setRates] = useState({});

  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(res => setRates(res.data.rates))
      .catch(err => console.error(err));
  }, []);

  const handleConvert = () => {
    if (rates[from] && rates[to]) {
      const converted = (amount / rates[from]) * rates[to];
      setResult(converted.toFixed(2));
    }
  };

  useEffect(() => {
    if (amount && from && to) handleConvert();
  }, [amount, from, to, rates]);

  const currencies = Object.keys(rates);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="p-5 rounded-5 shadow-lg"
      style={{
        background: 'linear-gradient(145deg, #ffffc3, #22f9ff)',
        boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff',
        maxWidth: '650px',
        margin: 'auto',
        marginTop: '4rem'
      }}
    >
      <motion.h2
        className="text-center mb-4 fw-bold"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          background: 'linear-gradient(90deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
         Currency Converter
      </motion.h2>

      <div className="row g-4 align-items-end">
        <div className="col-md-4">
          <label className="form-label"> Amount</label>
          <input
            type="number"
            className="form-control rounded-pill shadow-sm px-4"
            value={amount}
            onChange={e => setAmount(parseFloat(e.target.value))}
            style={{ border: '1px solid #aaa' }}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">From</label>
          <select
            className="form-select rounded-pill shadow-sm px-3"
            value={from}
            onChange={e => setFrom(e.target.value)}
          >
            {currencies.map(cur => <option key={cur}>{cur}</option>)}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">To</label>
          <select
            className="form-select rounded-pill shadow-sm px-3"
            value={to}
            onChange={e => setTo(e.target.value)}
          >
            {currencies.map(cur => <option key={cur}>{cur}</option>)}
          </select>
        </div>
      </div>

      {result && (
        <motion.div
          className="mt-5 p-4 text-center text-white rounded-5 shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: '1.6rem',
            boxShadow: '4px 4px 10px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <strong>{amount}</strong> {from} = <strong>{result}</strong> {to}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CurrencyConverter;
