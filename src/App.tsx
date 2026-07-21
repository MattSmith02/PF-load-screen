/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TechComparisonSandbox } from './components/TechComparisonSandbox';
import {
  Search,
  ArrowRight,
  TrendingUp,
  Cpu,
  Sparkles,
  Zap,
  Check,
  Award,
  Shield,
  ThumbsUp,
  Heart,
  Grid,
  MapPin,
  ChevronRight,
  Info,
  Layers,
  BookOpen,
  Volume2,
  Tv,
  Smartphone,
  Laptop
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('top high-end performance gadgets');

  // Custom mock editors representing the requested Tom's Guide team
  const editors = [
    {
      name: 'Mark Spoonauer',
      role: 'Global Editor in Chief',
      experience: '20 years in technology journalism',
      bgGrad: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Jane McGuire',
      role: 'Fitness Editor',
      experience: 'Fitness editor and avid runner',
      bgGrad: 'from-emerald-400 to-teal-600',
    },
    {
      name: 'Kate Kozuch',
      role: 'Wearables Editor',
      experience: 'Expert in wearables and smart home',
      bgGrad: 'from-amber-400 to-orange-500',
    },
    {
      name: 'Louis Ramirez',
      role: 'Deals Editor',
      experience: 'Deals editor and money-saving expert',
      bgGrad: 'from-rose-400 to-pink-600',
    },
    {
      name: 'Nick Pino',
      role: 'TV and AV Editor',
      experience: 'Expert in all things TV and AV',
      bgGrad: 'from-purple-500 to-violet-700',
    },
    {
      name: 'Mike Prospero',
      role: 'U.S. Editor in Chief',
      experience: 'Leading editorial tester and smart home lead',
      bgGrad: 'from-sky-400 to-blue-600',
    }
  ];

  return (
    <div className="min-h-screen bg-[#E7F0FF]/25 text-slate-800 flex flex-col justify-between overflow-x-hidden antialiased font-sans selection:bg-[#1F69FF]/10 selection:text-[#1F69FF]">
      
      {/* 1. TOM'S GUIDE WHITE HEADER */}
      <header className="bg-white border-b border-[#0F172B]/10 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[73px]">
            {/* Left Brand Area */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-slate-900 flex items-center gap-1 font-sans">
                  <span className="text-[#1F69FF] font-black uppercase">Tom's</span>
                  <span className="text-slate-800 uppercase font-light">guide</span>
                </span>
                <span className="text-[9px] font-extrabold tracking-widest text-[#64748B] uppercase font-sans">
                  Upgrade your life
                </span>
              </div>
            </div>

            {/* Middle Nav Search bar replica */}
            <div className="hidden md:flex items-center flex-grow max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search reviews, deals, & top picks..."
                  className="w-full text-xs bg-slate-50 border border-slate-200/80 rounded-full py-2 pl-9 pr-4 text-slate-700 outline-none focus:border-[#1F69FF] focus:bg-white transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
              </div>
            </div>

            {/* Right user/concept items */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Preview
              </span>
              <a
                href="#loader-demo"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1F69FF] hover:bg-[#1F69FF]/90 transition-all active:scale-95 shadow-md shadow-[#1F69FF]/10"
              >
                Jump to Loader <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. PRIMARY BLUE NAVIGATION BAR */}
      <nav className="bg-[#1F69FF] w-full text-white overflow-x-auto scrollbar-none z-40 sticky top-0 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[44px]">
          <div className="flex items-center gap-1 text-sm font-semibold whitespace-nowrap">
            {/* Simple SVG Home Button Icon */}
            <div className="px-3 py-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>

            {['Phones', 'TV & Audio', 'Entertainment', 'Computing', 'AI', 'Wellness', 'Home', 'Wordle & Games', 'Browse'].map((tab) => (
              <span
                key={tab}
                className={`px-3.5 py-2.5 rounded-lg text-[13px] hover:bg-white/10 cursor-pointer transition-colors ${
                  tab === 'Computing' || tab === 'TV & Audio' ? 'bg-white/10 font-bold' : ''
                }`}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Right Highlights */}
          <div className="hidden lg:flex items-center gap-2 whitespace-nowrap">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-900 bg-[#01FE9E] shadow-sm cursor-pointer hover:brightness-105 transition-all">
              Savings Squad
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-[#8C2B5E] shadow-sm cursor-pointer hover:brightness-105 transition-all">
              Forums
            </span>
          </div>
        </div>
      </nav>

      {/* 3. AFFILIATE DISCLOSURE */}
      <div className="w-full bg-slate-100/50 py-2.5 text-center px-4 border-b border-slate-200/40">
        <p className="text-xs font-medium text-[#45556C] flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          Prices update regularly and we use affiliate links. When you buy through links on our site, we may earn an affiliate commission.
        </p>
      </div>

      {/* 4. PRODUCT FINDER HERO SECTION */}
      <section className="bg-gradient-to-br from-[#1F69FF] via-[#356FF7] to-[#6B8EFF] text-white pt-10 pb-20 px-6 relative overflow-hidden">
        {/* Abstract background decorative circles */}
        <div className="absolute top-[-30px] right-[-30px] w-44 h-44 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute bottom-[20px] right-[100px] w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/80 bg-white/15 px-3 py-1 rounded-full border border-white/10">
              Lab-Validated Specifications
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white font-sans max-w-xl mx-auto leading-tight">
            Product Finder: Hardware Showcase
          </h1>
          
          <p className="text-sm md:text-base text-white/80 font-normal max-w-lg mx-auto leading-relaxed">
            Instantly compare high-end computing components, flagship mobile phones, and over-ear headphones. Guided by Tom's independent lab measurements.
          </p>

          {/* Ask AI Search bar replica */}
          <div className="max-w-2xl mx-auto relative bg-white/95 rounded-2xl p-2.5 shadow-2xl shadow-[#011533]/20 border border-white/20 flex items-center justify-between gap-3 text-slate-800">
            <div className="flex items-center gap-3 pl-2.5 flex-grow">
              <span className="p-2 rounded-lg bg-blue-100 text-[#1F69FF]">
                <Cpu className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-slate-700 outline-none text-sm font-semibold"
              />
            </div>
            <button className="bg-[#9BF7D0] text-[#011535] px-5 py-2.5 rounded-xl font-bold text-xs hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-bounce" />
              Ask AI
            </button>
          </div>

          {/* Quick search pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <button className="border border-white/30 hover:border-white text-white bg-white/5 hover:bg-white/15 px-4 py-1.5 rounded-full text-xs font-semibold transition-all">
              Best Laptops of 2026
            </button>
            <button className="bg-white text-[#1F69FF] px-4 py-1.5 rounded-full text-xs font-bold shadow-md shadow-[#1F69FF]/10 hover:brightness-105 transition-all">
              Top Picks: Smart Gear
            </button>
            <button className="border border-white/30 hover:border-white text-white bg-white/5 hover:bg-white/15 px-4 py-1.5 rounded-full text-xs font-semibold transition-all">
              ANC Headphone Benchmarks
            </button>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE LOADING STAGE / CAROUSEL MODULE */}
      <section id="loader-demo" className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-30 pb-16">
        {/* Core Frame card for the sandbox loader */}
        <div className="bg-white border border-slate-100 rounded-[32px] p-1.5 sm:p-2.5 shadow-2xl shadow-slate-200/80">
          <div className="bg-gradient-to-b from-slate-50 to-white rounded-[24px] p-6 sm:p-10 border border-slate-100 space-y-8">
            
            {/* Title / Description inside loader card */}
            <div className="text-center space-y-1.5 border-b border-slate-100 pb-6 max-w-md mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-[#1F69FF] bg-blue-50/80 border border-blue-100/30">
                <Layers className="w-3.5 h-3.5 text-blue-500" />
                2.5D Rotating Orbital Carousel
              </div>
              <h2 className="text-2xl font-black text-slate-800 font-sans tracking-tight">
                Analysing your shortlist…
              </h2>
              <p className="text-xs text-slate-400 font-medium font-sans">
                Rotate products, test lighting/shading, and explore specs comparison.
              </p>
            </div>

            {/* Sandbox Module Component */}
            <TechComparisonSandbox />

          </div>
        </div>
      </section>

      {/* 6. TRUST BADGING GRID SECTION (rgba(1, 254, 158, 0.1) background, border #011535) */}
      <section className="bg-[#01FE9E]/10 border-t border-[#01FE9E]/30 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Badges Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
            {/* Lab Tested */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-white text-emerald-800 shadow-md shadow-emerald-950/5 border border-emerald-100">
                <Award className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#011535] font-sans">
                  Lab Tested
                </h4>
                <p className="text-xs font-bold text-[#45556C] uppercase tracking-wider">
                  30,000+ per year
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  We measure benchmarks under rigorous laboratory conditions for true empirical proof.
                </p>
              </div>
            </div>

            {/* 100% Independent */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-white text-emerald-800 shadow-md shadow-emerald-950/5 border border-emerald-100">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#011535] font-sans">
                  100% Independent
                </h4>
                <p className="text-xs font-bold text-[#45556C] uppercase tracking-wider">
                  No affiliate bias
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Our reviews and editorial choices remain fully untethered to vendor arrangements.
                </p>
              </div>
            </div>

            {/* Peer Reviewed */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-white text-emerald-800 shadow-md shadow-emerald-950/5 border border-emerald-100">
                <ThumbsUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#011535] font-sans">
                  Peer Reviewed
                </h4>
                <p className="text-xs font-bold text-[#45556C] uppercase tracking-wider">
                  Multi-editor signoff
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Every star-rating is rigorously evaluated and signed off by senior editors.
                </p>
              </div>
            </div>
          </div>

          {/* Call to action */}
          <div className="shrink-0">
            <button className="border-2 border-[#011535] hover:bg-[#011535] hover:text-white text-[#011535] px-6 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-950/5">
              About Our Testing Methods
            </button>
          </div>

        </div>
      </section>

      {/* 7. EDITORS PROFILE CARDS SECTION ("Here's who makes Tom's Guide") */}
      <section className="bg-slate-50 py-16 px-6 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center md:text-left space-y-2">
            <h3 className="text-3xl font-black text-[#011535] font-sans tracking-tight">
              Here's who makes Tom's Guide
            </h3>
            <p className="text-sm text-slate-400 font-medium">
              A global team of award-winning hardware engineers, journalists, and active product experts.
            </p>
          </div>

          {/* Editors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {editors.map((editor) => (
              <div
                key={editor.name}
                className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col justify-between items-center text-center space-y-4"
              >
                {/* Custom Vector Avatar based on initials */}
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${editor.bgGrad} flex items-center justify-center text-white text-lg font-black tracking-tight shadow-md`}>
                    {editor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">✓</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {editor.name}
                  </h4>
                  <p className="text-[10px] font-bold text-[#1F69FF] uppercase tracking-wider">
                    {editor.role}
                  </p>
                </div>

                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  {editor.experience}
                </p>

                <button className="text-[10px] font-extrabold uppercase tracking-wider text-[#1F69FF] hover:text-blue-700 transition-colors pt-2 border-t border-slate-100 w-full">
                  Read Profile
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. BRIGHT BLUE MISSION CARD ("Your daily guide to the future") */}
      <section className="bg-[#1F69FF] text-white py-20 px-6 rounded-t-[48px] relative overflow-hidden">
        {/* Background grid details */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-white/10 border border-white/20">
              EST. 2007
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight font-sans">
              Your daily guide to the future.
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto font-light leading-relaxed">
              Tom's Guide is more than just reviews. We are a community of active technologists bringing real lab tests, deals, and recommendations straight to you.
            </p>
          </div>

          {/* Feature items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-blue-600/50 border border-white/20 p-6 rounded-2xl space-y-3 shadow-lg">
              <h4 className="text-lg font-bold">Independent</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                We buy our own retail units. No freebies, no bias. What we test matches exactly what you get.
              </p>
            </div>
            <div className="bg-blue-600/50 border border-white/20 p-6 rounded-2xl space-y-3 shadow-lg">
              <h4 className="text-lg font-bold">Scientific</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Lab-tested data backs our recommendations. Standardized benchmarking across all categories.
              </p>
            </div>
            <div className="bg-blue-600/50 border border-white/20 p-6 rounded-2xl space-y-3 shadow-lg">
              <h4 className="text-lg font-bold">Human</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Written by experts, not algorithms. Honest hands-on insights focused on real everyday utility.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 9. DETAILED FOOTER */}
      <footer className="bg-[#1F69FF] text-white/85 border-t border-white/10 pt-16 pb-12 px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Top text paragraph */}
          <p className="text-xs text-white/70 leading-relaxed max-w-4xl">
            Tom's Guide is part of Future US Inc, an international media group and leading digital publisher. We provide trusted technology product evaluations and buying recommendations through scientific benchmarks and daily news insights.
          </p>

          {/* Quick legal badge row */}
          <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-white/10 rounded-lg text-emerald-300">
                <Check className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Google News Preferred Technology Source
              </span>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition-all">
                GDPR Consent
              </span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 cursor-pointer transition-all">
                Manage Preferences
              </span>
            </div>
          </div>

          {/* Detailed Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-xs font-medium text-white/80">
            <div className="space-y-3">
              <h5 className="font-bold uppercase tracking-widest text-white/50 text-[10px]">Polices</h5>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">Terms and conditions</li>
                <li className="hover:text-white cursor-pointer">Privacy policy</li>
                <li className="hover:text-white cursor-pointer">Cookies policy</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="font-bold uppercase tracking-widest text-white/50 text-[10px]">Corporate</h5>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Advertise with us</li>
                <li className="hover:text-white cursor-pointer">About us</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="font-bold uppercase tracking-widest text-white/50 text-[10px]">Community</h5>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">Contact Future's experts</li>
                <li className="hover:text-white cursor-pointer">Forum guidelines</li>
                <li className="hover:text-white cursor-pointer">Accessibility statement</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h5 className="font-bold uppercase tracking-widest text-white/50 text-[10px]">Resources</h5>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">Archives</li>
                <li className="hover:text-white cursor-pointer">Coupons & deals</li>
                <li className="hover:text-white cursor-pointer">Sitemap</li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-3">
              <h5 className="font-bold uppercase tracking-widest text-white/50 text-[10px]">Ecosystem</h5>
              <div className="flex gap-2">
                <span className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white cursor-pointer transition-all">
                  <Smartphone className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white cursor-pointer transition-all">
                  <Laptop className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white cursor-pointer transition-all">
                  <Tv className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Copyright notice */}
          <div className="border-t border-white/10 pt-8 text-center md:text-left text-[11px] text-white/60 space-y-1">
            <p>© Future Publishing Limited Quay House, The Ambury, Bath BA1 1UA.</p>
            <p>All rights reserved. England and Wales company registration number 2008885.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
