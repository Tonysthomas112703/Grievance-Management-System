import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './Styles/RegisterTechnician.module.css'; // Import your custom CSS module

const RegisterTechnician = () => {
  const { authDetails } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [expertise, setExpertise] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/register-technician', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${authDetails.username}:${authDetails.password}`)}`,
        },
        body: JSON.stringify({ username, password, expertise }),
      });

      if (response.ok) {
        setMessage('Technician registered successfully!');
        setUsername('');
        setPassword('');
        setExpertise('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('An error occurred while registering the technician.');
    }
  };

  return (
    <div className={styles.container}>
        <img 
        src="/Tech.png" // Reference the image in the public directory
        alt="Logo" 
        className={styles.navLogo} 
      />
      <h2 className={styles.title}>Register Technician</h2>
      {message && <p className={styles.alert}>{message}</p>}
      <form onSubmit={handleRegister} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="expertise">Expertise</label>
          <input
            type="text"
            id="expertise"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Register Technician
        </button>
      </form>
    </div>
  );
};

export default RegisterTechnician;
