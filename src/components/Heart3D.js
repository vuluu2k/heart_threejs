import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Heart3D = ({ isAnimating }) => {
  const meshRef = useRef();
  const timeRef = useRef(0);

  // Create heart geometry using parametric equations
  const heartGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const normals = [];
    const indices = [];
    const uvs = [];

    const segments = 64; // Increased for smoother curves
    const rings = 32;    // Increased for better depth

    // Generate heart shape vertices
    for (let i = 0; i <= rings; i++) {
      const v = i / rings;
      for (let j = 0; j <= segments; j++) {
        const u = j / segments;
        
        // Improved heart parametric equations for more realistic shape
        const t = u * Math.PI * 2;
        
        // More realistic heart curve with better proportions
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        
        // Add more depth variation for realism
        const depthFactor = 1 - Math.abs(v - 0.5) * 2; // Thinner at edges
        const z = (v - 0.5) * 8 * depthFactor;
        
        // Scale and position with better proportions
        const scale = 0.12; // Slightly larger for better visibility
        vertices.push(x * scale, y * scale, z);
        
        // Calculate better normals for more realistic lighting
        const nx = Math.sin(t) * Math.cos(t) * 0.5;
        const ny = -Math.sin(t) * 0.8;
        const nz = Math.sin(v * Math.PI) * 0.3;
        normals.push(nx, ny, nz);
        
        // UV coordinates
        uvs.push(u, v);
      }
    }

    // Generate faces
    for (let i = 0; i < rings; i++) {
      for (let j = 0; j < segments; j++) {
        const a = i * (segments + 1) + j;
        const b = a + segments + 1;
        const c = a + 1;
        const d = b + 1;
        
        // Two triangles per quad
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    return geometry;
  }, []);

  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current || !isAnimating) return;
    
    timeRef.current += delta;
    
    // Smoother floating animation with multiple waves
    const wave1 = Math.sin(timeRef.current * 0.8) * 0.2;
    const wave2 = Math.sin(timeRef.current * 1.2) * 0.15;
    const wave3 = Math.cos(timeRef.current * 0.6) * 0.1;
    meshRef.current.position.y = wave1 + wave2 + wave3;
    
    // Gentle rotation with easing
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x = Math.sin(timeRef.current * 0.4) * 0.08;
    meshRef.current.rotation.z = Math.sin(timeRef.current * 0.6) * 0.06;
    
    // Smoother pulsing effect
    const pulse1 = 1 + Math.sin(timeRef.current * 1.5) * 0.08;
    const pulse2 = 1 + Math.sin(timeRef.current * 2.3) * 0.05;
    const pulse = pulse1 * pulse2;
    meshRef.current.scale.setScalar(pulse);
    
    // Add gentle swaying motion
    meshRef.current.rotation.z += Math.sin(timeRef.current * 0.3) * 0.002;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={heartGeometry}
      castShadow
      receiveShadow
    >
      <meshPhongMaterial
        color="#ff69b4"
        shininess={150}
        transparent
        opacity={0.95}
        emissive="#ff1493"
        emissiveIntensity={0.15}
        specular="#ff69b4"
        specularMap={null}
      />
    </mesh>
  );
};

export default Heart3D;
