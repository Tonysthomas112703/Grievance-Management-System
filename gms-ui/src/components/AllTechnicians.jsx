import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import styles from './Styles/AllTechnicians.module.css'; // Import your custom CSS module

const AllTechnicians = () => {
  const { authDetails } = useContext(AuthContext);
  const [technicians, setTechnicians] = useState([]);
  const [message, setMessage] = useState('');

  const fetchTechnicians = async () => {
    try {
      const response = await fetch('http://localhost:8080/grievance/technicians', {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${authDetails.username}:${authDetails.password}`)}`,
        },
      });
      const data = await response.json();
      setTechnicians(data);
      if (data.length === 0) {
        setMessage('No technicians found.');
      }
    } catch (error) {
      setMessage('Error fetching technicians.');
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  return (
    <div className={styles.container}>

<img 
        src="/Tech.png" // Reference the image in the public directory
        alt="Logo" 
        className={styles.navLogo} 
      />
      <h2 className={styles.title}>All Technicians</h2>
      {message && <p className={styles.alert}>{message}</p>}
      <div className={styles.tableResponsive}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Technician ID</th>
              <th>Username</th>
              <th>Expertise</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {technicians.length > 0 ? (
              technicians.map((tech) => (
                <tr key={tech.id}>
                  <td>{tech.id}</td>
                  <td>{tech.username}</td>
                  <td>{tech.expertise}</td>
                  <td>{tech.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No technicians available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTechnicians;
