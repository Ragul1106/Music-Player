import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';

import { motion } from 'framer-motion';

import CurrencyConverter from './pages/CurrencyConverter';
import Stopwatch from './pages/Stopwatch';
import MarkdownPreviewer from './pages/MarkdownPreviewer';
import GroceryList from './pages/GroceryList';
import ExpenseTracker from './pages/ExpenseTracker';
import BlogPlatform from './pages/BlogPlatform';
import MovieSearch from './pages/MovieSearch';
import AuthForm from './pages/AuthForm';
import ProductCatalog from './pages/ProductCatalog';
import MusicPlayer from './pages/MusicPlayer';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg p-4 navbar-dark bg-primary fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/">Mini Projects</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/currency">Currency</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/stopwatch">Stopwatch</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/markdown">Markdown</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/grocery">Grocery</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/expense">Expense</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/movies">Movies</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/auth">Auth</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/music">Music</Link></li>
        </ul>
      </div>
    </div>
  </nav>
);

function App() {
  return (
    <Router>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container my-4"
      >
        <Routes>
          <Route path="/currency" element={<CurrencyConverter />} />
          <Route path="/stopwatch" element={<Stopwatch />} />
          <Route path="/markdown" element={<MarkdownPreviewer />} />
          <Route path="/grocery" element={<GroceryList />} />
          <Route path="/expense" element={<ExpenseTracker />} />
          <Route path="/blog" element={<BlogPlatform />} />
          <Route path="/movies" element={<MovieSearch />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/music" element={<MusicPlayer />} />
          <Route path="*" element={<h2 className="text-center text-muted">Select a project from the menu.</h2>} />
        </Routes>
      </motion.div>
    </Router>
  );
}

export default App;