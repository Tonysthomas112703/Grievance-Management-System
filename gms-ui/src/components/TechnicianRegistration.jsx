import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import styles from './Styles/TechnicianRegistration.module.css'; // Import your CSS module

const TechnicianRegistration = () => {
    const { authDetails } = useContext(AuthContext); // Access authDetails from context
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [expertise, setExpertise] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        const technicianData = {
            username,
            password,
            expertise,
        };

        // Encode username and password for basic authentication
        const auth = `${authDetails.username}:${authDetails.password}`;

        try {
            const response = await axios.post('http://localhost:8080/api/register-technician', technicianData, {
                headers: {
                    'Authorization': `Basic ${btoa(auth)}` // Use Basic Auth
                }
            });
            setMessage(response.data);
            // Optionally clear the form
            setUsername('');
            setPassword('');
            setExpertise('');
        } catch (error) {
            setMessage('Error registering technician: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Register Technician</h2>
            <div className={styles.card}>
                <div className={styles.cardBody}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Technician Name:</label>
                            <input
                                type="text"
                                className={styles.formControl}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Password:</label>
                            <input
                                type="password"
                                className={styles.formControl}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Expertise:</label>
                            <input
                                type="text"
                                className={styles.formControl}
                                value={expertise}
                                onChange={(e) => setExpertise(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Register Technician</button>
                    </form>
                    {message && <p className={styles.alertMessage}>{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default TechnicianRegistration;
