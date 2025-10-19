import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Heart3D from './components/Heart3D';
import RealisticHeart from './components/RealisticHeart';
import FlyingMessages from './components/FlyingMessages';
import RomanticEffects from './components/RomanticEffects';
import UIOverlay from './components/UIOverlay';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

// Romantic messages for October 20th
const romanticMessages = [
  "Happy October 20th, my love! 💕",
  "You make every day feel like a celebration",
  "My heart beats only for you",
  "In your eyes, I found my home",
  "Love you more than words can express",
  "You are my greatest blessing",
  "Every moment with you is precious",
  "You light up my world like no one else",
  "Forever and always, my darling",
  "You are my sunshine on cloudy days",
  "My love for you grows stronger each day",
  "You are the missing piece of my heart",
  "In your arms, I found my peace",
  "You make ordinary moments extraordinary",
  "My heart belongs to you, now and forever"
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showDate, setShowDate] = useState(true);
  const [useRealisticHeart, setUseRealisticHeart] = useState(true);

  // Hide loading screen after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-change messages every 8 seconds
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % romanticMessages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const changeMessage = () => {
    setCurrentMessage((prev) => (prev + 1) % romanticMessages.length);
  };

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const toggleDate = () => {
    setShowDate(!showDate);
  };

  const toggleHeartStyle = () => {
    setUseRealisticHeart(!useRealisticHeart);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} color="#ff69b4" intensity={0.5} />
        <pointLight position={[5, -5, 5]} color="#ffffff" intensity={0.3} />

        {/* 3D Scene */}
        <Stars radius={100} depth={50} count={200} factor={4} saturation={0} fade />
        
        {useRealisticHeart ? (
          <RealisticHeart isAnimating={isAnimating} />
        ) : (
          <Heart3D isAnimating={isAnimating} />
        )}
        <FlyingMessages 
          messages={romanticMessages} 
          isAnimating={isAnimating}
          currentIndex={currentMessage}
        />
        <RomanticEffects isAnimating={isAnimating} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={isAnimating}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      <UIOverlay
        currentMessage={romanticMessages[currentMessage]}
        showDate={showDate}
        isAnimating={isAnimating}
        useRealisticHeart={useRealisticHeart}
        onMessageChange={changeMessage}
        onToggleAnimation={toggleAnimation}
        onToggleDate={toggleDate}
        onToggleHeartStyle={toggleHeartStyle}
      />
    </div>
  );
}

export default App;
