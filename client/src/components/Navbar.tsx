// client/src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to="/">Search Books</Link> | <Link to="/saved">Saved Books</Link>
    </nav>
  );
};

export default Navbar;
