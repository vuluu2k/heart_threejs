import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const FlyingMessages = ({ messages, isAnimating, currentIndex }) => {
  const groupRef = useRef();
  const timeRef = useRef(0);

  // Create flying text elements
  const flyingTexts = useMemo(() => {
    return messages.map((message, index) => {
      const angle = (index / messages.length) * Math.PI * 2;
      const radius = 3.5;
      const height = (Math.random() - 0.5) * 2;
      
      return {
        message: message,
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ],
        angle: angle,
        radius: radius,
        speed: 0.5 + Math.random() * 0.5,
        scale: 0.8 + Math.random() * 0.4,
        color: index === currentIndex ? '#ff69b4' : '#ffffff'
      };
    });
  }, [messages, currentIndex]);

  useFrame((state, delta) => {
    if (!groupRef.current || !isAnimating) return;
    
    timeRef.current += delta;
    
    // Rotate the entire group very slowly and smoothly
    groupRef.current.rotation.y = timeRef.current * 0.05;
    
    // Animate individual messages with smoother motion
    groupRef.current.children.forEach((child, index) => {
      if (child.userData.messageData) {
        const data = child.userData.messageData;
        
        // Smoother floating motion with multiple sine waves
        const wave1 = Math.sin(timeRef.current * data.speed + index * 0.5) * 0.2;
        const wave2 = Math.sin(timeRef.current * data.speed * 0.7 + index * 1.2) * 0.15;
        const wave3 = Math.cos(timeRef.current * data.speed * 0.3 + index * 0.8) * 0.1;
        child.position.y = data.position[1] + wave1 + wave2 + wave3;
        
        // Gentle rotation with easing
        child.rotation.y = timeRef.current * 0.1 + index * 0.5;
        
        // Smoother pulsing effect for current message
        if (index === currentIndex) {
          const pulse = 1 + Math.sin(timeRef.current * 2) * 0.15;
          child.scale.setScalar(data.scale * pulse);
        }
        
        // Add gentle swaying motion
        child.rotation.z = Math.sin(timeRef.current * 0.8 + index) * 0.05;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {flyingTexts.map((textData, index) => (
        <Text
          key={index}
          position={textData.position}
          fontSize={0.15}
          color={textData.color}
          anchorX="center"
          anchorY="middle"
          userData={{ messageData: textData }}
          castShadow
        >
          {textData.message}
        </Text>
      ))}
    </group>
  );
};

export default FlyingMessages;
