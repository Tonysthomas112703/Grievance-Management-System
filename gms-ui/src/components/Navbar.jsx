import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Styles/Navbar.module.css'; // Import your custom CSS module

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img 
        src="/Tech.png" // Reference the image in the public directory
        alt="Logo" 
        className={styles.navLogo} 
      />
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/all-technicians" className={styles.navLink}>All Technicians</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/register-technician" className={styles.navLink}>Register Technician</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
