// src/components/LoadingSpinner.jsx
import React from 'react';
import './Styles/LoadingSpinner.css'; // Add CSS for spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
