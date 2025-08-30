import React from 'react';

interface CRTFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function CRTFrame({ children, className = "" }: CRTFrameProps) {
  return (
    <div className={`crt-frame ${className}`}>
      <div className="crt-screen">
        {children}
        <div className="scanlines" />
        <div className="crt-noise" />
        <div className="crt-glare" />
      </div>
    </div>
  );
}
