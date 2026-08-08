import React, { useEffect, useRef, useState } from 'react';

const JarvisHUD = () => {
  const canvasRef = useRef(null);
  const [chartPath1, setChartPath1] = useState("M 0 16 L 15 12 L 30 20 L 45 8 L 60 22 L 75 14 L 90 18 L 105 8 L 120 16");
  const [chartPath2, setChartPath2] = useState("M 0 20 Q 20 8 40 22 T 80 14 T 120 18");

  // Animate the line graphs slightly to make them look alive!
  useEffect(() => {
    const timer = setInterval(() => {
      const points1 = [
        `0,${14 + Math.random() * 4}`,
        `15,${10 + Math.random() * 8}`,
        `30,${16 + Math.random() * 6}`,
        `45,${6 + Math.random() * 8}`,
        `60,${20 + Math.random() * 6}`,
        `75,${12 + Math.random() * 8}`,
        `90,${16 + Math.random() * 6}`,
        `105,${6 + Math.random() * 10}`,
        `120,${14 + Math.random() * 4}`
      ];
      setChartPath1(`M ${points1.join(" L ")}`);

      const points2 = [
        `0,${18 + Math.random() * 4}`,
        `20,${8 + Math.random() * 10}`,
        `40,${22 + Math.random() * 6}`,
        `60,${12 + Math.random() * 8}`,
        `80,${24 + Math.random() * 6}`,
        `100,${14 + Math.random() * 6}`,
        `120,${18 + Math.random() * 4}`
      ];
      setChartPath2(`M ${points2.join(" L ")}`);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  // J.A.R.V.I.S. Neural Matrix — a rotating 3D web of synaptic nodes,
  // travelling signal pulses, a conscious core & holographic HUD arcs.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 320;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = 104;          // neural sphere radius
    const fov = 340;        // perspective depth
    const TAU = Math.PI * 2;

    // --- Nodes: evenly distributed on a sphere (Fibonacci lattice) ---
    const N = 98;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const nodes = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      nodes.push({
        x: Math.cos(theta) * rad * R,
        y: y * R,
        z: Math.sin(theta) * rad * R,
        phase: Math.random() * TAU,
        speed: 0.6 + Math.random() * 1.6,
      });
    }

    // --- Synapse edges: link nearby nodes into a neural web ---
    const edges = [];
    const threshold = R * 0.52;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < threshold) edges.push({ a: i, b: j });
      }
    }

    // --- Signal pulses travelling along random synapses ---
    const signals = [];
    for (let i = 0; i < 22; i++) {
      signals.push({
        e: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        sp: 0.006 + Math.random() * 0.016,
      });
    }

    // --- Holographic HUD arcs sweeping around the matrix ---
    const arcs = [
      { r: R * 1.16, a0: 0.2, a1: 2.1, sp: 0.010, w: 1.5, dash: [7, 6] },
      { r: R * 1.30, a0: 3.1, a1: 4.5, sp: -0.007, w: 1.0, dash: [3, 8] },
      { r: R * 1.10, a0: 5.0, a1: 6.1, sp: 0.014, w: 0.9, dash: [2, 6] },
      { r: R * 1.38, a0: 1.4, a1: 2.2, sp: -0.011, w: 1.2, dash: [10, 5] },
    ];

    let angleY = 0;
    const angleX = 0.34;    // fixed tilt
    let t = 0;
    let arcRot = 0;

    const project = (p) => {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      const scale = fov / (fov + z2);
      return { x: cx + x1 * scale, y: cy + y2 * scale, z: z2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      t += 0.016;
      angleY += 0.0042;
      arcRot += 1;

      // Ambient holographic halo
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.5);
      halo.addColorStop(0, 'rgba(255, 172, 92, 0.24)');
      halo.addColorStop(0.4, 'rgba(255, 110, 40, 0.08)');
      halo.addColorStop(1, 'rgba(255, 95, 31, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.5, 0, TAU);
      ctx.fill();

      // Project every node once
      const proj = nodes.map(project);

      // Sweeping HUD arcs (behind the web)
      arcs.forEach((arc) => {
        const off = arcRot * arc.sp;
        ctx.globalAlpha = 0.32;
        ctx.strokeStyle = 'rgba(255, 95, 31, 1)';
        ctx.lineWidth = arc.w;
        ctx.setLineDash(arc.dash);
        ctx.beginPath();
        ctx.arc(cx, cy, arc.r, arc.a0 + off, arc.a1 + off);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Synapse edges, depth-sorted so the far web recedes
      const drawEdges = edges
        .map((e) => {
          const pa = proj[e.a];
          const pb = proj[e.b];
          return { pa, pb, z: (pa.z + pb.z) / 2 };
        })
        .sort((A, B) => B.z - A.z);

      drawEdges.forEach(({ pa, pb, z }) => {
        const depth = (z + R) / (2 * R); // 0 far → 1 near
        ctx.globalAlpha = 0.05 + depth * 0.24;
        ctx.strokeStyle = 'rgba(255, 120, 45, 1)';
        ctx.lineWidth = 0.5 + depth * 0.6;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      });

      // Signal pulses firing across the synapses
      signals.forEach((sig) => {
        sig.t += sig.sp;
        if (sig.t > 1) {
          sig.t = 0;
          sig.e = Math.floor(Math.random() * edges.length);
        }
        const e = edges[sig.e];
        const pa = proj[e.a];
        const pb = proj[e.b];
        const x = pa.x + (pb.x - pa.x) * sig.t;
        const y = pa.y + (pb.y - pa.y) * sig.t;
        const z = pa.z + (pb.z - pa.z) * sig.t;
        const depth = (z + R) / (2 * R);
        ctx.globalAlpha = 0.45 + depth * 0.55;
        ctx.fillStyle = '#fff4e0';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ff8a2e';
        ctx.beginPath();
        ctx.arc(x, y, 1.4 + depth * 1.3, 0, TAU);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Nodes, far ones first so near ones sit on top and glow
      const order = proj
        .map((p, i) => ({ p, i }))
        .sort((A, B) => A.p.z - B.p.z);

      order.forEach(({ p, i }) => {
        const depth = (p.z + R) / (2 * R);
        const nd = nodes[i];
        const flick = 0.6 + 0.4 * Math.sin(t * nd.speed + nd.phase);
        ctx.globalAlpha = Math.min(1, (0.22 + depth * 0.72) * flick);
        ctx.fillStyle = depth > 0.6 ? 'rgba(255, 208, 145, 1)' : 'rgba(255, 108, 38, 1)';
        if (depth > 0.55) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ff8a2e';
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.8 + depth * 1.9, 0, TAU);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Conscious core
      const pulse = 1 + 0.07 * Math.sin(t * 1.8);
      const coreR = 15 * pulse;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.3, '#fff0cf');
      grad.addColorStop(0.7, '#ff8a2e');
      grad.addColorStop(1, 'rgba(232, 93, 10, 0)');
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 26;
      ctx.shadowColor = '#ff7a1f';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, TAU);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(cx, cy, 4.2 * pulse, 0, TAU);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Instrument tick bezel
      ctx.save();
      ctx.translate(cx, cy);
      const TICKS = 60;
      for (let i = 0; i < TICKS; i++) {
        const a = (i / TICKS) * TAU + arcRot * 0.002;
        const major = i % 5 === 0;
        const r0 = R * 1.45;
        const r1 = r0 - (major ? 8 : 4);
        ctx.globalAlpha = major ? 0.4 : 0.16;
        ctx.strokeStyle = 'rgba(255, 95, 31, 1)';
        ctx.lineWidth = major ? 1.1 : 0.6;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r0, Math.sin(a) * r0);
        ctx.stroke();
      }
      ctx.restore();

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Helper component to render segmented metric levels
  const MetricLevel = ({ activeSegments }) => {
    return (
      <div className="metric-level-bar">
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`segment ${i < activeSegments ? 'active' : ''}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="jarvis-split-layout">

      {/* LEFT COLUMN: Neural Matrix Hologram */}
      <div className="hologram-viewport-column">
        <div className="hologram-viewport">
          {/* L-Brackets */}
          <div className="hud-frame-bracket top-left"></div>
          <div className="hud-frame-bracket top-right"></div>
          <div className="hud-frame-bracket bottom-left"></div>
          <div className="hud-frame-bracket bottom-right"></div>

          {/* Neural Matrix Canvas */}
          <canvas ref={canvasRef} width={320} height={320} className="hologram-canvas" />

          {/* Bottom Framed J.A.R.V.I.S CORE Label */}
          <div className="hud-hologram-data-box">
            <span className="hud-data-title">J.A.R.V.I.S &nbsp; C O R E</span>
            <span className="hud-data-hz">NEURAL_MATRIX // SYNC 100%</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Telemetry Dashboard */}
      <div className="hud-dashboard-column">

        {/* CARD 1: SYSTEM STATUS */}
        <div className="dashboard-card card-status">
          <div className="card-header-row">
            <div className="card-header-text">
              <span className="card-label">SYSTEM STATUS</span>
              <span className="card-value status-green">OPTIMAL</span>
            </div>
            <div className="vertical-status-leds">
              <span className="led active"></span>
              <span className="led active"></span>
              <span className="led active"></span>
            </div>
          </div>
          <div className="hud-chart-container">
            <svg className="hud-chart-svg" viewBox="0 0 120 32">
              <path d={chartPath1} fill="none" stroke="var(--primary-color)" strokeWidth="1.2" />
            </svg>
          </div>
        </div>

        {/* CARD 2: SYSTEM METRICS LIST */}
        <div className="dashboard-card card-metrics">
          <div className="metrics-list">

            {/* Metric item 1: CPU */}
            <div className="metric-item">
              <div className="metric-header">
                <span className="metric-icon-cpu">&#x2699;</span>
                <span className="metric-name">CPU USAGE</span>
                <span className="metric-value">23%</span>
              </div>
              <MetricLevel activeSegments={2} />
            </div>

            {/* Metric item 2: MEMORY */}
            <div className="metric-item">
              <div className="metric-header">
                <span className="metric-icon-mem">&#x1F5D1;</span>
                <span className="metric-name">MEMORY</span>
                <span className="metric-value">45%</span>
              </div>
              <MetricLevel activeSegments={4} />
            </div>

            {/* Metric item 3: NETWORK */}
            <div className="metric-item">
              <div className="metric-header">
                <span className="metric-icon-net">&#x2609;</span>
                <span className="metric-name">NETWORK</span>
                <span className="metric-value">68%</span>
              </div>
              <MetricLevel activeSegments={5} />
            </div>

            {/* Metric item 4: STORAGE */}
            <div className="metric-item">
              <div className="metric-header">
                <span className="metric-icon-storage">&#x1F5C4;</span>
                <span className="metric-name">STORAGE</span>
                <span className="metric-value">72%</span>
              </div>
              <MetricLevel activeSegments={6} />
            </div>

          </div>
        </div>

        {/* CARD 3: PERFORMANCE / EFFICIENCY */}
        <div className="dashboard-card card-performance">
          <div className="performance-row">
            <div className="metric-group">
              <span className="card-label">PERFORMANCE</span>
              <span className="card-value text-orange">98.6%</span>
            </div>
            <div className="metric-group right-align">
              <span className="card-label">EFFICIENCY</span>
              <svg className="hud-chart-svg inline-chart" viewBox="0 0 120 32" width="60" height="18">
                <path d={chartPath2} fill="none" stroke="var(--primary-color)" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default JarvisHUD;
