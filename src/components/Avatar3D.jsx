import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Cylinder, Box } from '@react-three/drei';
import './Avatar3D.css';

function FemaleAvatar({ isSpeaking }) {
  const groupRef = useRef();
  const [rotation, setRotation] = useState(0);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle idle animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
      
      // Speaking animation
      if (isSpeaking) {
        setRotation(Math.sin(state.clock.elapsedTime * 10) * 0.05);
      } else {
        setRotation(0);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <Sphere args={[0.5, 32, 32]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#FFD9B3" />
      </Sphere>

      {/* Hair */}
      <Sphere args={[0.52, 32, 32]} position={[0, 1.7, 0]} scale={[1, 0.8, 1]}>
        <meshStandardMaterial color="#3D2817" />
      </Sphere>

      {/* Eyes */}
      <Sphere args={[0.05, 16, 16]} position={[-0.15, 1.6, 0.4]}>
        <meshStandardMaterial color="#2C1810" />
      </Sphere>
      <Sphere args={[0.05, 16, 16]} position={[0.15, 1.6, 0.4]}>
        <meshStandardMaterial color="#2C1810" />
      </Sphere>

      {/* Mouth - animates when speaking */}
      <Sphere 
        args={[0.08, 16, 16]} 
        position={[0, 1.4, 0.42]}
        scale={[1, isSpeaking ? 1.5 : 0.5, 1]}
        rotation={[rotation, 0, 0]}
      >
        <meshStandardMaterial color="#C85C5C" />
      </Sphere>

      {/* Neck */}
      <Cylinder args={[0.12, 0.12, 0.3, 16]} position={[0, 1.05, 0]}>
        <meshStandardMaterial color="#FFD9B3" />
      </Cylinder>

      {/* Body */}
      <Box args={[0.6, 0.8, 0.3]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#E91E63" />
      </Box>

      {/* Arms */}
      <Cylinder args={[0.08, 0.08, 0.7, 16]} position={[-0.4, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <meshStandardMaterial color="#FFD9B3" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.7, 16]} position={[0.4, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <meshStandardMaterial color="#FFD9B3" />
      </Cylinder>
    </group>
  );
}

function Avatar3D({ isSpeaking = false, className = '' }) {
  return (
    <div className={`avatar-3d-container ${className}`}>
      <Canvas camera={{ position: [0, 1.5, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.4} />
        <FemaleAvatar isSpeaking={isSpeaking} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      {isSpeaking && (
        <div className="speaking-indicator">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      )}
    </div>
  );
}

export default Avatar3D;

