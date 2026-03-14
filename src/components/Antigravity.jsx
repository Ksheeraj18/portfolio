/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const AntigravityInner = ({
  count = 200, // Increased for more engagement
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
  isVisible = true, // Received from parent
  performanceMode = 'high'
}) => {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastFrame = useRef(0);
  const mountTime = useRef(0);
  const isLowPower = performanceMode === 'low';

  useEffect(() => {
    mountTime.current = Date.now();
  }, []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const particlesRef = useRef([]);

  useEffect(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
        // Generate random values once during initialization
        const randomT = Math.random() * 100;
        const randomSpeed = 0.01 + Math.random() / 200;
        const randomMx = (Math.random() - 0.5) * width;
        const randomMy = (Math.random() - 0.5) * height;
        const randomMz = (Math.random() - 0.5) * 20;
        const randomRadiusOffset = (Math.random() - 0.5) * 2;

        temp.push({
            t: randomT,
            speed: randomSpeed,
            mx: randomMx,
            my: randomMy,
            mz: randomMz,
            cx: 0, cy: 0, cz: 0,
            randomRadiusOffset: randomRadiusOffset
        });
    }
    particlesRef.current = temp;
  }, [count, viewport.width, viewport.height]);

  useFrame(state => {
    if (!isVisible) return; // Full stop if offscreen

    const now = state.clock.getElapsedTime();
    const runtime = performance.now() - mountTime.current;
    const fastRender = runtime < 1200; // keep it smooth right after load
    const frameInterval = fastRender ? 1 / 60 : (isLowPower ? 1 / 20 : 1 / 30);
    if (now - lastFrame.current < frameInterval) return;
    lastFrame.current = now;

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
      const p = particlesRef.current[i];
      if (!p) continue; // Safety check

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

const Antigravity = ({ performanceMode = 'high', disableAnimation = false, ...props }) => {
  const containerRef = useRef(null);
  const shouldRenderRef = useRef(false);
  const shouldRenderCanvas = useMemo(() => {
    return !disableAnimation && performanceMode !== 'low';
  }, [disableAnimation, performanceMode]);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const newValue = !disableAnimation && performanceMode !== 'low';
    setShouldRenderCanvas(newValue);
  }, [disableAnimation, performanceMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        shouldRenderRef.current = true;
      } else {
        // Delay unmounting slightly to prevent flickering during fast scrolls
        timeoutRef.current = setTimeout(() => {
            shouldRenderRef.current = false;
        }, 5000); // 5 seconds extra life
      }
    }, { threshold: 0.01, rootMargin: '1000px' });
    
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
        observer.disconnect();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    shouldRenderRef.current = !disableAnimation;
  }, [disableAnimation]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden antialiased">
        {shouldRenderCanvas && (
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
                <AntigravityInner {...props} isVisible={true} performanceMode={performanceMode} />
            </Canvas>
        )}
    </div>
  );
};

export default Antigravity;
