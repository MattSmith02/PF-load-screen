/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  RotateCw,
  Play,
  Pause,
  Sliders,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Zap,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { products, themes, progressSteps } from '../data';
import { Product, ThemeConfig, ThemeColor } from '../types';
import { EllipticalCarousel } from './EllipticalCarousel';

export const TechComparisonSandbox: React.FC = () => {
  // Carousel State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeColor>('blue');
  const [renderMode, setRenderMode] = useState<'render' | 'vector'>('render');
  const [speedSetting, setSpeedSetting] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [heroScale, setHeroScale] = useState(1.2);

  // Comparison Flow State
  const [product1, setProduct1] = useState<Product>(products[0]); // Macbook
  const [product2, setProduct2] = useState<Product>(products[1]); // Dell XPS
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonProgress, setComparisonProgress] = useState(0); // 0 to 100
  const [progressStepIdx, setProgressStepIdx] = useState(0);
  const [isComparisonCompleted, setIsComparisonCompleted] = useState(false);
  const [loaderMode, setLoaderMode] = useState<'classic' | 'nextgen' | 'crossover'>('crossover');

  // Auto-rotation Interval Ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const activeTheme = themes.find((t) => t.id === selectedThemeId) || themes[0];

  // Map speed to active pause durations (pause at hero) + transition time
  const getSpeedTiming = () => {
    switch (speedSetting) {
      case 'slow':
        return { pause: 2800, transition: 1600 };
      case 'fast':
        return { pause: 1200, transition: 700 };
      case 'normal':
      default:
        return { pause: 1800, transition: 1100 };
    }
  };

  const timing = getSpeedTiming();

  // Handle Automatic clockwise rotation loop with pauses
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (isPlaying) {
      const cycleTime = timing.pause + timing.transition;
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % 3);
      }, cycleTime);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, speedSetting, timing.pause, timing.transition]);

  // Comparison Loading Simulation
  const startComparison = () => {
    setIsComparing(true);
    setIsComparisonCompleted(false);
    setComparisonProgress(0);
    setProgressStepIdx(0);
    setIsPlaying(true); // Spin the carousel beautifully during loading!
  };

  useEffect(() => {
    if (!isComparing) return;

    let stepTimer: NodeJS.Timeout;
    const executeStep = (stepIndex: number) => {
      if (stepIndex >= progressSteps.length) {
        // Complete the comparison
        setComparisonProgress(100);
        setTimeout(() => {
          setIsComparing(false);
          setIsComparisonCompleted(true);
        }, 800);
        return;
      }

      setProgressStepIdx(stepIndex);
      const currentStep = progressSteps[stepIndex];
      const progressIncrement = 100 / progressSteps.length;

      // Animate progress smoothly
      const startProg = stepIndex * progressIncrement;
      const targetProg = (stepIndex + 1) * progressIncrement;
      let currentProg = startProg;

      const incrementInterval = setInterval(() => {
        currentProg += 1;
        if (currentProg >= targetProg) {
          clearInterval(incrementInterval);
        } else {
          setComparisonProgress(Math.min(currentProg, 100));
        }
      }, currentStep.duration / (progressIncrement));

      stepTimer = setTimeout(() => {
        clearInterval(incrementInterval);
        // Force-set to target step progress to be precise
        setComparisonProgress(Math.min(targetProg, 100));
        executeStep(stepIndex + 1);
      }, currentStep.duration);
    };

    executeStep(0);

    return () => {
      clearTimeout(stepTimer);
    };
  }, [isComparing]);

  // Manual Carousel controls
  const handleNext = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % 3);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + 3) % 3);
  };

  // Determine carousel products based on categories in active showcase
  // We can dynamically map the active items to represent Laptop, Phone, and Headphones
  // If the user selects a specific product 1 and product 2, we can customize the laptop/phone shown!
  const getCarouselProducts = (): Product[] => {
    const laptop = products.find(p => p.id === product1.id && p.category === 'laptop') || 
                   products.find(p => p.id === product2.id && p.category === 'laptop') ||
                   products.find(p => p.category === 'laptop')!;
    
    const phone = products.find(p => p.id === product1.id && p.category === 'phone') || 
                  products.find(p => p.id === product2.id && p.category === 'phone') ||
                  products.find(p => p.category === 'phone')!;

    const headphones = products.find(p => p.id === product1.id && p.category === 'headphones') || 
                       products.find(p => p.id === product2.id && p.category === 'headphones') ||
                       products.find(p => p.category === 'headphones')!;

    return [laptop, phone, headphones];
  };

  const carouselProducts = getCarouselProducts();

  // Generate mock intelligent AI comparison findings
  const getAIFindings = () => {
    if (product1.category !== product2.category) {
      return {
        winner: 'Cross-Category Mix',
        verdict: `You are comparing an premium ${product1.category} with a ${product2.category}. While both represent pinnacle tech in their categories, they serve fundamentally different purposes in your workflow.`,
        recommendation: `Opt for the ${product1.name} if your primary focus is ${product1.highlight}, or secure the ${product2.name} to emphasize ${product2.highlight}.`
      };
    }

    const score1 = product1.rating;
    const score2 = product2.rating;
    const p1PriceVal = parseInt(product1.price.replace(/[^0-9]/g, ''));
    const p2PriceVal = parseInt(product2.price.replace(/[^0-9]/g, ''));

    const isWinner1 = score1 > score2;
    const isBudget1 = p1PriceVal < p2PriceVal;

    let verdict = '';
    let winner = '';
    let recommendation = '';

    if (product1.category === 'laptop') {
      winner = isWinner1 ? product1.name : product2.name;
      verdict = `The ${product1.name} delivers exceptional performance with ${product1.highlight}. In comparison, the ${product2.name} stands out with ${product2.highlight}.`;
      recommendation = isBudget1
        ? `With a price of ${product1.price}, the ${product1.name} offers superior price-to-performance value, making it our top recommended pick for professionals.`
        : `At ${product2.price}, the ${product2.name} provides unmatched premium hardware quality, whereas the ${product1.name} remains the absolute performance king.`;
    } else if (product1.category === 'phone') {
      winner = isWinner1 ? product1.name : product2.name;
      verdict = `The ${product1.name} specializes in its professional camera features and premium ${product1.highlight.split(',')[1] || 'design'}. Meanwhile, the ${product2.name} excels with its versatile S-Pen and high-level AI computing.`;
      recommendation = `Choose the ${product1.name} if you are heavily invested in mobile photography and ecosystem synergy. Choose the ${product2.name} if you prioritize custom software utility and cutting-edge display clarity.`;
    } else {
      winner = isWinner1 ? product1.name : product2.name;
      verdict = `Evaluating the acoustic responses shows the ${product1.name} provides the most immersive and adaptive noise-cancelling environment. The ${product2.name} shines with pure structural material luxury and high-fidelity sound.`;
      recommendation = `Audiophiles demanding ultimate acoustic fidelity and premium metal architecture should lean toward the ${product2.name}. For continuous commuters looking for the lightest, smartest ANC experience, the ${product1.name} is the clear choice.`;
    }

    return { winner, verdict, recommendation };
  };

  const aiFindings = getAIFindings();

  // Render the classic circular progress loader from the screenshot
  const renderClassicSpinner = (customOpacity: number = 1, customScale: number = 1) => {
    return (
      <div 
        className="flex flex-col items-center justify-center space-y-6 py-12 transition-all duration-300"
        style={{ opacity: customOpacity, transform: `scale(${customScale})` }}
      >
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Light blue background circle */}
          <div className="absolute inset-0 bg-[#E7F0FF] rounded-full opacity-60" />
          {/* Dark blue thick spinner ring */}
          <svg className="animate-spin h-14 w-14 text-[#1F69FF]" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
        <p className="text-lg font-extrabold text-[#314158] font-sans tracking-tight">
          Analysing your shortlist...
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* 1. Header & Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '4s' }} />
          Premium UX Interaction Concept
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl font-sans">
          Orbital Loading Concept
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed font-sans font-light">
          An immersive 2.5D carousel animation built to enhance processing wait-times with fluid motion, depth-of-field, and physical volume.
        </p>
      </div>

      {/* 2. Main Live Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The Interactive Viewer Stage (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative bg-gradient-to-b from-slate-50 to-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/50 overflow-hidden flex flex-col items-center justify-between p-6 sm:p-10 min-h-[580px] transition-all duration-700">
            
            {/* Visual Glass Header on Stage */}
            <div className="w-full flex items-center justify-between z-10 border-b border-slate-100/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest font-mono">
                  Stage - {renderMode === 'render' ? 'Realistic 2.5D Renders' : 'Clean Vector Artwork'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100/60 p-1 rounded-lg border border-slate-200/40">
                <button
                  onClick={handlePrev}
                  className="p-1 hover:bg-white rounded-md text-slate-500 hover:text-slate-900 transition-all active:scale-95"
                  title="Previous Product"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-2.5 py-1 hover:bg-white rounded-md text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1 active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-slate-500" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" /> Rotate
                    </>
                  )}
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 hover:bg-white rounded-md text-slate-500 hover:text-slate-900 transition-all active:scale-95"
                  title="Next Product"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* --- CAROUSEL DISPLAY SPACE WITH MULTI-MODE CROSSOVER LOADERS --- */}
            <div className="w-full py-8 flex items-center justify-center overflow-visible min-h-[360px] relative">
              {!isComparing ? (
                /* Static view: active carousel control is displayed */
                <EllipticalCarousel
                  activeIndex={activeIndex}
                  theme={activeTheme}
                  mode={renderMode}
                  speedSetting={speedSetting}
                  heroScale={heroScale}
                  productsToShow={carouselProducts}
                  onProductClick={(clickedIdx) => {
                    setIsPlaying(false);
                    setActiveIndex(clickedIdx);
                  }}
                />
              ) : (
                /* Comparison view: custom loading mechanics */
                <div className="w-full flex items-center justify-center overflow-visible relative min-h-[360px]">
                  {/* Mode 1: Classic Spinner matching uploaded screenshot */}
                  {loaderMode === 'classic' && (
                    renderClassicSpinner()
                  )}

                  {/* Mode 2: Direct 2.5D Carousel running on active pedestals */}
                  {loaderMode === 'nextgen' && (
                    <EllipticalCarousel
                      activeIndex={activeIndex}
                      theme={activeTheme}
                      mode={renderMode}
                      speedSetting={speedSetting}
                      heroScale={heroScale}
                      productsToShow={carouselProducts}
                    />
                  )}

                  {/* Mode 3: Interactive Crossover Morph bridging classic spinner with 2.5D carousel */}
                  {loaderMode === 'crossover' && (
                    <>
                      {/* Transition Phase A: Classic Spinner fades out and scales up as progress moves beyond 30% */}
                      {comparisonProgress < 50 && (
                        <div
                          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                          style={{
                            opacity: comparisonProgress < 30 ? 1 : Math.max(0, 1 - (comparisonProgress - 30) / 15),
                            transform: `scale(${comparisonProgress < 30 ? 1 : 1 + (comparisonProgress - 30) / 30})`,
                          }}
                        >
                          {renderClassicSpinner()}
                        </div>
                      )}

                      {/* Transition Phase B: 2.5D Pedestal Carousel fades in and scales to normal size */}
                      {comparisonProgress >= 30 && (
                        <div
                          className="w-full flex items-center justify-center overflow-visible transition-all duration-500"
                          style={{
                            opacity: comparisonProgress >= 50 ? 1 : (comparisonProgress - 30) / 20,
                            transform: `scale(${comparisonProgress >= 50 ? 1 : 0.85 + 0.15 * ((comparisonProgress - 30) / 20)})`,
                          }}
                        >
                          <EllipticalCarousel
                            activeIndex={activeIndex}
                            theme={activeTheme}
                            mode={renderMode}
                            speedSetting={speedSetting}
                            heroScale={heroScale}
                            productsToShow={carouselProducts}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* --- BOTTOM PROGRESS INDICATOR ZONE --- */}
            <div className="w-full flex flex-col items-center space-y-4 z-10 pt-4 border-t border-slate-100/80">
              
              <AnimatePresence mode="wait">
                {isComparing ? (
                  /* Loading Ticker View */
                  <motion.div
                    key="comparing-status"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center space-y-3 w-full max-w-sm"
                  >
                    <div className="flex items-center gap-2">
                      <RotateCw className="w-4 h-4 text-blue-500 animate-spin" />
                      <span className="text-sm font-semibold text-slate-700 font-mono">
                        {progressSteps[progressStepIdx]?.label}
                      </span>
                    </div>
                    {/* Tiny smooth progress bar */}
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/30">
                      <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${comparisonProgress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  /* Standard Static/Idle Label View */
                  <motion.div
                    key="idle-status"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <p className="text-base font-semibold text-slate-700 tracking-wide">
                      Comparing your picks…
                    </p>
                    
                    {/* Dot Indicators */}
                    <div className="flex items-center gap-2">
                      {carouselProducts.map((_, idx) => {
                        const isCurrent = idx === activeIndex;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setIsPlaying(false);
                              setActiveIndex(idx);
                            }}
                            className={`h-2.5 rounded-full transition-all duration-500 ${
                              isCurrent
                                ? 'w-6'
                                : 'w-2.5 hover:bg-slate-300'
                            }`}
                            style={{
                              backgroundColor: isCurrent ? activeTheme.highlightColor : '#cbd5e1',
                            }}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Interactive Comparison Result Box (smoothly transitions in) */}
          <AnimatePresence>
            {isComparisonCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 space-y-6 overflow-hidden"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      Comparison Matrix Generated
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {product1.name} <span className="text-slate-400 font-light">vs</span> {product2.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsComparisonCompleted(false)}
                    className="px-3.5 py-1.5 hover:bg-slate-50 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-800 border border-slate-200/60 transition-all active:scale-95"
                  >
                    Clear Results
                  </button>
                </div>

                {/* Specs Matrix Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono w-1/3">
                          Specification
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-slate-700 w-1/3 bg-slate-50/50 rounded-t-xl">
                          {product1.name}
                        </th>
                        <th className="py-3 px-4 text-sm font-semibold text-slate-700 w-1/3">
                          {product2.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {/* Gather common specs keys or render dynamically */}
                      {Object.keys({ ...product1.specs, ...product2.specs }).map((specKey) => {
                        const val1 = product1.specs[specKey];
                        const val2 = product2.specs[specKey];
                        
                        // Simple highlighting helper
                        const isPrimaryP1 = val1 && (val1.includes('M3') || val1.includes('40-Core') || val1.includes('48GB') || val1.includes('22 Hours') || val1.includes('48MP') || val1.includes('8 Mics') || val1.includes('30 Hours'));
                        const isPrimaryP2 = val2 && (val2.includes('Ultra 9') || val2.includes('200MP') || val2.includes('20 Hours') || val2.includes('9 Mics'));

                        return (
                          <tr key={specKey} className="group hover:bg-slate-50/40 transition-colors">
                            <td className="py-3.5 px-4 text-sm font-semibold text-slate-500 font-mono">
                              {specKey}
                            </td>
                            <td className={`py-3.5 px-4 text-sm text-slate-600 bg-slate-50/20 ${isPrimaryP1 ? 'font-medium text-blue-600' : ''}`}>
                              {val1 || 'N/A'}
                            </td>
                            <td className={`py-3.5 px-4 text-sm text-slate-600 ${isPrimaryP2 ? 'font-medium text-violet-600' : ''}`}>
                              {val2 || 'N/A'}
                            </td>
                          </tr>
                        );
                      })}
                      
                      {/* Price row */}
                      <tr className="bg-slate-50/30">
                        <td className="py-4 px-4 text-sm font-bold text-slate-800 font-mono">
                          EST. RETAIL PRICE
                        </td>
                        <td className="py-4 px-4 text-lg font-bold text-blue-600 bg-slate-50/50">
                          {product1.price}
                        </td>
                        <td className="py-4 px-4 text-lg font-bold text-violet-600">
                          {product2.price}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Interactive Rating Score Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-700">{product1.name} Score</span>
                      <span className="font-mono font-bold text-blue-600">{product1.rating} / 5.0</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(product1.rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-700">{product2.name} Score</span>
                      <span className="font-mono font-bold text-violet-600">{product2.rating} / 5.0</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full"
                        style={{ width: `${(product2.rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Smart AI Verdict / Recommendation */}
                <div className="bg-gradient-to-r from-blue-500/5 to-violet-500/5 border border-slate-150 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse" />
                    AI Recommendation Engine
                  </div>
                  <div className="space-y-2 text-sm text-slate-600 leading-relaxed">
                    <p>{aiFindings.verdict}</p>
                    <p className="font-medium text-slate-800">{aiFindings.recommendation}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Right Column: Creative Customizer & Comparison Setup (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Comparison Trigger Form */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-100/50 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <Cpu className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-bold text-slate-800">
                Setup Comparison
              </h2>
            </div>

            {/* Product 1 Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Product A
              </label>
              <select
                value={product1.id}
                onChange={(e) => {
                  const selected = products.find((p) => p.id === e.target.value);
                  if (selected) setProduct1(selected);
                }}
                disabled={isComparing}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-50"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id} disabled={p.id === product2.id}>
                    {p.brand} - {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Product 2 Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Product B
              </label>
              <select
                value={product2.id}
                onChange={(e) => {
                  const selected = products.find((p) => p.id === e.target.value);
                  if (selected) setProduct2(selected);
                }}
                disabled={isComparing}
                className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-50"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id} disabled={p.id === product1.id}>
                    {p.brand} - {p.name} ({p.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Trigger Button */}
            <button
              onClick={startComparison}
              disabled={isComparing}
              className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 ${
                isComparing
                  ? 'bg-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
              }`}
            >
              <Zap className={`w-4 h-4 ${isComparing ? 'animate-bounce' : ''}`} />
              {isComparing ? 'Running Evaluation...' : 'Initiate Comparison'}
            </button>
            
            {product1.category !== product2.category && (
              <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg flex items-start gap-2 border border-amber-100">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p>
                  You are comparing products of different categories (e.g., {product1.category} vs {product2.category}). The matrix will resolve, but scores might be asymmetrical!
                </p>
              </div>
            )}
          </div>

          {/* Designer Sandbox Panel */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-100/50 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <Sliders className="w-5 h-5 text-slate-600" />
              <h2 className="text-lg font-bold text-slate-800">
                Aesthetics Sandbox
              </h2>
            </div>

            {/* Visual Rendering Style */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Visual Art Style
              </label>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-150">
                <button
                  onClick={() => setRenderMode('render')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    renderMode === 'render'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Realistic Renders (AI)
                </button>
                <button
                  onClick={() => setRenderMode('vector')}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    renderMode === 'vector'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Glassmorphic Vectors
                </button>
              </div>
            </div>

            {/* Comparison Loader Style Section */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Comparison Loader Style
              </label>
              <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-xl border border-slate-150">
                <button
                  onClick={() => setLoaderMode('classic')}
                  className={`py-2 text-[10px] font-bold rounded-lg transition-all ${
                    loaderMode === 'classic'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Show only the simple spinner from the mockup"
                >
                  Classic Only
                </button>
                <button
                  onClick={() => setLoaderMode('crossover')}
                  className={`py-2 text-[10px] font-bold rounded-lg transition-all ${
                    loaderMode === 'crossover'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Morph classic spinner into 2.5D Carousel dynamically"
                >
                  Crossover Morph
                </button>
                <button
                  onClick={() => setLoaderMode('nextgen')}
                  className={`py-2 text-[10px] font-bold rounded-lg transition-all ${
                    loaderMode === 'nextgen'
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Direct 2.5D Carousel loader"
                >
                  2.5D Direct
                </button>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed font-sans font-medium">
                {loaderMode === 'classic' && "Displays only the original, simple circular progress spinner from the design."}
                {loaderMode === 'crossover' && "Starts with the Classic Spinner, then dynamically expands & morphs into the 2.5D Pedestal!"}
                {loaderMode === 'nextgen' && "Uses the advanced, interactive 2.5D pedestal carousel loader directly."}
              </p>
            </div>

            {/* LED Pedestal Glow Presets */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Pedestal Illumination Color
              </label>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((t) => {
                  const isSel = t.id === selectedThemeId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedThemeId(t.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left flex items-center gap-2 transition-all active:scale-[0.97] ${
                        isSel
                          ? 'bg-slate-950 text-white border-slate-950'
                          : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100'
                      }`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full inline-block"
                        style={{ backgroundColor: t.highlightColor }}
                      />
                      {t.name.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rotation Speed Settings */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Carousel Rotation Speed
              </label>
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-150">
                {(['slow', 'normal', 'fast'] as const).map((spd) => {
                  const isSel = speedSetting === spd;
                  return (
                    <button
                      key={spd}
                      onClick={() => setSpeedSetting(spd)}
                      className={`py-1.5 text-xs font-bold rounded-lg capitalize transition-all ${
                        isSel
                          ? 'bg-white text-slate-800 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {spd}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Customizer Slider: Hero scale */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Hero Product Zoom Scale
                </label>
                <span className="text-xs font-bold text-slate-600 font-mono">
                  {Math.round(heroScale * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="1.4"
                step="0.05"
                value={heroScale}
                onChange={(e) => setHeroScale(parseFloat(e.target.value))}
                className="w-full accent-blue-600 h-1.5 bg-slate-100 rounded-full appearance-none cursor-pointer"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
