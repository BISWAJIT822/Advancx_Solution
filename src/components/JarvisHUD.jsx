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

  // 3D Canvas Projection Globe Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const R = 92; // Globe Radius
    const fov = 300; // Perspective FOV
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    let angleY = 0; // Y axis rotation (spinning)
    let angleX = 0.22; // X axis tilt
    let time = 0;

    // Generate latitude rings
    const lats = [-60, -40, -20, 0, 20, 40, 60];
    const latRings = lats.map((latDeg) => {
      const lat = (latDeg * Math.PI) / 180;
      const y = R * Math.sin(lat);
      const r = R * Math.cos(lat);
      const points = [];
      for (let i = 0; i < 32; i++) {
        const theta = (i * 2 * Math.PI) / 32;
        points.push({ x: r * Math.cos(theta), y: y, z: r * Math.sin(theta) });
      }
      return points;
    });

    // Generate longitude slices
    const lons = [0, 30, 60, 90, 120, 150];
    const lonRings = lons.map((lonDeg) => {
      const lon = (lonDeg * Math.PI) / 180;
      const points = [];
      for (let i = 0; i < 32; i++) {
        const phi = (i * 2 * Math.PI) / 32;
        points.push({ x: R * Math.cos(phi) * Math.cos(lon), y: R * Math.sin(phi), z: R * Math.cos(phi) * Math.sin(lon) });
      }
      return points;
    });

    // Generate diagonal rings
    const diagRings = [
      { rx: 0.78, ry: 0.78 },
      { rx: -0.78, ry: -0.78 }
    ].map((rot) => {
      const points = [];
      for (let i = 0; i < 32; i++) {
        const theta = (i * 2 * Math.PI) / 32;
        let x1 = R * Math.cos(theta);
        let y1 = 0;
        let z1 = R * Math.sin(theta);
        let y2 = y1 * Math.cos(rot.rx) - z1 * Math.sin(rot.rx);
        let z2 = y1 * Math.sin(rot.rx) + z1 * Math.cos(rot.rx);
        let x3 = x1 * Math.cos(rot.ry) - y2 * Math.sin(rot.ry);
        let y3 = x1 * Math.sin(rot.ry) + y2 * Math.cos(rot.ry);
        points.push({ x: x3, y: y3, z: z2 });
      }
      return points;
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      angleY += 0.005;
      time += 0.04;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const drawables = [];

      const projectPoint = (p) => {
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const scale = fov / (fov + z2);
        return { x: cx + x1 * scale, y: cy + y2 * scale, z: z2 };
      };

      // Add latitude lines
      latRings.forEach((ring, ringIdx) => {
        const isEquator = lats[ringIdx] === 0;
        const projected = ring.map(projectPoint);
        for (let i = 0; i < projected.length; i++) {
          const p1 = projected[i];
          const p2 = projected[(i + 1) % projected.length];
          drawables.push({
            type: 'line',
            x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
            z: (p1.z + p2.z) / 2,
            dash: isEquator ? [3, 4] : [1, 5],
            color: 'var(--primary-color)',
            width: isEquator ? 1.5 : 0.8
          });
        }
      });

      // Add longitude lines
      lonRings.forEach((ring, ringIdx) => {
        const projected = ring.map(projectPoint);
        const isMainLon = lons[ringIdx] === 90;
        for (let i = 0; i < projected.length; i++) {
          const p1 = projected[i];
          const p2 = projected[(i + 1) % projected.length];
          drawables.push({
            type: 'line',
            x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
            z: (p1.z + p2.z) / 2,
            dash: isMainLon ? [4, 6] : [2, 8],
            color: isMainLon ? 'var(--primary-color)' : 'rgba(255, 95, 31, 0.45)',
            width: 0.8
          });
        }
      });

      // Add diagonal rings
      diagRings.forEach((ring, idx) => {
        const projected = ring.map(projectPoint);
        for (let i = 0; i < projected.length; i++) {
          const p1 = projected[i];
          const p2 = projected[(i + 1) % projected.length];
          drawables.push({
            type: 'line',
            x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
            z: (p1.z + p2.z) / 2,
            dash: idx === 0 ? [8, 4] : [1, 4],
            color: idx === 0 ? '#ff5f1f' : '#ff8c00',
            width: 1.0
          });
        }
      });

      // Add satellites
      const sat1Angle = time * 0.7;
      const sat1 = projectPoint({
        x: 130 * Math.cos(sat1Angle),
        y: 130 * Math.sin(sat1Angle) * Math.cos(0.52),
        z: 130 * Math.sin(sat1Angle) * Math.sin(0.52)
      });
      drawables.push({ type: 'point', x: sat1.x, y: sat1.y, z: sat1.z, color: '#ff5f1f', size: 3.5, glow: '#ff5f1f', glowRadius: 8 });

      const sat2Angle = -time * 0.45;
      const sat2 = projectPoint({
        x: 125 * Math.cos(sat2Angle) * Math.cos(0.78),
        y: 125 * Math.sin(sat2Angle),
        z: 125 * Math.cos(sat2Angle) * Math.sin(0.78)
      });
      drawables.push({ type: 'point', x: sat2.x, y: sat2.y, z: sat2.z, color: '#ffb03a', size: 3, glow: '#ffb03a', glowRadius: 10 });

      const sat3Angle = time * 0.25;
      const sat3 = projectPoint({
        x: 145 * Math.sin(sat3Angle) * Math.cos(1.0),
        y: 145 * Math.cos(sat3Angle),
        z: 145 * Math.sin(sat3Angle) * Math.sin(1.0)
      });
      drawables.push({ type: 'point', x: sat3.x, y: sat3.y, z: sat3.z, color: '#ffffff', size: 2.5, glow: '#ffffff', glowRadius: 6 });

      // Add Reactor Core
      drawables.push({ type: 'core', z: 0 });

      // Depth Sort
      drawables.sort((a, b) => b.z - a.z);

      // Render
      drawables.forEach((item) => {
        const depthVal = (item.z + R) / (2 * R);
        const alphaScale = Math.max(0.12, Math.min(1.0, 0.9 - depthVal * 0.72));
        const widthScale = Math.max(0.4, Math.min(2.5, 1.8 - depthVal * 1.3));

        if (item.type === 'line') {
          ctx.beginPath();
          ctx.moveTo(item.x1, item.y1);
          ctx.lineTo(item.x2, item.y2);
          ctx.strokeStyle = item.color;
          ctx.globalAlpha = alphaScale;
          ctx.lineWidth = item.width * widthScale;
          ctx.setLineDash(item.dash || []);
          ctx.stroke();
          ctx.setLineDash([]);
        } 
        else if (item.type === 'point') {
          ctx.beginPath();
          ctx.arc(item.x, item.y, item.size * widthScale, 0, 2 * Math.PI);
          ctx.shadowBlur = item.glowRadius;
          ctx.shadowColor = item.glow;
          ctx.fillStyle = item.color;
          ctx.globalAlpha = alphaScale;
          ctx.fill();
          ctx.shadowBlur = 0;
        } 
        else if (item.type === 'core') {
          const pulse = 1 + 0.08 * Math.sin(time * 1.5);
          const coreRadius = 24 * pulse;
          
          ctx.beginPath();
          ctx.arc(cx, cy, coreRadius, 0, 2 * Math.PI);
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
          grad.addColorStop(0, '#ffffff');
          grad.addColorStop(0.2, '#fffae8');
          grad.addColorStop(0.5, '#ff7c1f');
          grad.addColorStop(0.85, '#e65100');
          grad.addColorStop(1, 'transparent');
          
          ctx.fillStyle = grad;
          ctx.globalAlpha = 0.98;
          ctx.shadowBlur = 28;
          ctx.shadowColor = '#e65100';
          ctx.fill();
          ctx.shadowBlur = 0;
          
          ctx.beginPath();
          ctx.arc(cx, cy, 7 * pulse, 0, 2 * Math.PI);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ffffff';
          ctx.globalAlpha = 1.0;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      ctx.globalAlpha = 1.0;
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
