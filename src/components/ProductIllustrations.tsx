/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface IllustrationProps {
  glowColor?: string;
  className?: string;
  isActive?: boolean;
}

export const LaptopVector: React.FC<IllustrationProps> = ({
  glowColor = '#3b82f6',
  className = '',
  isActive = false,
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width="220"
        height="150"
        viewBox="0 0 220 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl filter transition-all duration-700"
      >
        <defs>
          {/* Bezel Gradient */}
          <linearGradient id="laptopBezel" x1="0" y1="0" x2="0" y2="100">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          {/* Screen Display Gradient */}
          <linearGradient id="laptopScreen" x1="0" y1="0" x2="220" y2="150">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          {/* Screen Wave Gradient */}
          <linearGradient id="laptopWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
          {/* Shell Aluminum Gradient */}
          <linearGradient id="aluminumShell" x1="0" y1="0" x2="220" y2="0">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="25%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          {/* Base Reflection */}
          <linearGradient id="baseReflect" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* --- LAPTOP DISPLAY (Tilted back slightly) --- */}
        <g className="transition-transform duration-500">
          {/* Outer Metal Shell Backing */}
          <rect
            x="24"
            y="10"
            width="172"
            height="102"
            rx="8"
            fill="url(#aluminumShell)"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />

          {/* Glossy Bezel */}
          <rect x="27" y="13" width="166" height="96" rx="5" fill="url(#laptopBezel)" />

          {/* Glowing Active Display */}
          <rect x="31" y="17" width="158" height="88" rx="2" fill="url(#laptopScreen)" />

          {/* Premium Abstract Wallpaper Patterns (Waves) */}
          <path
            d="M 31 105 Q 70 70 120 85 T 189 30 L 189 105 Z"
            fill="url(#laptopWave)"
            className="animate-pulse"
            style={{ animationDuration: '6s' }}
          />
          <path
            d="M 31 105 Q 100 50 150 90 T 189 60 L 189 105 Z"
            fill="#93c5fd"
            fillOpacity="0.15"
          />

          {/* Camera Notch/Island */}
          <rect x="104" y="13" width="12" height="4" rx="2" fill="#000000" />
          <circle cx="110" cy="15" r="1" fill="#1e293b" />
        </g>

        {/* --- LAPTOP LOWER BASE --- */}
        {/* Hinge Joint */}
        <rect x="55" y="111" width="110" height="6" rx="2" fill="#475569" />

        {/* Machine Base Profile */}
        <path
          d="M 12 116 L 208 116 L 198 134 Q 196 137 192 137 L 28 137 Q 24 137 22 134 Z"
          fill="url(#aluminumShell)"
          stroke="#94a3b8"
          strokeWidth="1"
        />

        {/* Shiny polished chamfered edge */}
        <path
          d="M 12 116 L 208 116 L 204 119 L 16 119 Z"
          fill="#ffffff"
          fillOpacity="0.8"
        />

        {/* Keyboard Recess */}
        <path
          d="M 32 119 L 188 119 L 182 128 L 38 128 Z"
          fill="#0f172a"
          fillOpacity="0.9"
        />

        {/* Individual keyboard rows (visual layout representation) */}
        <line x1="38" y1="122" x2="182" y2="122" stroke="#334155" strokeWidth="1" />
        <line x1="40" y1="125" x2="180" y2="125" stroke="#334155" strokeWidth="1" />

        {/* Haptic Trackpad Outline */}
        <rect x="94" y="130" width="32" height="6" rx="1.5" fill="#e2e8f0" fillOpacity="0.3" stroke="#94a3b8" strokeWidth="0.5" />

        {/* Front Opening Lip */}
        <path d="M 100 116 L 120 116 L 118 118 L 102 118 Z" fill="#475569" />
      </svg>
    </div>
  );
};

