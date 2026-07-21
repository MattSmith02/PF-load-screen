/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ThemeConfig } from '../types';
import { CarouselPedestal } from './CarouselPedestal';
import { LaptopVector, PhoneVector, HeadphonesVector } from './ProductIllustrations';

interface CarouselProps {
  activeIndex: number;
  theme: ThemeConfig;
  mode: 'vector' | 'render';
  speedSetting: 'slow' | 'normal' | 'fast';
  heroScale: number;
  productsToShow: Product[];
  onProductClick?: (index: number) => void;
}

export const EllipticalCarousel: React.FC<CarouselProps> = ({
  activeIndex,
  theme,
  mode,
  speedSetting,
  heroScale,
  productsToShow,
  onProductClick,
}) => {
  // Ellipse geometry parameters
  const A = 270; // semi-major axis (horizontal offset width)
  const B = 45;  // semi-minor axis (vertical perspective slant height)

  // Configure spring/tween duration based on speed setting
  const getTransitionDuration = () => {
    switch (speedSetting) {
      case 'slow': return 1.6;
      case 'fast': return 0.7;
      case 'normal':
      default: return 1.1;
    }
  };

  const duration = getTransitionDuration();

  // Helper to render the product visual asset
  const renderProductAsset = (product: Product, isActive: boolean) => {
    if (mode === 'vector') {
      // Vector Mode: beautiful SVG illustration
      switch (product.category) {
        case 'laptop':
          return (
            <LaptopVector
              glowColor={theme.highlightColor}
              isActive={isActive}
              className="transform -translate-y-6 scale-[0.95]"
            />
          );
        case 'phone':
          return (
            <PhoneVector
              glowColor={theme.highlightColor}
              isActive={isActive}
              className="transform -translate-y-8 scale-100"
            />
          );
        case 'headphones':
        default:
          return (
            <HeadphonesVector
              glowColor={theme.highlightColor}
              isActive={isActive}
              className="transform -translate-y-6 scale-[1.05]"
            />
          );
      }
    } else {
      // Render Mode: high-fidelity pre-rendered AI image with clean white backdrop transparentized via mix-blend-mode multiply
      return (
        <div className="relative w-44 h-44 flex items-center justify-center transform -translate-y-10 mix-blend-multiply">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className={`w-40 h-40 object-contain select-none transition-all duration-700 mix-blend-multiply ${
              isActive ? 'brightness-105 contrast-105 scale-110' : 'brightness-95 contrast-95 scale-100'
            }`}
          />
        </div>
      );
    }
  };

  return (
    <div className="relative w-full h-[360px] flex items-center justify-center overflow-visible">
      
      {/* 2. Elliptical Motion Track Guidelines */}
      <div className="absolute w-[600px] h-[130px] flex items-center justify-center pointer-events-none overflow-visible">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 130"
          className="overflow-visible"
        >
          <ellipse
            cx="300"
            cy="65"
            rx={A}
            ry={B}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="5 5"
            className="opacity-45"
          />
          
          {/* Clockwise Directional Arrows on Track */}
          {/* Left Arrow (moving down/front) */}
          <path
            d="M 64 80 L 73 80 L 69 88 Z"
            fill="#94a3b8"
            className="opacity-60"
          />
          
          {/* Right Arrow (moving up/back) */}
          <path
            d="M 536 50 L 527 50 L 531 42 Z"
            fill="#94a3b8"
            className="opacity-60"
          />
        </svg>
      </div>

      {/* 3. Render Carousel Products on Pedestals */}
      <div className="absolute w-full h-full flex items-center justify-center overflow-visible">
        {productsToShow.map((product, index) => {
          // Continuous circular math:
          // We want the active index to be positioned at the front (bottom center: 90 degrees)
          // index 0 -> base angle offset 0
          // index 1 -> base angle offset 120
          // index 2 -> base angle offset 240
          // Base angle baseAngle = 90 - activeIndex * 120
          const itemAngleDeg = 90 + (index - activeIndex) * 120;
          const angleRad = (itemAngleDeg * Math.PI) / 180;

          // Compute X & Y coordinates on ellipse centered at (0, 0)
          const targetX = A * Math.cos(angleRad);
          // Y goes positive down on screen coordinates, so front (closest) should be bottom (positive Y)
          const targetY = B * Math.sin(angleRad);

          // depth parameter goes from 0 (farthest back, sin = -1) to 1 (closest front, sin = 1)
          const depth = (Math.sin(angleRad) + 1) / 2;

          // Determine if this item is currently the Front Hero
          const isHero = index === activeIndex;

          // Compute responsive sizes and opacity values based on depth
          const scale = isHero 
            ? heroScale 
            : 0.65 + (0.75 - 0.65) * depth; // side products scale down to 65%-75%

          const opacity = isHero
            ? 1.0
            : 0.65 + (0.75 - 0.65) * depth; // side products sit back, reduced to around 70% opacity

          const blurVal = isHero ? 0 : 2 - (2 * depth); // slight blur for depth-of-field
          
          const zIndex = Math.round(10 + depth * 20); // range 10-30

          return (
            <motion.div
              key={product.id}
              onClick={() => onProductClick && onProductClick(index)}
              className="absolute flex flex-col items-center justify-center cursor-pointer select-none group"
              style={{ originX: 0.5, originY: 0.8 }}
              animate={{
                x: targetX,
                y: targetY,
                scale: scale,
                opacity: opacity,
                zIndex: zIndex,
                filter: `blur(${blurVal}px)`,
              }}
              transition={{
                type: 'spring',
                stiffness: speedSetting === 'fast' ? 140 : speedSetting === 'slow' ? 35 : 70,
                damping: speedSetting === 'fast' ? 15 : speedSetting === 'slow' ? 10 : 13,
                mass: 0.8,
              }}
            >
              {/* Product Visual Layout (Pedestal + Product Asset) */}
              <div className="relative flex flex-col items-center justify-center overflow-visible">
                
                {/* 3D Product Float Wrapper */}
                <motion.div
                  animate={{
                    y: isHero ? [0, -10, 0] : [0, -4, 0],
                  }}
                  transition={{
                    duration: isHero ? 3 : 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className={`relative z-20 flex items-center justify-center overflow-visible ${
                    mode === 'render' ? 'mix-blend-multiply' : ''
                  }`}
                >
                  {renderProductAsset(product, isHero)}
                </motion.div>

                {/* 2.5D Pedestal Base */}
                <div className="absolute top-[35px] z-10">
                  <CarouselPedestal
                    glowColor={theme.highlightColor}
                    isActive={isHero}
                    scale={1}
                  />
                </div>

                {/* Micro reflection under pedestal for active hero */}
                {isHero && (
                  <div className="absolute -bottom-8 w-44 h-4 bg-white/20 rounded-full blur-md opacity-40 pointer-events-none" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
