import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">VegFinder</Link>
    </nav>
  );
};

export default Navbar;