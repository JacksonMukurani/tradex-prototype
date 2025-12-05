import React from 'react';

export const Logo: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background (Optional, usually handled by container) */}
      
      {/* T Shape / Intersecting X */}
      <path d="M20 20 H80 V35 H60 V80 H40 V35 H20 V20 Z" fill="white" />
      
      {/* X Diagonal Cut / Stylization to make it look like TX */}
      <path d="M60 50 L80 80 H65 L50 60" fill="white" />
      
      {/* Price Scale (Right) */}
      <rect x="90" y="20" width="4" height="2" fill="white" />
      <rect x="90" y="35" width="4" height="2" fill="white" />
      <rect x="90" y="50" width="4" height="2" fill="white" />
      <rect x="90" y="65" width="4" height="2" fill="white" />
      <rect x="90" y="80" width="4" height="2" fill="white" />

      {/* Time Scale (Bottom) */}
      <rect x="20" y="90" width="2" height="4" fill="white" />
      <rect x="35" y="90" width="2" height="4" fill="white" />
      <rect x="50" y="90" width="2" height="4" fill="white" />
      <rect x="65" y="90" width="2" height="4" fill="white" />
      <rect x="80" y="90" width="2" height="4" fill="white" />
    </svg>
  );
};