/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: 'laptop' | 'phone' | 'headphones' | 'watch' | 'camera';
  brand: string;
  image: string;
  specs: Record<string, string>;
  rating: number;
  price: string;
  highlight: string;
  description: string;
}

export type ThemeColor = 'blue' | 'violet' | 'emerald' | 'amber' | 'rose';

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  primary: string; // Tailwind class like "text-blue-500"
  bgGradient: string; // Tailwind class like "from-blue-50/50 to-indigo-50/30"
  pedestalGlow: string; // hex or box shadow color
  highlightColor: string; // hex
}

export interface ComparisonSession {
  p1: Product;
  p2: Product;
  status: 'idle' | 'loading' | 'completed';
  progressStep: number;
}
