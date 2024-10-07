import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext
import { useNavigate } from 'react-router-dom';
import './Styles/TechnicianDashboard.module.css';

const TechnicianDashboard = () => {
  const { authDetails } = useContext(AuthContext); // Access authDetails from context
  const [technicianId, setTechnicianId] = useState(''); // To store the technician ID input
  const [grievances, setGrievances] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(''); // Selected status for update
  const [technicianStatus, setTechnicianStatus] = useState(''); // For technician status update
  const [message, setMessage] = useState('');
  const [hasEnteredId, setHasEnteredId] = useState(false); // Track if the technician has entered ID

  const navigate = useNavigate();

  // Fetch grievances assigned to the logged-in technician by technician ID
  const fetchGrievances = async (technicianId) => {
    try {
      const response = await fetch(`http://localhost:8080/grievance/get-grievances?technicianId=${technicianId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${btoa(`${authDetails.username}:${authDetails.password}`)}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setGrievances(data);
      } else {
        setMessage('Error fetching grievances.');
      }
    } catch (error) {
      setMessage('An error occurred while fetching grievances.');
    }
  };

  // Handle status update for a grievance using grievanceId and status only
  const handleUpdateGrievanceStatus = async (grievanceId) => {
    if (!selectedStatus) {
      setMessage('Please select a status.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/grievance/update-grievance-status?grievanceId=${grievanceId}&status=${selectedStatus}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${authDetails.username}:${authDetails.password}`)}`,
        },
      });

      if (response.ok) {
        setMessage('Grievance status updated successfully!');
        fetchGrievances(technicianId); // Refresh grievances after updating status
        setSelectedStatus(''); // Reset selected status after update
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('An error occurred while updating status.');
    }
  };

  // Handle technician status update
  const handleTechnicianStatusUpdate = async () => {
    if (!technicianStatus) {
      setMessage('Please select a technician status.');
      return;
    }
  
    try {
      // Make sure to send the correct endpoint for technician status update
      const response = await fetch(`http://localhost:8080/grievance/update-technician-status?technicianId=${technicianId}&status=${technicianStatus}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${authDetails.username}:${authDetails.password}`)}`,
        },
      });
  
      if (response.ok) {
        setMessage('Technician status updated successfully!');
        setTechnicianStatus(''); // Reset the status after update
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('An error occurred while updating technician status.');
    }
  };

  // Handle submission of technician ID
  const handleTechnicianIdSubmit = (e) => {
    e.preventDefault();
    if (technicianId) {
      setHasEnteredId(true);
      fetchGrievances(technicianId); // Fetch grievances after the technician ID is entered
    } else {
      setMessage('Please enter your Technician ID.');
    }
  };

  return (
    <div id="technician-dashboard" className="container mt-5">
      <h2 id="dashboard-title">Technician Dashboard</h2>
      {message && <p id="message-alert" className="alert">{message}</p>}

      {!hasEnteredId ? (
        <form id="technician-id-form" onSubmit={handleTechnicianIdSubmit} className="form">
          <label htmlFor="technicianIdInput" className="label">Enter Technician ID:</label>
          <input
            type="text"
            id="technicianIdInput"
            value={technicianId}
            onChange={(e) => setTechnicianId(e.target.value)}
            className="input"
            required
          />
          <button type="submit" id="submit-button" className="submitButton">Submit</button>
        </form>
      ) : (
        <>
          <h3 id="grievances-title">Your Grievances</h3>
          {grievances.length > 0 ? (
            <ul id="grievances-list">
              {grievances.map((grievance) => (
                <li key={grievance.grievanceId} id={`grievance-${grievance.grievanceId}`}>
                  <div>
                    <strong>Grievance ID:</strong> {grievance.grievanceId}
                  </div>
                  <div>
                    <strong>Description:</strong> {grievance.description}
                  </div>
                  <div>
                    <strong>Type:</strong> {grievance.type}
                  </div>
                  <div>
                    <strong>Status:</strong> {grievance.status}
                  </div>
                  <div>
                    <strong>Username:</strong> {grievance.username}
                  </div>
                  <select
                    id={`status-select-${grievance.grievanceId}`}
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value); // Update selected status
                    }}
                    className="select"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                  <button 
                    id={`update-status-button-${grievance.grievanceId}`} 
                    className="submitButton ms-2" 
                    onClick={() => {
                      handleUpdateGrievanceStatus(grievance.grievanceId); // Update with grievance ID
                      setSelectedStatus(grievance.status); // Automatically select current status
                    }}
                  >
                    Update Status
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p id="no-grievances-message">No grievances assigned yet.</p>
          )}

          <h3 id="update-status-title">Update Technician Status</h3>
          <select
            id="technician-status-select"
            value={technicianStatus}
            onChange={(e) => setTechnicianStatus(e.target.value)}
            className="select"
            required
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <button id="update-technician-status-button" className="submitButton ms-2" onClick={handleTechnicianStatusUpdate}>
            Update Technician Status
          </button>
        </>
      )}
    </div>
  );
};

export default TechnicianDashboard;
