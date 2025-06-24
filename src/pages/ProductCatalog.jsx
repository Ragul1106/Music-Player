import React, { useState } from 'react';
import { motion } from 'framer-motion';

import HeadPhone from '../assets/Ear Buds.jpg'
import Tshirt from '../assets/T_shirt.jpg'
import CoffeMug from '../assets/coffe-mug.webp'
import SmartPhone from '../assets/vivo-v30.avif'
import Sneakers from '../assets/men-shoes.jpg'
import WallClock from '../assets/wall-clock.jpg'

const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, category: "Electronics", image:HeadPhone  },
  { id: 2, name: "T-Shirt", price: 799, category: "Clothing", image:Tshirt  },
  { id: 3, name: "Coffee Mug", price: 299, category: "Home", image: CoffeMug },
  { id: 4, name: "Smartphone", price: 14999, category: "Electronics", image:SmartPhone  },
  { id: 5, name: "Sneakers", price: 1299, category: "Clothing", image:Sneakers  },
  { id: 6, name: "Wall Clock", price: 499, category: "Home", image: WallClock },
];

const ProductCatalog = () => {
  const [filter, setFilter] = useState("All");
  const filteredProducts = filter === "All" ? products : products.filter(p => p.category === filter);
  const categories = ["All", ...new Set(products.map(p => p.category))];

  const fallbackImage = (name) => (
    <div style={{
      width: '100%',
      height: '200px',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      fontSize: '18px'
    }}>
      {name}
    </div>
  );

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-center mb-5 fw-bold text-gradient">🛍️ Product Catalog</h2>

      <motion.div className="d-flex justify-content-center gap-3 mb-4 flex-wrap"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={cat}
            className={`btn fw-semibold px-4 rounded-pill ${filter === cat ? 'btn-primary' : 'btn-outline-dark'}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <div className="row g-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            className="col-md-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="product-card shadow-sm border-0 rounded-4 position-relative overflow-hidden">
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src={product.image} 
                  className="w-100 h-100 object-fit-contain" 
                  alt={product.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                {fallbackImage(product.name)}
              </div>

              <div className="p-3 bg-light rounded-bottom-4">
                <h5 className="mb-1 text-dark fw-bold">{product.name}</h5>
                <span className="badge bg-secondary mb-2">{product.category}</span>
                <p className="text-muted mb-2">₹{product.price}</p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="btn btn-success w-100 fw-semibold glowing-btn"
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCatalog;