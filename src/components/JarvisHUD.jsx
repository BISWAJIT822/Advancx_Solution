import React from 'react';
import NeuralCore from './NeuralCore';

// Framed viewport that houses the interactive 3D neural core
const JarvisHUD = () => {
  return (
    <div className="jarvis-split-layout">
      <div className="hologram-viewport-column">
        <div className="hologram-viewport">
          {/* Corner frame brackets */}
          <div className="hud-frame-bracket top-left"></div>
          <div className="hud-frame-bracket top-right"></div>
          <div className="hud-frame-bracket bottom-left"></div>
          <div className="hud-frame-bracket bottom-right"></div>

          {/* Real-time 3D neural core (Three.js / R3F) */}
          <div className="neural-core-stage">
            <NeuralCore />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JarvisHUD;
