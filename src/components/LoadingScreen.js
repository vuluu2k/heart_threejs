import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <div className="loading-text">
        <div className="romantic-text" style={{ fontSize: '28px', marginBottom: '10px' }}>
          Preparing My Heart for You...
        </div>
        <div style={{ fontSize: '16px', opacity: 0.8 }}>
          October 20th Special Edition
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
