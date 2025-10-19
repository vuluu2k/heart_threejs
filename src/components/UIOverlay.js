import React, { useState, useEffect } from 'react';
import './UIOverlay.css';

const UIOverlay = ({ 
  currentMessage, 
  showDate, 
  isAnimating, 
  useRealisticHeart,
  onMessageChange, 
  onToggleAnimation, 
  onToggleDate,
  onToggleHeartStyle
}) => {
  const [messageClass, setMessageClass] = useState('active');

  // Handle message transitions
  const handleMessageChange = () => {
    setMessageClass('fade-out');
    setTimeout(() => {
      onMessageChange();
      setMessageClass('active');
    }, 400);
  };

  return (
    <div className="ui-overlay">
      {/* Date Display */}
      {showDate && (
        <div className="date-display">
          <div className="date-title">October 20th</div>
          <div className="date-subtitle">A Special Day for Us</div>
        </div>
      )}

      {/* Controls Panel */}
      <div className="controls-panel">
        <button 
          className="control-btn" 
          onClick={handleMessageChange}
          title="New Message"
        >
          💕 New Message
        </button>
        <button 
          className="control-btn" 
          onClick={onToggleAnimation}
          title={isAnimating ? "Pause Animation" : "Resume Animation"}
        >
          {isAnimating ? "⏸️ Pause" : "▶️ Resume"}
        </button>
        <button 
          className="control-btn" 
          onClick={onToggleDate}
          title={showDate ? "Hide Date" : "Show Date"}
        >
          {showDate ? "📅 Hide Date" : "📅 Show Date"}
        </button>
        <button 
          className="control-btn" 
          onClick={onToggleHeartStyle}
          title={useRealisticHeart ? "Switch to Parametric Heart" : "Switch to Realistic Heart"}
        >
          {useRealisticHeart ? "💖 Realistic" : "💕 Parametric"}
        </button>
      </div>

      {/* Message Display */}
      <div className="message-display">
        <div className={`current-message ${messageClass}`}>
          {currentMessage}
        </div>
      </div>

      {/* Heart Click Hint */}
      <div className="heart-hint">
        <div className="hint-text">
          Click the heart for a special surprise! 💖
        </div>
      </div>
    </div>
  );
};

export default UIOverlay;
