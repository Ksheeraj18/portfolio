/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const AntigravityInner = ({
  count = 150, // Further reduced for stability
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  particleSize = 2,
  lerpSpeed = 0.1,
  color = '#FF9FFC',
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10,
  isVisible // Received from parent
}) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
        temp.push({
            t: Math.random() * 100,
            speed: 0.01 + Math.random() / 200,
            mx: (Math.random() - 0.5) * width,
            my: (Math.random() - 0.5) * height,
            mz: (Math.random() - 0.5) * 20,
            cx: 0, cy: 0, cz: 0,
            randomRadiusOffset: (Math.random() - 0.5) * 2
        });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame(state => {
    if (!isVisible) return; // Full stop if offscreen
    
    const mesh = meshRef.current;
    if (!mesh) return;

    const { viewport: v, pointer: m } = state;
    let { x: valX, y: valY } = virtualMouse.current;

    const mouseDist = Math.hypot(m.x - lastMousePos.current.x, m.y - lastMousePos.current.y);

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (autoAnimate && Date.now() - lastMouseMoveTime.current > 2000) {
      const time = state.clock.getElapsedTime();
      destX = Math.sin(time * 0.5) * (v.width / 4);
      destY = Math.cos(time * 0.5 * 2) * (v.height / 4);
    }

    virtualMouse.current.x += (destX - valX) * 0.08;
    virtualMouse.current.y += (destY - valY) * 0.08;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = state.clock.getElapsedTime() * rotationSpeed;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.t += p.speed / 2;

      const pFactor = 1 - p.cz / 50;
      const tX = targetX * pFactor;
      const tY = targetY * pFactor;

      const dx = p.mx - tX;
      const dy = p.my - tY;
      const distSq = dx * dx + dy * dy;

      let goalX = p.mx;
      let goalY = p.my;
      let goalZ = p.mz * depthFactor;

      if (distSq < magnetRadius * magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(p.t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const radius = ringRadius + wave + (p.randomRadiusOffset * (5 / (fieldStrength + 0.1)));

        goalX = tX + radius * Math.cos(angle);
        goalY = tY + radius * Math.sin(angle);
        goalZ += Math.sin(p.t) * (1 * waveAmplitude * depthFactor);
      }

      p.cx += (goalX - p.cx) * lerpSpeed;
      p.cy += (goalY - p.cy) * lerpSpeed;
      p.cz += (goalZ - p.cz) * lerpSpeed;

      dummy.position.set(p.cx, p.cy, p.cz);
      dummy.lookAt(tX, tY, p.cz);
      dummy.rotateX(Math.PI / 2);

      const dRing = Math.abs(Math.hypot(p.cx - tX, p.cy - tY) - ringRadius);
      const s = Math.max(0, Math.min(1, 1 - dRing / 10)) * (0.8 + Math.sin(p.t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
      
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      {particleShape === 'capsule' && <capsuleGeometry args={[0.08, 0.3, 2, 4]} />}
      {particleShape === 'sphere' && <sphereGeometry args={[0.15, 8, 8]} />}
      {particleShape === 'box' && <boxGeometry args={[0.2, 0.2, 0.2]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.2]} />}
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </instancedMesh>
  );
};

const Antigravity = props => {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShouldRender(true);
      } else {
        // Delay unmounting slightly to prevent flickering during fast scrolls
        timeoutRef.current = setTimeout(() => {
            setShouldRender(false);
        }, 5000); // 5 seconds extra life
      }
    }, { threshold: 0.01, rootMargin: '1000px' });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
        observer.disconnect();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden antialiased">
        {shouldRender && (
            <Canvas 
                camera={{ position: [0, 0, 50], fov: 35 }}
                dpr={window.innerWidth < 768 ? [1, 1] : [1, 1.5]} 
                gl={{ 
                    antialias: false, 
                    powerPreference: "high-performance", 
                    alpha: true,
                    stencil: false,
                    depth: false
                }}
                style={{ pointerEvents: 'none' }}
            >
                <AntigravityInner {...props} isVisible={true} />
            </Canvas>
        )}
    </div>
  );
};

export default Antigravity;
