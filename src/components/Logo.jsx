import React from 'react';
import homeLogo from '../assets/home_logo.png';

const Logo = ({ variant = 'inline', className = '', height = 40 }) => {
  return (
    <div 
      className={`logo-container ${className}`} 
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <img
        src={homeLogo}
        alt="Advancx Solution Logo"
        style={{ 
          height: `${height}px`, 
          width: 'auto', 
          display: 'block', 
          objectFit: 'contain' 
        }}
      />
    </div>
  );
};

export default Logo;
