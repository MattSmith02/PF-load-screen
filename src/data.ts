import { Product, ThemeConfig } from './types';

// Let's reference our high-fidelity generated images
export const LAPTOP_IMAGE = '/src/assets/images/premium_laptop_render_1784643380578.jpg';
export const PHONE_IMAGE = '/src/assets/images/premium_phone_render_1784643397929.jpg';
export const HEADPHONES_IMAGE = '/src/assets/images/premium_headphones_render_1784643414610.jpg';

export const products: Product[] = [
  {
    id: 'macbook-pro',
    name: 'MacBook Pro 16" (M3 Max)',
    category: 'laptop',
    brand: 'Apple',
    image: LAPTOP_IMAGE,
    description: 'The ultimate pro laptop, packed with an incredible 16-core CPU, 40-core GPU, and up to 128GB of unified memory.',
    price: '$3,499',
    rating: 4.9,
    highlight: 'M3 Max chip, extreme battery life, liquid retina XDR display',
    specs: {
      'Processor': 'Apple M3 Max (16-Core)',
      'Graphics': '40-Core GPU (Hardware Ray Tracing)',
      'Memory': '48GB Unified RAM',
      'Storage': '1TB Superfast SSD',
      'Display': '16.2" Liquid Retina XDR (120Hz)',
      'Battery Life': 'Up to 22 Hours',
      'Weight': '4.8 lbs'
    }
  },
  {
    id: 'dell-xps-16',
    name: 'Dell XPS 16 (9640)',
    category: 'laptop',
    brand: 'Dell',
    image: LAPTOP_IMAGE,
    description: 'Sleek, minimalist design crafted from machined aluminum and glass, housing powerful Intel Core Ultra and NVIDIA RTX graphics.',
    price: '$2,899',
    rating: 4.6,
    highlight: 'InfinityEdge OLED panel, glass haptic trackpad, CNC metal design',
    specs: {
      'Processor': 'Intel Core Ultra 9 185H',
      'Graphics': 'NVIDIA GeForce RTX 4070 (60W)',
      'Memory': '32GB LPDDR5X',
      'Storage': '1TB NVMe PCIe 4.0 SSD',
      'Display': '16.3" 4K+ OLED Touch (90Hz)',
      'Battery Life': 'Up to 11 Hours',
      'Weight': '4.7 lbs'
    }
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro Max',
    category: 'phone',
    brand: 'Apple',
    image: PHONE_IMAGE,
    description: 'The first iPhone with an aerospace-grade titanium design, sporting the groundbreaking A17 Pro chip and a pro-class camera system.',
    price: '$1,199',
    rating: 4.8,
    highlight: 'A17 Pro chip, Grade-5 titanium chassis, 5x telephoto camera',
    specs: {
      'Processor': 'Apple A17 Pro (3nm)',
      'Display': '6.7" Super Retina XDR OLED (120Hz)',
      'Camera': '48MP Main + 12MP Ultra-wide + 12MP 5x Telephoto',
      'Battery': '4,441 mAh with USB-C 3.0',
      'Build': 'Titanium Frame, Ceramic Shield',
      'Storage': '256GB Base NVMe',
      'Weight': '221g'
    }
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    category: 'phone',
    brand: 'Samsung',
    image: PHONE_IMAGE,
    description: 'The peak of mobile tech integration with Galaxy AI, featuring a built-in S Pen, titanium armor, and a quad telephoto zoom setup.',
    price: '$1,299',
    rating: 4.7,
    highlight: 'Snapdragon 8 Gen 3, integrated S Pen, 200MP sensor, Galaxy AI',
    specs: {
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Display': '6.8" Dynamic AMOLED 2X (QHD+, 120Hz)',
      'Camera': '200MP Main + 50MP 5x Zoom + 10MP 3x Zoom + 12MP Wide',
      'Battery': '5,000 mAh (45W Fast Charging)',
      'Build': 'Titanium Frame, Gorilla Armor (Anti-reflective)',
      'Storage': '256GB Base UFS 4.0',
      'Weight': '232g'
    }
  },
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5',
    category: 'headphones',
    brand: 'Sony',
    image: HEADPHONES_IMAGE,
    description: 'Industry-leading noise cancellation engineered with two processors controlling eight microphones, creating pristine high-res audio.',
    price: '$398',
    rating: 4.8,
    highlight: 'Best-in-class ANC, multipoint connection, 30h battery, smart ambient controls',
    specs: {
      'Drivers': '30mm High-Compliance Drivers',
      'Microphones': '8 Mics (4 per side) with dual V1/QN1 processors',
      'Noise Cancelling': 'Industry-leading Auto NC Optimizer',
      'Battery Life': '30 Hours (ANC On) / 38 Hours (ANC Off)',
      'Connectivity': 'Bluetooth 5.2, Multipoint, LDAC High-Res',
      'Weight': '250g',
      'Special Features': 'Speak-to-Chat, Quick Access (Spotify), Touch Sensors'
    }
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max',
    category: 'headphones',
    brand: 'Apple',
    image: HEADPHONES_IMAGE,
    description: 'Over-ear headphones completely reimagined. From cushion to canopy, AirPods Max are designed for an uncompromising acoustic fit.',
    price: '$549',
    rating: 4.5,
    highlight: 'Anodized aluminum cups, custom mesh canopy, high-fidelity spatial audio',
    specs: {
      'Drivers': 'Apple-designed 40mm dynamic driver',
      'Microphones': '9 Mics overall (8 for ANC, 3 for voice pickup)',
      'Noise Cancelling': 'Active Noise Cancellation and Transparency Mode',
      'Battery Life': 'Up to 20 Hours with spatial audio',
      'Connectivity': 'Bluetooth 5.0, Apple H1 Headphone Chip',
      'Weight': '384.8g',
      'Special Features': 'Adaptive EQ, Spatial Audio with Dynamic Head Tracking'
    }
  }
];

export const themes: ThemeConfig[] = [
  {
    id: 'blue',
    name: 'Clean Blue (Apple/Linear)',
    primary: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    bgGradient: 'from-[#f2f6ff] via-[#fafbff] to-[#f4f7ff]',
    pedestalGlow: 'rgba(59, 130, 246, 0.5)',
    highlightColor: '#3b82f6'
  },
  {
    id: 'violet',
    name: 'Cosmic Violet (Stripe/Arc)',
    primary: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
    bgGradient: 'from-[#f6f2ff] via-[#fcfaff] to-[#f8f5ff]',
    pedestalGlow: 'rgba(139, 92, 246, 0.5)',
    highlightColor: '#8b5cf6'
  },
  {
    id: 'emerald',
    name: 'Prism Emerald (Nothing/Futuristic)',
    primary: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    bgGradient: 'from-[#f0fbf4] via-[#f9fdfa] to-[#f2fcf6]',
    pedestalGlow: 'rgba(16, 185, 129, 0.5)',
    highlightColor: '#10b981'
  },
  {
    id: 'amber',
    name: 'Sunset Amber (Warm Editorial)',
    primary: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    bgGradient: 'from-[#fefcf3] via-[#fffdf9] to-[#fffaf0]',
    pedestalGlow: 'rgba(245, 158, 11, 0.5)',
    highlightColor: '#f59e0b'
  }
];

export const progressSteps = [
  { label: 'Initializing comparison matrix...', duration: 1200 },
  { label: 'Fetching latest retail price points...', duration: 1400 },
  { label: 'Analyzing technical hardware specifications...', duration: 1600 },
  { label: 'Synthesizing verified expert reviews...', duration: 1500 },
  { label: 'Generating AI recommendation summary...', duration: 1300 }
];
