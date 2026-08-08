import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Soft radial sprite used for every glowing dot / core flare
function makeDotTexture() {
  const s = 64;
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.28, 'rgba(255,214,150,1)');
  g.addColorStop(0.62, 'rgba(255,120,40,0.55)');
  g.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

function Neural() {
  const group = useRef();
  const coreRef = useRef();
  const ringRefs = useRef([]);
  const nodesRef = useRef();
  const particleRef = useRef();

  const dot = useMemo(makeDotTexture, []);

  const R = 2.0;
  // Reduce density on small / low-power screens
  const N = useMemo(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 540),
    []
  );

  // Nodes distributed on layered spherical shells (Fibonacci lattice + jitter)
  const { nodePos, nodes } = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const list = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      // ~25% of nodes sit on an inner shell to give real depth
      const shell = Math.random() < 0.25 ? 0.5 + Math.random() * 0.18 : 0.88 + Math.random() * 0.12;
      const rr = R * shell;
      list.push(new THREE.Vector3(Math.cos(th) * rad * rr, y * rr, Math.sin(th) * rad * rr));
    }
    const pos = new Float32Array(N * 3);
    list.forEach((v, i) => {
      pos[i * 3] = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;
    });
    return { nodePos: pos, nodes: list };
  }, [N]);

  // Synapse connections between nearby nodes
  const edges = useMemo(() => {
    const thr = R * 0.34;
    const segs = [];
    for (let i = 0; i < nodes.length && segs.length < 2800; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < thr) {
          segs.push([i, j]);
          if (segs.length >= 2800) break;
        }
      }
    }
    return segs;
  }, [nodes]);

  const linePos = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], k) => {
      arr[k * 6] = nodes[a].x;
      arr[k * 6 + 1] = nodes[a].y;
      arr[k * 6 + 2] = nodes[a].z;
      arr[k * 6 + 3] = nodes[b].x;
      arr[k * 6 + 4] = nodes[b].y;
      arr[k * 6 + 5] = nodes[b].z;
    });
    return arr;
  }, [edges, nodes]);

  // Data pulses travelling along random synapses
  const P = N < 400 ? 40 : 80;
  const particles = useMemo(
    () =>
      Array.from({ length: P }, () => ({
        e: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        sp: 0.15 + Math.random() * 0.6,
      })),
    [edges, P]
  );
  const particlePos = useMemo(() => new Float32Array(P * 3), [P]);

  // Orbital rings sweeping around the sphere
  const rings = useMemo(
    () => [
      { r: R * 1.14, tube: 0.007, rot: [Math.PI / 2.2, 0, 0], sp: 0.16, col: '#ff7a2e', op: 0.5 },
      { r: R * 1.24, tube: 0.004, rot: [Math.PI / 2, 0.5, 0], sp: -0.1, col: '#ffab52', op: 0.34 },
      { r: R * 1.02, tube: 0.009, rot: [0.35, 0.2, 0], sp: 0.24, col: '#ff6a28', op: 0.44 },
    ],
    []
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Slow spin + mouse parallax
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      const px = state.pointer.x;
      const py = state.pointer.y;
      group.current.rotation.x += (py * 0.35 - group.current.rotation.x) * 0.05;
      group.current.position.x += (px * 0.18 - group.current.position.x) * 0.05;
      group.current.position.y += (py * 0.12 - group.current.position.y) * 0.05;
    }

    // Pulsing conscious core
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + 0.08 * Math.sin(t * 2.2));
    }

    // Independent ring rotation
    ringRefs.current.forEach((m, i) => {
      if (m) m.rotation.z += delta * rings[i].sp;
    });

    // Node shimmer
    if (nodesRef.current) {
      nodesRef.current.material.size = 0.085 * (1 + 0.08 * Math.sin(t * 3));
    }

    // Advance data pulses
    for (let k = 0; k < P; k++) {
      const pt = particles[k];
      pt.t += pt.sp * delta;
      if (pt.t > 1) {
        pt.t = 0;
        pt.e = Math.floor(Math.random() * edges.length);
      }
      const [a, b] = edges[pt.e];
      const A = nodes[a];
      const B = nodes[b];
      particlePos[k * 3] = A.x + (B.x - A.x) * pt.t;
      particlePos[k * 3 + 1] = A.y + (B.y - A.y) * pt.t;
      particlePos[k * 3 + 2] = A.z + (B.z - A.z) * pt.t;
    }
    if (particleRef.current) {
      particleRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      {/* Synapse connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ff6a28" transparent opacity={0.16} depthWrite={false} />
      </lineSegments>

      {/* Neural nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          color="#ff8a3a"
          size={0.085}
          sizeAttenuation
          transparent
          depthWrite={false}
        />
      </points>

      {/* Travelling data pulses */}
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          map={dot}
          color="#ffd89a"
          size={0.15}
          sizeAttenuation
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Orbital rings */}
      {rings.map((rg, i) => (
        <mesh key={i} ref={(m) => (ringRefs.current[i] = m)} rotation={rg.rot}>
          <torusGeometry args={[rg.r, rg.tube, 8, 140]} />
          <meshBasicMaterial color={rg.col} transparent opacity={rg.op} depthWrite={false} />
        </mesh>
      ))}

      {/* Conscious core */}
      <group ref={coreRef}>
        <sprite scale={[1.7, 1.7, 1.7]}>
          <spriteMaterial
            map={dot}
            color="#ff8a2e"
            transparent
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
        <mesh>
          <icosahedronGeometry args={[0.22, 2]} />
          <meshBasicMaterial color="#fff2d6" />
        </mesh>
        <sprite scale={[0.7, 0.7, 0.7]}>
          <spriteMaterial
            map={dot}
            color="#ffffff"
            transparent
            opacity={1}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </sprite>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.46, 0.012, 8, 90]} />
          <meshBasicMaterial color="#ff7a1f" transparent opacity={0.8} depthWrite={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0.6, 0]}>
          <torusGeometry args={[0.64, 0.008, 8, 90]} />
          <meshBasicMaterial color="#ffab52" transparent opacity={0.6} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

export default function NeuralCore() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.4], fov: 48 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <Neural />
    </Canvas>
  );
}
