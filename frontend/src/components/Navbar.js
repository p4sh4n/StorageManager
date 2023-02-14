import React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
  return (
    <nav className='nav'>
      <ul className='options'>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/suppliers">Suppliers</Link></li>
        <li><Link to="/materials">Materials</Link></li>
        <li><Link to="/products">Products</Link></li>
        <Logout/>
      </ul>
    </nav>
  );
};

export default Navbar;