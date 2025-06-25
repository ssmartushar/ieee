import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random';
import * as THREE from 'three';

function Stars() {
  const pointsRef = useRef<THREE.Points>(null);
  const bufferRef = useRef<THREE.BufferAttribute>(null);

  // Generate initial star positions
  const count = 5000;
  const positions = new Float32Array(count * 3);
  const sphere = random.inSphere(positions, { radius: 1.5 });

  useFrame((state, delta) => {
    if (pointsRef.current && bufferRef.current) {
      // Rotate the entire starfield
      pointsRef.current.rotation.x -= delta * 0.2;
      pointsRef.current.rotation.y -= delta * 0.15;

      // Update individual star positions
      const positions = bufferRef.current.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];

        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y + z * z);
        
        // Move stars outward
        const scale = 1 + delta * 0.5;
        
        positions[i3] *= scale;
        positions[i3 + 1] *= scale;
        positions[i3 + 2] *= scale;

        // Reset stars that go too far
        if (distance > 2) {
          const resetScale = 0.1;
          positions[i3] *= resetScale;
          positions[i3 + 1] *= resetScale;
          positions[i3 + 2] *= resetScale;
        }
      }

      bufferRef.current.needsUpdate = true;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            ref={bufferRef}
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
            normalized={false}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#FFE81F"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const HyperdriveEffect: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
};

export default HyperdriveEffect;