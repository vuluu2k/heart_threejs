import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const RealisticHeart = ({ isAnimating }) => {
  const groupRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current || !isAnimating) return;
    
    timeRef.current += delta;
    
    // Smoother floating animation with multiple waves
    const wave1 = Math.sin(timeRef.current * 0.8) * 0.2;
    const wave2 = Math.sin(timeRef.current * 1.2) * 0.15;
    const wave3 = Math.cos(timeRef.current * 0.6) * 0.1;
    groupRef.current.position.y = wave1 + wave2 + wave3;
    
    // Gentle rotation with easing
    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x = Math.sin(timeRef.current * 0.4) * 0.08;
    groupRef.current.rotation.z = Math.sin(timeRef.current * 0.6) * 0.06;
    
    // Smoother pulsing effect
    const pulse1 = 1 + Math.sin(timeRef.current * 1.5) * 0.08;
    const pulse2 = 1 + Math.sin(timeRef.current * 2.3) * 0.05;
    const pulse = pulse1 * pulse2;
    groupRef.current.scale.setScalar(pulse);
    
    // Add gentle swaying motion
    groupRef.current.rotation.z += Math.sin(timeRef.current * 0.3) * 0.002;
  });

  return (
    <group ref={groupRef}>
      {/* Left heart lobe */}
      <mesh position={[-0.3, 0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial
          color="#ff69b4"
          shininess={200}
          transparent
          opacity={0.9}
          emissive="#ff1493"
          emissiveIntensity={0.2}
          specular="#ff69b4"
          specularMap={null}
        />
      </mesh>

      {/* Right heart lobe */}
      <mesh position={[0.3, 0.2, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshPhongMaterial
          color="#ff69b4"
          shininess={200}
          transparent
          opacity={0.9}
          emissive="#ff1493"
          emissiveIntensity={0.2}
          specular="#ff69b4"
          specularMap={null}
        />
      </mesh>

      {/* Heart point */}
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, Math.PI]} castShadow receiveShadow>
        <coneGeometry args={[0.3, 0.6, 32]} />
        <meshPhongMaterial
          color="#ff69b4"
          shininess={200}
          transparent
          opacity={0.9}
          emissive="#ff1493"
          emissiveIntensity={0.2}
          specular="#ff69b4"
          specularMap={null}
        />
      </mesh>

      {/* Heart center connection */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.2, 0.3]} />
        <meshPhongMaterial
          color="#ff69b4"
          shininess={200}
          transparent
          opacity={0.9}
          emissive="#ff1493"
          emissiveIntensity={0.2}
          specular="#ff69b4"
          specularMap={null}
        />
      </mesh>

      {/* Additional details for realism */}
      <mesh position={[-0.15, 0.1, 0.2]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhongMaterial
          color="#ff1493"
          shininess={100}
          transparent
          opacity={0.8}
          emissive="#ff1493"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0.15, 0.1, 0.2]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhongMaterial
          color="#ff1493"
          shininess={100}
          transparent
          opacity={0.8}
          emissive="#ff1493"
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
};

export default RealisticHeart;
