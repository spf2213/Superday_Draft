export const KNOWLEDGE_NODES = [
  // Central node
  { id: 'center', title: 'IB Interview', icon: 'target', x: 1500, y: 1000, central: true },
  
  // Main categories (ring 1) — spaced wide for pan/scroll
  { id: 'tech', title: 'Technical', icon: 'chart', x: 1500, y: 500, parent: 'center', cat: 'tech' },
  { id: 'beh', title: 'Behavioral', icon: 'chat', x: 2200, y: 800, parent: 'center', cat: 'beh' },
  { id: 'deal', title: 'Markets', icon: 'trending', x: 1500, y: 1500, parent: 'center', cat: 'deal' },
  { id: 'brain', title: 'Brain Teasers', icon: 'hash', x: 800, y: 800, parent: 'center', cat: 'brain' },
  
  // Technical subtopics (ring 2)
  { id: 'accounting', title: 'Accounting', icon: 'clipboard', x: 900, y: 300, parent: 'tech', sub: 'accounting' },
  { id: 'valuation', title: 'Valuation', icon: 'dollar', x: 1500, y: 200, parent: 'tech', sub: 'valuation' },
  { id: 'lbo', title: 'LBO', icon: 'building', x: 2100, y: 300, parent: 'tech', sub: 'lbo' },
  { id: 'ma-tech', title: 'M&A', icon: 'handshake', x: 2400, y: 500, parent: 'tech', sub: 'ma' },
  
  // Accounting topics (ring 3)
  { id: 'acc-fs', title: '3 Statements', icon: 'file', x: 500, y: 180, parent: 'accounting', sub: 'accounting' },
  { id: 'acc-wc', title: 'Working Capital', icon: 'refresh', x: 700, y: 100, parent: 'accounting', sub: 'accounting' },
  
  // Valuation topics (ring 3)
  { id: 'val-dcf', title: 'DCF', icon: 'calculator', x: 1200, y: 50, parent: 'valuation', sub: 'valuation' },
  { id: 'val-comps', title: 'Comps', icon: 'layers', x: 1500, y: 30, parent: 'valuation', sub: 'valuation' },
  { id: 'val-wacc', title: 'WACC', icon: 'scale', x: 1800, y: 50, parent: 'valuation', sub: 'valuation' },
  
  // LBO topics (ring 3)
  { id: 'lbo-model', title: 'LBO Model', icon: 'hash', x: 2400, y: 150, parent: 'lbo', sub: 'lbo' },
  { id: 'lbo-debt', title: 'Debt Structure', icon: 'scroll', x: 2550, y: 350, parent: 'lbo', sub: 'lbo' },
  
  // M&A topics (ring 3)
  { id: 'ma-process', title: 'M&A Process', icon: 'file', x: 2700, y: 450, parent: 'ma-tech', sub: 'ma' },
  { id: 'ma-accrdil', title: 'Accretion/Dilution', icon: 'scale', x: 2650, y: 650, parent: 'ma-tech', sub: 'ma' },
  
  // Brain Teaser topics (ring 2)
  { id: 'brain-market', title: 'Market Sizing', icon: 'globe', x: 400, y: 650, parent: 'brain', cat: 'brain' },
  { id: 'brain-math', title: 'Mental Math', icon: 'calculator', x: 350, y: 900, parent: 'brain', cat: 'brain' },
  { id: 'brain-logic', title: 'Logic Puzzles', icon: 'compass', x: 450, y: 1100, parent: 'brain', cat: 'brain' },
  
  // Behavioral topics (ring 2)
  { id: 'beh-fit', title: 'Why IB', icon: 'compass', x: 2550, y: 650, parent: 'beh', cat: 'beh' },
  { id: 'beh-team', title: 'Teamwork', icon: 'users', x: 2650, y: 850, parent: 'beh', cat: 'beh' },
  { id: 'beh-lead', title: 'Leadership', icon: 'award', x: 2550, y: 1050, parent: 'beh', cat: 'beh' },
  
  // Markets topics (ring 2)
  { id: 'macro', title: 'Macro', icon: 'globe', x: 1000, y: 1650, parent: 'deal', cat: 'deal' },
  { id: 'rates', title: 'Rates & Bonds', icon: 'barChart', x: 1500, y: 1750, parent: 'deal', cat: 'deal' },
  { id: 'deal-ib', title: 'IB Industry', icon: 'building', x: 2000, y: 1650, parent: 'deal', cat: 'deal' },
];
