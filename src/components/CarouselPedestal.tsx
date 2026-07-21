/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PedestalProps {
  glowColor?: string; // hex color of LED ring, e.g. "#3b82f6"
  isActive?: boolean;
  scale?: number; // scale factor
  className?: string;
}

export const CarouselPedestal: React.FC<PedestalProps> = ({
  glowColor = '#3b82f6',
  isActive = false,
  scale = 1,
  className = '',
}) => {
  // We draw a gorgeous 2.5D cylinder pedestal with premium light reflections.
  return (
    <div
      className={`relative flex flex-col items-center justify-center pointer-events-none transition-all duration-700 ${className}`}
      style={{
        transform: `scale(${scale})`,
        width: '240px',
        height: '110px',
      }}
    >
      {/* 1. Ground soft ambient shadow beneath the entire pedestal */}
      <div
        className="absolute bottom-0 w-[190px] h-[30px] rounded-full blur-[14px] bg-black/10 transition-all duration-700"
        style={{
          transform: isActive ? 'scale(1.15) translateY(4px)' : 'scale(1) translateY(0px)',
          opacity: isActive ? 0.75 : 0.5,
        }}
      />

      {/* 3. The 3D Cylinder SVG */}
      <svg
        width="220"
        height="90"
        viewBox="0 0 220 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-md"
      >
        <defs>
          {/* Top Surface Specular/Gloss Gradient */}
          <linearGradient id="pedestalTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          {/* Pedestal Upper Side Plate Gradient */}
          <linearGradient id="pedestalSideUpper" x1="0" y1="0" x2="220" y2="0">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="15%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="85%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Pedestal Lower Side Plate Gradient */}
          <linearGradient id="pedestalSideLower" x1="0" y1="0" x2="220" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="15%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="85%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* LED Ring Gradient - creates localized hot spot in center front */}
          <linearGradient id="ledGlowRing" x1="0" y1="0" x2="220" y2="0">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.4" />
          </linearGradient>

          {/* Subtle top edge specular light stroke */}
          <linearGradient id="edgeStroke" x1="0" y1="0" x2="0" y2="90">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ================= CYLINDER LAYER 1: BASE/LOWER SEGMENT ================= */}
        {/* Curved Side Wall of Lower Segment */}
        <path
          d="M 15 55 L 15 70 C 15 82.5, 205 82.5, 205 70 L 205 55"
          fill="url(#pedestalSideLower)"
        />
        {/* Lid of Lower Segment */}
        <ellipse cx="110" cy="55" rx="95" ry="15" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.5" />

        {/* ================= CYLINDER LAYER 2: LED ILLUMINATION RING ================= */}
        {/* Glow Band Side Wall */}
        <path
          d="M 15 45 L 15 55 C 15 67.5, 205 67.5, 205 55 L 205 45"
          fill="url(#ledGlowRing)"
          className="transition-all duration-700"
          style={{ opacity: isActive ? 1 : 0.65 }}
        />
        {/* Active Laser Line on LED Ring (super thin bright center line) */}
        <path
          d="M 15 50 C 15 62.5, 205 62.5, 205 50"
          stroke="#ffffff"
          strokeWidth={isActive ? '1.5' : '0.75'}
          strokeOpacity={isActive ? '0.95' : '0.6'}
          className="transition-all duration-700"
          fill="none"
        />

        {/* ================= CYLINDER LAYER 3: TOP CAP SEGMENT ================= */}
        {/* Curved Side Wall of Upper Segment */}
        <path
          d="M 15 20 L 15 45 C 15 57.5, 205 57.5, 205 45 L 205 20"
          fill="url(#pedestalSideUpper)"
        />

        {/* Flat Top Surface (where product sits) */}
        <ellipse cx="110" cy="20" rx="95" ry="15" fill="url(#pedestalTop)" />

        {/* Clean Specular Highlight Ring on top-most edge */}
        <ellipse
          cx="110"
          cy="20"
          rx="95"
          ry="15"
          stroke="url(#edgeStroke)"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  );
};
