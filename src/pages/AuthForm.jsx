import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setMessage('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (isLogin) {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setMessage("Login successful! ✅");
      } else {
        const isEmailExist = users.some(u => u.email === email);
        setMessage(isEmailExist ? "Incorrect password ❌" : "Not registered yet ❌");
      }
    } else {
      const isAlreadyRegistered = users.some(u => u.email === email);
      if (isAlreadyRegistered) {
        setMessage("Already registered. Please login.");
      } else {
        const newUsers = [...users, { email, password }];
        localStorage.setItem("users", JSON.stringify(newUsers));
        setMessage("Registered successfully! ✅ Now login.");
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="auth-bg d-flex justify-content-center align-items-center min-vh-100">
      <motion.div
        className="auth-box p-5 shadow-lg rounded-5"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-center mb-4 fw-bold text-gradient">
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'} text-center rounded-pill`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-semibold"
          >
            {isLogin ? 'Login' : 'Register'}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <br />
          <button
            className="btn btn-outline-secondary btn-sm mt-2 rounded-pill px-4"
            onClick={toggleMode}
          >
            {isLogin ? 'Register Here' : 'Login Here'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
