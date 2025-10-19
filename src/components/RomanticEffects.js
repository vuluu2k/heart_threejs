import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RomanticEffects = ({ isAnimating }) => {
  const particlesRef = useRef();
  const sparklesRef = useRef();
  const timeRef = useRef(0);

  // Create particle system
  const particles = useMemo(() => {
    const particleCount = 400; // Increased for more sparkle
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions in a sphere
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      // More romantic colors with variations
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i3] = 1; colors[i3 + 1] = 0.41; colors[i3 + 2] = 0.71; // Pink
      } else if (colorChoice < 0.5) {
        colors[i3] = 1; colors[i3 + 1] = 0.75; colors[i3 + 2] = 0.8; // Light Pink
      } else if (colorChoice < 0.7) {
        colors[i3] = 1; colors[i3 + 1] = 1; colors[i3 + 2] = 1; // White
      } else if (colorChoice < 0.85) {
        colors[i3] = 1; colors[i3 + 1] = 0.84; colors[i3 + 2] = 0; // Gold
      } else {
        colors[i3] = 1; colors[i3 + 1] = 0.9; colors[i3 + 2] = 0.5; // Light Gold
      }
      
      sizes[i] = Math.random() * 3 + 0.5; // More varied sizes
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return geometry;
  }, []);

  // Create sparkle system
  const sparkles = useMemo(() => {
    const sparkleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(sparkleCount * 3);
    const colors = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount; i++) {
      const i3 = i * 3;
      
      // Sparkles closer to the heart
      positions[i3] = (Math.random() - 0.5) * 8;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;
      
      // Gold sparkles
      colors[i3] = 1;
      colors[i3 + 1] = 0.84;
      colors[i3 + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (!isAnimating) return;
    
    timeRef.current += delta;
    
    // Animate particles with smoother motion
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      const colors = particlesRef.current.geometry.attributes.color.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Smoother upward drift with gentle swaying
        const sway = Math.sin(timeRef.current * 0.5 + i * 0.01) * 0.002;
        positions[i] += sway;
        positions[i + 1] += 0.0008 + Math.sin(timeRef.current * 0.3 + i * 0.02) * 0.0002;
        positions[i + 2] += Math.cos(timeRef.current * 0.4 + i * 0.015) * 0.001;
        
        // Reset particles that go too high
        if (positions[i + 1] > 10) {
          positions[i + 1] = -10;
          positions[i] = (Math.random() - 0.5) * 20;
          positions[i + 2] = (Math.random() - 0.5) * 20;
        }
        
        // Smoother color pulsing with multiple waves
        const timeOffset = i * 0.01;
        const pulse1 = 0.6 + 0.4 * Math.sin(timeRef.current * 1.2 + timeOffset);
        const pulse2 = 0.8 + 0.2 * Math.sin(timeRef.current * 0.8 + timeOffset * 1.5);
        const pulse = pulse1 * pulse2;
        colors[i] *= pulse;
        colors[i + 1] *= pulse;
        colors[i + 2] *= pulse;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
    
    // Animate sparkles
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y = timeRef.current * 0.2;
      sparklesRef.current.rotation.x = Math.sin(timeRef.current * 0.3) * 0.1;
    }
  });

  return (
    <>
      {/* Floating particles */}
      <points ref={particlesRef} geometry={particles}>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Sparkles around heart */}
      <points ref={sparklesRef} geometry={sparkles}>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
    </>
  );
};

export default RomanticEffects;
