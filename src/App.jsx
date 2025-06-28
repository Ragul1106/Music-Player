import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';

import { motion } from 'framer-motion';

import MusicPlayer from './pages/MusicPlayer';

function App() {
  return (
    <Router>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container my-5 "
      >
        <Routes>
          <Route path="/" element={<MusicPlayer />} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;
