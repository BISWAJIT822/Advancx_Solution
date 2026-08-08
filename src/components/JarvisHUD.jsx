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

  // Radial "Supernova" HUD — particle burst, radar rings & fusion core
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = 320;            // logical drawing size
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const R = 150;               // outer radius of the burst

    // Warm colour ramp: bright near the core, deep orange at the rim
    const colorFor = (t) => {
      if (t < 0.22) return '255, 205, 140';
      if (t < 0.45) return '255, 150, 66';
      if (t < 0.72) return '255, 110, 40';
      return '255, 95, 31';
    };

    // Radial spokes of particles fanning out from the core
    const SPOKES = 76;
    const spokeParticles = [];
    for (let s = 0; s < SPOKES; s++) {
      const a = (s / SPOKES) * Math.PI * 2;
      const reach = 0.55 + Math.random() * 0.45;
      const count = 14 + Math.floor(Math.random() * 9);
      for (let i = 1; i <= count; i++) {
        const frac = i / count;
        const r = Math.pow(frac, 1.22) * R * reach;
        spokeParticles.push({
          a,
          r,
          size: 0.55 + (1 - frac) * 1.2,
          baseAlpha: 0.28 + (1 - frac) * 0.6,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.5 + Math.random() * 1.6,
        });
      }
    }

    // Concentric dotted radar rings
    const RINGS = 15;
    const ringParticles = [];
    for (let ri = 1; ri <= RINGS; ri++) {
      const r = (ri / RINGS) * R;
      const per = Math.max(28, Math.floor(r * 0.85));
      const jitter = Math.random() * Math.PI * 2;
      for (let i = 0; i < per; i++) {
        const a = (i / per) * Math.PI * 2 + jitter;
        ringParticles.push({
          a,
          r,
          size: 0.5 + Math.random() * 0.45,
          baseAlpha: 0.1 + Math.random() * 0.22,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.4 + Math.random() * 1.0,
        });
      }
    }

    // Free-floating sparks for extra shimmer
    const sparks = [];
    for (let i = 0; i < 70; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = R * 0.28 + Math.random() * R * 0.78;
      sparks.push({
        a,
        r,
        size: 0.5 + Math.random() * 1.4,
        baseAlpha: 0.18 + Math.random() * 0.6,
        tw: Math.random() * Math.PI * 2,
        twSpeed: 0.8 + Math.random() * 2.2,
      });
    }

    let time = 0;
    let rot = 0;

    const dot = (p, rotDir, time) => {
      const a = p.a + rot * rotDir;
      const x = cx + Math.cos(a) * p.r;
      const y = cy + Math.sin(a) * p.r;
      const twinkle = 0.6 + 0.4 * Math.sin(time * p.twSpeed + p.tw);
      ctx.globalAlpha = Math.min(1, p.baseAlpha * twinkle);
      ctx.fillStyle = `rgba(${colorFor(p.r / R)}, 1)`;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.03;
      rot += 0.0015;

      // Soft supernova halo behind everything
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      halo.addColorStop(0, 'rgba(255, 178, 96, 0.34)');
      halo.addColorStop(0.16, 'rgba(255, 125, 45, 0.18)');
      halo.addColorStop(0.5, 'rgba(255, 95, 31, 0.06)');
      halo.addColorStop(1, 'rgba(255, 95, 31, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Brighter inner glow disc — the luminous galaxy core
      const inner = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.42);
      inner.addColorStop(0, 'rgba(255, 214, 150, 0.55)');
      inner.addColorStop(0.35, 'rgba(255, 150, 66, 0.28)');
      inner.addColorStop(1, 'rgba(255, 120, 40, 0)');
      ctx.fillStyle = inner;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.42, 0, Math.PI * 2);
      ctx.fill();

      // Radar rings (dotted particles)
      ringParticles.forEach((p) => dot(p, 1, time));
      // Radial spokes
      spokeParticles.forEach((p) => dot(p, 1, time));
      // Counter-rotating sparks
      sparks.forEach((p) => dot(p, -0.6, time));

      // Perimeter tick bezel + faint bounding rings
      ctx.save();
      ctx.translate(cx, cy);
      const TICKS = 72;
      for (let i = 0; i < TICKS; i++) {
        const a = (i / TICKS) * Math.PI * 2 + rot * 0.5;
        const major = i % 6 === 0;
        const r0 = R * 0.99;
        const r1 = r0 - (major ? 9 : 5);
        ctx.globalAlpha = major ? 0.5 : 0.2;
        ctx.strokeStyle = 'rgba(255, 95, 31, 1)';
        ctx.lineWidth = major ? 1.2 : 0.7;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
        ctx.lineTo(Math.cos(a) * r0, Math.sin(a) * r0);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.99, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.12;
      ctx.setLineDash([2, 7]);
      ctx.beginPath();
      ctx.arc(0, 0, R * 0.68, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Rotating sun-ray flare around the core
      ctx.save();
      ctx.translate(cx, cy);
      const RAYS = 44;
      for (let i = 0; i < RAYS; i++) {
        const a = (i / RAYS) * Math.PI * 2 - rot * 2.4;
        const major = i % 2 === 0;
        const len = 24 + (major ? 12 : 0) + Math.sin(time * 1.1 + i) * 4;
        ctx.globalAlpha = major ? 0.32 : 0.14;
        ctx.strokeStyle = 'rgba(255, 120, 40, 1)';
        ctx.lineWidth = major ? 1.1 : 0.6;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * 11, Math.sin(a) * 11);
        ctx.lineTo(Math.cos(a) * len, Math.sin(a) * len);
        ctx.stroke();
      }
      ctx.restore();

      // Fusion core
      const pulse = 1 + 0.06 * Math.sin(time * 1.6);
      const coreR = 22 * pulse;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.25, '#fff2d6');
      grad.addColorStop(0.55, '#ff8a2e');
      grad.addColorStop(0.85, '#e85d0a');
      grad.addColorStop(1, 'rgba(232, 93, 10, 0)');
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#ff7a1f';
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // White-hot centre
      ctx.beginPath();
      ctx.arc(cx, cy, 6 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ffffff';
      ctx.fill();
      ctx.shadowBlur = 0;

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

      {/* LEFT COLUMN: Hologram Globe */}
      <div className="hologram-viewport-column">
        <div className="hologram-viewport">
          {/* L-Brackets */}
          <div className="hud-frame-bracket top-left"></div>
          <div className="hud-frame-bracket top-right"></div>
          <div className="hud-frame-bracket bottom-left"></div>
          <div className="hud-frame-bracket bottom-right"></div>

          {/* 3D Globe Canvas */}
          <canvas ref={canvasRef} width={320} height={320} className="hologram-canvas" />

          {/* Bottom Framed J.A.R.V.I.S CORE Label */}
          <div className="hud-hologram-data-box">
            <span className="hud-data-title">J.A.R.V.I.S &nbsp; C O R E</span>
            <span className="hud-data-hz">2.85 GHz // FUSION_ACTIVE</span>
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
