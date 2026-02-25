export const MINI_CASES = [
  {
    id: 'dcf-quick',
    type: 'DCF',
    title: 'Quick DCF Valuation',
    desc: 'Calculate Enterprise Value given projected cash flows and WACC.',
    time: '5 min',
    difficulty: 1,
    scenario: 'A company has projected Free Cash Flows of $100M in Year 1, growing at 5% annually. WACC is 10%. The terminal growth rate is 2%. Calculate the Enterprise Value.',
    data: [
      { label: 'Year 1 FCF', value: '$100M' },
      { label: 'FCF Growth', value: '5%' },
      { label: 'WACC', value: '10%' },
      { label: 'Terminal Growth', value: '2%' }
    ],
    inputs: [
      { id: 'y1_pv', label: 'Year 1 FCF PV', answer: 91, unit: '$M', hint: '100 / 1.10' },
      { id: 'y2_pv', label: 'Year 2 FCF PV', answer: 87, unit: '$M', hint: '105 / 1.10²' },
      { id: 'y3_pv', label: 'Year 3 FCF PV', answer: 83, unit: '$M', hint: '110.25 / 1.10³' },
      { id: 'tv', label: 'Terminal Value (Y3)', answer: 1406, unit: '$M', hint: 'Y4 FCF / (WACC - g)' },
      { id: 'tv_pv', label: 'PV of Terminal Value', answer: 1056, unit: '$M', hint: 'TV / 1.10³' },
      { id: 'ev', label: 'Enterprise Value', answer: 1317, unit: '$M', hint: 'Sum of all PVs' }
    ]
  },
  {
    id: 'accretion',
    type: 'M&A',
    title: 'Accretion/Dilution Analysis',
    desc: 'Determine if a proposed acquisition is accretive or dilutive to EPS.',
    time: '7 min',
    difficulty: 2,
    scenario: 'Acquirer has 100M shares, $500M Net Income (EPS = $5.00). Target has $50M Net Income. Purchase price is $750M, all stock deal at $25/share. Cost of debt is 5%, tax rate 25%.',
    data: [
      { label: 'Acquirer Shares', value: '100M' },
      { label: 'Acquirer Net Income', value: '$500M' },
      { label: 'Target Net Income', value: '$50M' },
      { label: 'Purchase Price', value: '$750M' }
    ],
    inputs: [
      { id: 'new_shares', label: 'New Shares Issued', answer: 30, unit: 'M', hint: '$750M / $25' },
      { id: 'total_shares', label: 'Total Shares Post-Deal', answer: 130, unit: 'M', hint: '100 + 30' },
      { id: 'combined_ni', label: 'Combined Net Income', answer: 550, unit: '$M', hint: '500 + 50' },
      { id: 'new_eps', label: 'Pro Forma EPS', answer: 4.23, unit: '$', hint: '550 / 130', tolerance: 0.05 },
      { id: 'accretive', label: 'Accretive (1) or Dilutive (0)?', answer: 0, unit: '', hint: 'Compare to $5.00' }
    ]
  },
  {
    id: 'lbo-returns',
    type: 'LBO',
    title: 'LBO Returns Calculation',
    desc: 'Calculate IRR and MOIC for a leveraged buyout.',
    time: '8 min',
    difficulty: 2,
    scenario: 'PE firm acquires company for $500M at 8x EBITDA ($62.5M EBITDA). Uses 60% debt, 40% equity. After 5 years, exits at 9x EBITDA. EBITDA grows to $85M. Debt is paid down to $150M.',
    data: [
      { label: 'Entry Price', value: '$500M' },
      { label: 'Entry EBITDA', value: '$62.5M' },
      { label: 'Entry Multiple', value: '8.0x' },
      { label: 'Equity Check', value: '$200M (40%)' }
    ],
    inputs: [
      { id: 'exit_ev', label: 'Exit Enterprise Value', answer: 765, unit: '$M', hint: '85 × 9' },
      { id: 'exit_equity', label: 'Exit Equity Value', answer: 615, unit: '$M', hint: '765 - 150 debt' },
      { id: 'moic', label: 'MOIC (Multiple on Invested Capital)', answer: 3.08, unit: 'x', hint: '615 / 200', tolerance: 0.05 },
      { id: 'irr', label: 'Approx. IRR', answer: 25, unit: '%', hint: '~25% for 3x in 5 years', tolerance: 3 }
    ]
  },
  {
    id: 'wacc-calc',
    type: 'Valuation',
    title: 'WACC Calculation',
    desc: 'Calculate Weighted Average Cost of Capital from components.',
    time: '4 min',
    difficulty: 1,
    scenario: 'Company has $400M equity (market value) and $100M debt. Cost of equity is 12%, cost of debt is 6%, tax rate is 25%.',
    data: [
      { label: 'Equity Value', value: '$400M' },
      { label: 'Debt Value', value: '$100M' },
      { label: 'Cost of Equity', value: '12%' },
      { label: 'Cost of Debt', value: '6%' }
    ],
    inputs: [
      { id: 'total_cap', label: 'Total Capital', answer: 500, unit: '$M', hint: '400 + 100' },
      { id: 'equity_weight', label: 'Equity Weight', answer: 80, unit: '%', hint: '400 / 500' },
      { id: 'debt_weight', label: 'Debt Weight', answer: 20, unit: '%', hint: '100 / 500' },
      { id: 'after_tax_debt', label: 'After-Tax Cost of Debt', answer: 4.5, unit: '%', hint: '6% × (1 - 25%)' },
      { id: 'wacc', label: 'WACC', answer: 10.5, unit: '%', hint: '(80% × 12%) + (20% × 4.5%)', tolerance: 0.2 }
    ]
  }
];
