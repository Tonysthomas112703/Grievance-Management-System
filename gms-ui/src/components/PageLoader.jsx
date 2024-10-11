// src/components/PageLoader.jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner'; // Import the loading spinner

const PageLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      // Stop loading after 1 second
      setTimeout(() => {
        setLoading(false);
      }, 500); // 1 second delay
    };

    handleStart(); // Start loading when the location changes

    return () => {
      // Cleanup the timer if the component unmounts
      setLoading(false);
    };
  }, [location]);

  return loading ? <LoadingSpinner /> : null; // Display spinner only if loading
};

export default PageLoader;