export const PhoneVector: React.FC<IllustrationProps> = ({
  glowColor = '#3b82f6',
  className = '',
  isActive = false,
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width="110"
        height="160"
        viewBox="0 0 110 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl filter transition-all duration-700"
      >
        <defs>
          <linearGradient id="phoneFrame" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="phoneScreen" x1="0" y1="0" x2="0" y2="160">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          <linearGradient id="phoneWave" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Outer Titanium Frame */}
        <rect
          x="12"
          y="8"
          width="86"
          height="144"
          rx="18"
          fill="url(#phoneFrame)"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />

        {/* Black Bezel Display Border */}
        <rect x="15" y="11" width="80" height="138" rx="15" fill="#090d16" />

        {/* OLED Screen */}
        <rect x="18" y="14" width="74" height="132" rx="12" fill="url(#phoneScreen)" />

        {/* Screen Wave Details */}
        <path
          d="M 18 146 Q 40 100 70 120 T 92 60 L 92 146 Z"
          fill="url(#phoneWave)"
          className="animate-pulse"
          style={{ animationDuration: '5s' }}
        />

        {/* Dynamic Island Notch */}
        <rect x="42" y="19" width="26" height="8" rx="4" fill="#000000" />
        <circle cx="62" cy="23" r="1.5" fill="#1e293b" />

        {/* Highlight glare overlay */}
        <path
          d="M 18 20 L 18 100 Q 50 40 92 20 Z"
          fill="#ffffff"
          fillOpacity="0.08"
        />

        {/* Side Button Accents */}
        <rect x="10" y="35" width="2" height="12" rx="1" fill="#94a3b8" />
        <rect x="10" y="52" width="2" height="16" rx="1" fill="#94a3b8" />
        <rect x="10" y="72" width="2" height="16" rx="1" fill="#94a3b8" />
        <rect x="98" y="45" width="2" height="20" rx="1" fill="#94a3b8" />
      </svg>
    </div>
  );
};

export const HeadphonesVector: React.FC<IllustrationProps> = ({
  glowColor = '#3b82f6',
  className = '',
  isActive = false,
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl filter transition-all duration-700"
      >
        <defs>
          <linearGradient id="headbandGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="cupGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="padGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* --- HEADBAND ARCH --- */}
        {/* Outer Cushion */}
        <path
          d="M 28 85 C 28 35, 122 35, 122 85"
          stroke="url(#headbandGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        {/* Inner Arch Support Structure */}
        <path
          d="M 24 85 C 24 30, 126 30, 126 85"
          stroke="#64748b"
          strokeWidth="2"
          fill="none"
        />

        {/* Metal Sizing Adjuster Bars */}
        <rect x="22" y="75" width="4" height="20" rx="1" fill="#cbd5e1" />
        <rect x="124" y="75" width="4" height="20" rx="1" fill="#cbd5e1" />

        {/* Pivot Hinge Mounts */}
        <rect x="18" y="90" width="12" height="14" rx="3" fill="#475569" />
        <rect x="120" y="90" width="12" height="14" rx="3" fill="#475569" />

        {/* --- LEFT EAR CUP --- */}
        <g>
          {/* Main Ear Cup Body */}
          <rect
            x="10"
            y="98"
            width="28"
            height="42"
            rx="14"
            fill="url(#cupGrad)"
            stroke="#475569"
            strokeWidth="1"
          />
          {/* Inner Cushion Padding */}
          <rect
            x="32"
            y="102"
            width="8"
            height="34"
            rx="4"
            fill="url(#padGrad)"
          />
          {/* Metallic Pivot Dial */}
          <circle cx="24" cy="119" r="4" fill="#94a3b8" />
        </g>

        {/* --- RIGHT EAR CUP --- */}
        <g>
          {/* Main Ear Cup Body */}
          <rect
            x="112"
            y="98"
            width="28"
            height="42"
            rx="14"
            fill="url(#cupGrad)"
            stroke="#475569"
            strokeWidth="1"
          />
          {/* Inner Cushion Padding */}
          <rect
            x="110"
            y="102"
            width="8"
            height="34"
            rx="4"
            fill="url(#padGrad)"
          />
          {/* Metallic Pivot Dial */}
          <circle cx="126" cy="119" r="4" fill="#94a3b8" />
        </g>

        {/* Sleek metallic connection cable (subtle arc) */}
        <path
          d="M 38 130 Q 75 142 112 130"
          stroke="#1e293b"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
