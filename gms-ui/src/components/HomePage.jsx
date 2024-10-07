import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Techtronix</h1>
          <p>Innovating the Future of Electronics</p>
          <div className="hero-buttons">
            <Link to="/about">
              <button className="primary-button">About</button>
            </Link>
            <Link to="/Login">
              <button className="primary-button">Login</button>
            </Link>
          </div>
        </div>
      </header>

      <section className="features-section">
        <h2>Our Solutions</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Advanced Robotics</h3>
            <p>Integrating automation and AI for the next generation of electronics.</p>
          </div>
          <div className="feature-item">
            <h3>IoT Innovations</h3>
            <p>Smart solutions to connect the world through intelligent electronic systems.</p>
          </div>
          <div className="feature-item">
            <h3>Consumer Electronics</h3>
            <p>Designing user-friendly electronics with cutting-edge technology.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Techtronix. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;