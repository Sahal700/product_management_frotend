// ====================================================================
// I. CUSTOMER DATA
// ====================================================================
export const CUSTOMERS = [
  { id: 1, name: "Sunrise Bakery" },
  { id: 2, name: "City Snacks" },
  { id: 3, name: "Green Valley Cafe" },
  { id: 4, name: "Tech Corp Event Catering" },
];

// ====================================================================
// II. PRODUCTION CATALOG
// ====================================================================
// Note: price and cost are per unit.
export const PRODUCTIONS_CATALOG = [
  {
    id: 1,
    name: "Chocolate Cake (Small)",
    unit: "piece",
    price: 1200,
    cost: 650,
  },
  { id: 2, name: "Chicken Shawarma", unit: "piece", price: 250, cost: 140 },
  { id: 3, name: "Vegetable Biryani", unit: "kg", price: 450, cost: 280 },
  { id: 4, name: "Spring Roll", unit: "piece", price: 80, cost: 45 },
];

// ====================================================================
// III. ORDER STATUS OPTIONS
// ====================================================================
export const STATUS_OPTIONS = [
  { value: "request-material", label: "Request Material" },
  { value: "material-sent", label: "Material Sent" },
  { value: "material-received", label: "Material Received" },
  { value: "in-progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

// ====================================================================
// IV. MATERIALS CATALOG
// ====================================================================
// Note: unitPrice is cost per unit (e.g., cost per kg of Flour).
export const MATERIALS_CATALOG = [
  { id: 1, name: "Flour (All-purpose)", unit: "kg", unitPrice: 35, stock: 120 },
  { id: 2, name: "Sugar (Granulated)", unit: "kg", unitPrice: 40, stock: 80 },
  { id: 3, name: "Yeast (Dry)", unit: "pack", unitPrice: 150, stock: 30 },
  { id: 4, name: "Chicken (Breast)", unit: "kg", unitPrice: 700, stock: 50 },
  {
    id: 5,
    name: "Vegetable Mix (Frozen)",
    unit: "kg",
    unitPrice: 120,
    stock: 100,
  },
  { id: 6, name: "Cocoa Powder", unit: "kg", unitPrice: 450, stock: 50 },
];

// ====================================================================
// V. PRODUCTION RECIPES (KEY DATA FOR CALCULATION)
// ====================================================================
// Structure: { productionId: [ { materialId, quantity (per production unit) } ] }
export const PRODUCTION_RECIPES = {
  // 1: Chocolate Cake (Small) - requires Cocoa, Flour, Sugar
  1: [
    { materialId: 6, quantity: 0.15 }, // 0.15 kg Cocoa Powder
    { materialId: 1, quantity: 0.5 }, // 0.5 kg Flour
    { materialId: 2, quantity: 0.3 }, // 0.3 kg Sugar
  ],

  // 2: Chicken Shawarma - requires Chicken, Flour (for bread), Yeast
  2: [
    { materialId: 4, quantity: 0.15 }, // 0.15 kg Chicken
    { materialId: 1, quantity: 0.1 }, // 0.1 kg Flour
    { materialId: 3, quantity: 0.01 }, // 0.01 pack Yeast
  ],

  // 3: Vegetable Biryani - requires Vegetable Mix
  3: [
    { materialId: 5, quantity: 0.6 }, // 0.6 kg Vegetable Mix
  ],

  // 4: Spring Roll - requires Vegetable Mix, Flour (for wrapper)
  4: [
    { materialId: 5, quantity: 0.05 }, // 0.05 kg Vegetable Mix
    { materialId: 1, quantity: 0.03 }, // 0.03 kg Flour
  ],
};
