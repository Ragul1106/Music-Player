import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const collapseRef = useRef(null);
  const location = useLocation();

  const closeNavbar = () => {
    const bsCollapse = new window.bootstrap.Collapse(collapseRef.current, {
      toggle: false
    });
    bsCollapse.hide();
  };

  return (
    <nav className="navbar navbar-expand-lg p-4 navbar-dark bg-primary fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={closeNavbar}>Mini Projects</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav" ref={collapseRef}>
          <ul className="navbar-nav ms-auto">
            {[
              { path: "/currency", label: "Currency" },
              { path: "/stopwatch", label: "Stopwatch" },
              { path: "/markdown", label: "Markdown" },
              { path: "/grocery", label: "Grocery" },
              { path: "/expense", label: "Expense" },
              { path: "/blog", label: "Blog" },
              { path: "/movies", label: "Movies" },
              { path: "/auth", label: "Auth" },
              { path: "/products", label: "Products" },
              { path: "/music", label: "Music" },
            ].map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <Link
                  className={`nav-link ${location.pathname === path ? 'active' : ''}`}
                  to={path}
                  onClick={closeNavbar}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
