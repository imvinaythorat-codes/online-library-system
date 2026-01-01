import React from 'react';
import { NavLink } from 'react-router-dom';

// Lightweight header with navigation links.
export default function Header() {
  const navLinkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link';

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo-area">
          <span className="logo-mark">OL</span>
          <div className="logo-text">
            <span className="logo-title">Online Library</span>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/books" className={navLinkClass}>
            Browse Books
          </NavLink>
          <NavLink to="/add-book" className={navLinkClass}>
            Add Book
          </NavLink>
        </nav>
      </div>
    </header>
  );
}