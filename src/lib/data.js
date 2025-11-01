// ====================================================================
// I. CUSTOMER DATA
// ====================================================================
export const CUSTOMERS = [
  {
    id: 1,
    name: "Sunrise Bakery",
    phone: "+1 555-123-4567",
    email: "contact@sunrise.example",
    address: "12 Market St, Springfield",
  },
  {
    id: 2,
    name: "City Snacks",
    phone: "+1 555-987-6543",
    email: "hello@citysnacks.example",
    address: "45 Elm Ave, Riverdale",
  },
  {
    id: 3,
    name: "Sweet Crust Café",
    phone: "+1 555-222-3344",
    email: "orders@sweetcrust.example",
    address: "78 Maple Road, Brookfield",
  },
  {
    id: 4,
    name: "Golden Oven",
    phone: "+1 555-441-7788",
    email: "sales@goldenoven.example",
    address: "10 Baker Street, Hillview",
  },
  {
    id: 5,
    name: "Delight Pastry Corner",
    phone: "+1 555-667-2233",
    email: "info@delightpastry.example",
    address: "22 Cherry Lane, Willowbrook",
  },
  {
    id: 6,
    name: "Crumb & Co.",
    phone: "+1 555-981-1122",
    email: "hello@crumbco.example",
    address: "56 Pine Street, Lakeside",
  },
  {
    id: 7,
    name: "BakeHouse Express",
    phone: "+1 555-777-9090",
    email: "orders@bakehouseexpress.example",
    address: "89 Orchard Avenue, Riverview",
  },
];

export const SUPPLIERS = [
  {
    id: 1,
    name: "Fresh Harvest Foods",
    phone: "+91 91234 56780",
    email: "sales@freshharvest.com",
    address: "Industrial Estate, Aluva, Kochi",
  },
  {
    id: 2,
    name: "Bakewell Supplies",
    phone: "+91 93456 78123",
    email: "support@bakewellsupplies.com",
    address: "Baker’s Lane, Thrissur",
  },
  {
    id: 3,
    name: "Spice Route Traders",
    phone: "+91 99876 54321",
    email: "contact@spiceroute.in",
    address: "MG Road, Calicut",
  },
  {
    id: 4,
    name: "Golden Grains Distributors",
    phone: "+91 90123 45678",
    email: "info@goldengrains.in",
    address: "Trade Center, Ernakulam",
  },
  {
    id: 5,
    name: "Pure Oils & Essentials",
    phone: "+91 94477 11223",
    email: "order@pureoils.com",
    address: "Kadavanthra, Kochi",
  },
  {
    id: 6,
    name: "Royal Dairy & Farm Products",
    phone: "+91 95555 33445",
    email: "sales@royaldairy.in",
    address: "NH Bypass, Palakkad",
  },
  {
    id: 7,
    name: "Oceanic Packaging Co.",
    phone: "+91 96222 77889",
    email: "info@oceanicpackaging.com",
    address: "Port Road, Cochin",
  },
];

export const ORDERS = [
  {
    id: 1,
    customer: { id: 1, name: "KK Supermart" },
    deliveryDate: "2025-11-05",
    orderNumber: "OD-001",
    productions: [
      { id: 1, name: "Chocolate Cake", quantity: 5, price: 1200 },
      { id: 2, name: "Chicken Shawarma", quantity: 50, price: 250 },
    ],
    totalPrice: 18500,
    totalCost: 10250,
    status: "in-progress",
  },
  {
    id: 2,
    customer: { id: 2, name: "ABC Supermart" },
    deliveryDate: "2025-11-08",
    orderNumber: "OD-002",
    productions: [{ id: 1, name: "Chocolate Cake", quantity: 10, price: 1200 }],
    totalPrice: 12000,
    totalCost: 6500,
    status: "request-material",
  },
  {
    id: 3,
    customer: { id: 3, name: "Fresh Mart" },
    deliveryDate: "2025-11-10",
    orderNumber: "OD-003",
    productions: [{ id: 4, name: "Spring Roll", quantity: 100, price: 80 }],
    totalPrice: 8000,
    totalCost: 4500,
    status: "material-received",
  },
  {
    id: 4,
    customer: { id: 4, name: "Urban Bites" },
    deliveryDate: "2025-11-12",
    orderNumber: "OD-004",
    productions: [
      { id: 3, name: "Vegetable Biryani", quantity: 40, price: 180 },
      { id: 2, name: "Chicken Shawarma", quantity: 30, price: 250 },
    ],
    totalPrice: 14700,
    totalCost: 8200,
    status: "in-progress",
  },
  {
    id: 5,
    customer: { id: 5, name: "Metro Delights" },
    deliveryDate: "2025-11-15",
    orderNumber: "OD-005",
    productions: [{ id: 4, name: "Spring Roll", quantity: 200, price: 75 }],
    totalPrice: 15000,
    totalCost: 8200,
    status: "completed",
  },
  {
    id: 6,
    customer: { id: 6, name: "Taste Corner" },
    deliveryDate: "2025-11-18",
    orderNumber: "OD-006",
    productions: [
      { id: 1, name: "Chocolate Cake", quantity: 8, price: 1200 },
      { id: 3, name: "Vegetable Biryani", quantity: 30, price: 180 },
    ],
    totalPrice: 13800,
    totalCost: 7600,
    status: "pending-approval",
  },
  {
    id: 7,
    customer: { id: 7, name: "Food Express" },
    deliveryDate: "2025-11-20",
    orderNumber: "OD-007",
    productions: [
      { id: 2, name: "Chicken Shawarma", quantity: 60, price: 250 },
      { id: 4, name: "Spring Roll", quantity: 50, price: 80 },
    ],
    totalPrice: 17000,
    totalCost: 9500,
    status: "material-received",
  },
  {
    id: 8,
    customer: { id: 1, name: "KK Supermart" },
    deliveryDate: "2025-11-25",
    orderNumber: "OD-008",
    productions: [
      { id: 3, name: "Vegetable Biryani", quantity: 60, price: 180 },
      { id: 1, name: "Chocolate Cake", quantity: 4, price: 1200 },
    ],
    totalPrice: 17200,
    totalCost: 9400,
    status: "in-progress",
  },
];

export const SALES = [
  {
    id: 1,
    order: ORDERS[0], // KK Supermart
    salesDate: "2025-11-05",
    productions: ORDERS[0].productions,
    totalAmount: 18500,
    paidAmount: 18500,
    dueAmount: 0,
    status: "paid",
  },
  {
    id: 2,
    order: ORDERS[1], // ABC Supermart
    salesDate: "2025-11-08",
    productions: ORDERS[1].productions,
    totalAmount: 12000,
    paidAmount: 8000,
    dueAmount: 4000,
    status: "partially-paid",
  },
  {
    id: 3,
    order: ORDERS[2], // Fresh Mart
    salesDate: "2025-11-10",
    productions: ORDERS[2].productions,
    totalAmount: 8000,
    paidAmount: 0,
    dueAmount: 8000,
    status: "pending",
  },
  {
    id: 4,
    order: ORDERS[3], // Urban Bites
    salesDate: "2025-11-12",
    productions: ORDERS[3].productions,
    totalAmount: 14700,
    paidAmount: 14700,
    dueAmount: 0,
    status: "paid",
  },
  {
    id: 5,
    order: ORDERS[4], // Metro Delights
    salesDate: "2025-11-15",
    productions: ORDERS[4].productions,
    totalAmount: 15000,
    paidAmount: 15000,
    dueAmount: 0,
    status: "paid",
  },
  {
    id: 6,
    order: ORDERS[5], // Taste Corner
    salesDate: "2025-11-18",
    productions: ORDERS[5].productions,
    totalAmount: 13800,
    paidAmount: 6000,
    dueAmount: 7800,
    status: "partially-paid",
  },
  {
    id: 7,
    order: ORDERS[6], // Food Express
    salesDate: "2025-11-20",
    productions: ORDERS[6].productions,
    totalAmount: 17000,
    paidAmount: 0,
    dueAmount: 17000,
    status: "pending",
  },
  {
    id: 8,
    order: ORDERS[7], // KK Supermart (repeat)
    salesDate: "2025-11-25",
    productions: ORDERS[7].productions,
    totalAmount: 17200,
    paidAmount: 17200,
    dueAmount: 0,
    status: "paid",
  },
];

export const PURCHASES = [
  {
    id: 1,
    supplier: { id: 1, name: "KK Supermart" },
    purchaseDate: "2025-01-01",
    totalAmount: 1200,
    paidAmount: 1200,
    dueAmount: 0,
    invoiceNumber: "INV-001",
    status: "paid",
    materials: [
      {
        id: 1,
        name: "Flour (All-purpose)",
        quantity: 100,
        unit: "kg",
        unitPrice: 10,
      },
      {
        id: 2,
        name: "Sugar (Granulated)",
        quantity: 20,
        unit: "kg",
        unitPrice: 20,
      },
    ],
  },
  {
    id: 2,
    supplier: { id: 2, name: "ABC Supermart" },
    purchaseDate: "2025-01-04",
    totalAmount: 1850,
    paidAmount: 1000,
    dueAmount: 850,
    invoiceNumber: "INV-002",
    status: "partially-paid",
    materials: [
      {
        id: 3,
        name: "Butter (Unsalted)",
        quantity: 25,
        unit: "kg",
        unitPrice: 50,
      },
      { id: 4, name: "Eggs", quantity: 200, unit: "pcs", unitPrice: 2 },
    ],
  },
  {
    id: 3,
    supplier: { id: 3, name: "Fresh Foods Co." },
    purchaseDate: "2025-01-06",
    totalAmount: 2500,
    paidAmount: 0,
    dueAmount: 2500,
    invoiceNumber: "INV-003",
    status: "pending",
    materials: [
      { id: 5, name: "Cocoa Powder", quantity: 20, unit: "kg", unitPrice: 80 },
      {
        id: 6,
        name: "Vanilla Essence",
        quantity: 10,
        unit: "bottle",
        unitPrice: 50,
      },
    ],
  },
  {
    id: 4,
    supplier: { id: 4, name: "BakePro Suppliers" },
    purchaseDate: "2025-01-09",
    totalAmount: 3100,
    paidAmount: 3100,
    dueAmount: 0,
    invoiceNumber: "INV-004",
    status: "paid",
    materials: [
      {
        id: 7,
        name: "Whipping Cream",
        quantity: 15,
        unit: "litre",
        unitPrice: 120,
      },
      {
        id: 8,
        name: "Strawberries (Fresh)",
        quantity: 10,
        unit: "kg",
        unitPrice: 70,
      },
    ],
  },
  {
    id: 5,
    supplier: { id: 5, name: "Golden Dairy" },
    purchaseDate: "2025-01-12",
    totalAmount: 2200,
    paidAmount: 1200,
    dueAmount: 1000,
    invoiceNumber: "INV-005",
    status: "partially-paid",
    materials: [
      {
        id: 9,
        name: "Milk (Full Cream)",
        quantity: 100,
        unit: "litre",
        unitPrice: 20,
      },
      { id: 10, name: "Cheese", quantity: 15, unit: "kg", unitPrice: 60 },
    ],
  },
  {
    id: 6,
    supplier: { id: 6, name: "Sweet Essentials" },
    purchaseDate: "2025-01-14",
    totalAmount: 1800,
    paidAmount: 1800,
    dueAmount: 0,
    invoiceNumber: "INV-006",
    status: "paid",
    materials: [
      {
        id: 11,
        name: "Chocolate Chips",
        quantity: 30,
        unit: "kg",
        unitPrice: 60,
      },
      {
        id: 12,
        name: "Baking Powder",
        quantity: 10,
        unit: "pack",
        unitPrice: 30,
      },
    ],
  },
  {
    id: 7,
    supplier: { id: 7, name: "Spice & Flavor Co." },
    purchaseDate: "2025-01-16",
    totalAmount: 950,
    paidAmount: 0,
    dueAmount: 950,
    invoiceNumber: "INV-007",
    status: "pending",
    materials: [
      {
        id: 13,
        name: "Cinnamon Powder",
        quantity: 5,
        unit: "kg",
        unitPrice: 80,
      },
      { id: 14, name: "Nutmeg", quantity: 3, unit: "kg", unitPrice: 90 },
    ],
  },
  {
    id: 8,
    supplier: { id: 1, name: "KK Supermart" },
    purchaseDate: "2025-01-20",
    totalAmount: 3400,
    paidAmount: 3400,
    dueAmount: 0,
    invoiceNumber: "INV-008",
    status: "paid",
    materials: [
      { id: 15, name: "Icing Sugar", quantity: 25, unit: "kg", unitPrice: 40 },
      { id: 16, name: "Almonds", quantity: 8, unit: "kg", unitPrice: 150 },
    ],
  },
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
  {
    id: 1,
    name: "Flour (All-purpose)",
    unit: "kg",
    unitPrice: 35,
    stock: 120,
    alertLevel: 20,
  },
  {
    id: 2,
    name: "Sugar (Granulated)",
    unit: "kg",
    unitPrice: 40,
    stock: 80,
    alertLevel: 5,
  },
  {
    id: 3,
    name: "Yeast (Dry)",
    unit: "pack",
    unitPrice: 150,
    stock: 30,
    alertLevel: 10,
  },
  {
    id: 4,
    name: "Chicken (Breast)",
    unit: "kg",
    unitPrice: 700,
    stock: 50,
    alertLevel: 20,
  },
  {
    id: 5,
    name: "Vegetable Mix (Frozen)",
    unit: "kg",
    unitPrice: 120,
    stock: 100,
    alertLevel: 20,
  },
  {
    id: 6,
    name: "Cocoa Powder",
    unit: "kg",
    unitPrice: 450,
    stock: 50,
    alertLevel: 20,
  },

  // new ones below
  {
    id: 7,
    name: "Butter (Unsalted)",
    unit: "kg",
    unitPrice: 480,
    stock: 60,
    alertLevel: 20,
  },
  {
    id: 8,
    name: "Eggs",
    unit: "dozen",
    unitPrice: 85,
    stock: 40,
    alertLevel: 20,
  },
  {
    id: 9,
    name: "Vanilla Extract",
    unit: "bottle",
    unitPrice: 250,
    stock: 25,
    alertLevel: 20,
  },
  {
    id: 10,
    name: "Baking Powder",
    unit: "pack",
    unitPrice: 90,
    stock: 70,
    alertLevel: 20,
  },
  {
    id: 11,
    name: "Baking Soda",
    unit: "pack",
    unitPrice: 60,
    stock: 65,
    alertLevel: 20,
  },
  {
    id: 12,
    name: "Fresh Cream",
    unit: "litre",
    unitPrice: 220,
    stock: 35,
    alertLevel: 20,
  },
  {
    id: 13,
    name: "Milk (Full Cream)",
    unit: "litre",
    unitPrice: 70,
    stock: 100,
    alertLevel: 20,
  },
  {
    id: 14,
    name: "Chocolate Chips",
    unit: "kg",
    unitPrice: 520,
    stock: 45,
    alertLevel: 20,
  },
  {
    id: 15,
    name: "Strawberry Jam",
    unit: "jar",
    unitPrice: 180,
    stock: 30,
    alertLevel: 20,
  },
  {
    id: 16,
    name: "Fondant (White)",
    unit: "kg",
    unitPrice: 400,
    stock: 25,
    alertLevel: 20,
  },
  {
    id: 17,
    name: "Food Coloring (Assorted)",
    unit: "set",
    unitPrice: 300,
    stock: 20,
    alertLevel: 20,
  },
  {
    id: 18,
    name: "Icing Sugar",
    unit: "kg",
    unitPrice: 90,
    stock: 70,
    alertLevel: 20,
  },
  {
    id: 19,
    name: "Whipping Cream Powder",
    unit: "pack",
    unitPrice: 250,
    stock: 40,
    alertLevel: 20,
  },
  {
    id: 20,
    name: "Gelatin Sheets",
    unit: "pack",
    unitPrice: 280,
    stock: 15,
    alertLevel: 20,
  },
  {
    id: 21,
    name: "Almond Flour",
    unit: "kg",
    unitPrice: 850,
    stock: 25,
    alertLevel: 20,
  },
  {
    id: 22,
    name: "Hazelnut Paste",
    unit: "kg",
    unitPrice: 950,
    stock: 10,
    alertLevel: 20,
  },
  {
    id: 23,
    name: "Cake Boards (Round 8in)",
    unit: "piece",
    unitPrice: 20,
    stock: 200,
    alertLevel: 20,
  },
  {
    id: 24,
    name: "Cupcake Liners",
    unit: "pack",
    unitPrice: 60,
    stock: 90,
    alertLevel: 20,
  },
  {
    id: 25,
    name: "Parchment Paper Roll",
    unit: "roll",
    unitPrice: 120,
    stock: 30,
    alertLevel: 20,
  },
  {
    id: 26,
    name: "Edible Glitter",
    unit: "bottle",
    unitPrice: 150,
    stock: 12,
    alertLevel: 20,
  },
  {
    id: 27,
    name: "Sprinkles (Assorted)",
    unit: "jar",
    unitPrice: 100,
    stock: 25,
    alertLevel: 20,
  },
  {
    id: 28,
    name: "Dark Chocolate Slab",
    unit: "kg",
    unitPrice: 650,
    stock: 40,
    alertLevel: 20,
  },
  {
    id: 29,
    name: "White Chocolate Slab",
    unit: "kg",
    unitPrice: 700,
    stock: 35,
    alertLevel: 20,
  },
  {
    id: 30,
    name: "Cake Boxes (Medium)",
    unit: "piece",
    unitPrice: 35,
    stock: 150,
    alertLevel: 20,
  },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Chocolate Cake",
    unit: "kg",
    price: 1200,
    totalCost: 650,
    materials: [
      {
        materialId: 1,
        name: "Flour (All-purpose)",
        unit: "kg",
        unitPrice: 35,
        consumption: 0.5,
      },
      {
        materialId: 2,
        name: "Sugar (Granulated)",
        unit: "kg",
        unitPrice: 40,
        consumption: 0.3,
      },
      {
        materialId: 6,
        name: "Cocoa Powder",
        unit: "kg",
        unitPrice: 450,
        consumption: 0.15,
      },
      {
        materialId: 7,
        name: "Butter (Unsalted)",
        unit: "kg",
        unitPrice: 480,
        consumption: 0.1,
      },
      {
        materialId: 12,
        name: "Fresh Cream",
        unit: "litre",
        unitPrice: 220,
        consumption: 0.15,
      },
    ],
  },
  {
    id: 2,
    name: "Vanilla Sponge Cake",
    unit: "kg",
    price: 950,
    totalCost: 520,
    materials: [
      {
        materialId: 1,
        name: "Flour (All-purpose)",
        unit: "kg",
        unitPrice: 35,
        consumption: 0.4,
      },
      {
        materialId: 2,
        name: "Sugar (Granulated)",
        unit: "kg",
        unitPrice: 40,
        consumption: 0.25,
      },
      {
        materialId: 8,
        name: "Eggs",
        unit: "dozen",
        unitPrice: 85,
        consumption: 0.2,
      },
      {
        materialId: 7,
        name: "Butter (Unsalted)",
        unit: "kg",
        unitPrice: 480,
        consumption: 0.1,
      },
      {
        materialId: 9,
        name: "Vanilla Extract",
        unit: "bottle",
        unitPrice: 250,
        consumption: 0.02,
      },
    ],
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    unit: "kg",
    price: 1350,
    totalCost: 780,
    materials: [
      {
        materialId: 1,
        name: "Flour (All-purpose)",
        unit: "kg",
        unitPrice: 35,
        consumption: 0.4,
      },
      {
        materialId: 2,
        name: "Sugar (Granulated)",
        unit: "kg",
        unitPrice: 40,
        consumption: 0.25,
      },
      {
        materialId: 7,
        name: "Butter (Unsalted)",
        unit: "kg",
        unitPrice: 480,
        consumption: 0.1,
      },
      {
        materialId: 9,
        name: "Vanilla Extract",
        unit: "bottle",
        unitPrice: 250,
        consumption: 0.02,
      },
      {
        materialId: 17,
        name: "Food Coloring (Red)",
        unit: "set",
        unitPrice: 300,
        consumption: 0.01,
      },
      {
        materialId: 12,
        name: "Fresh Cream",
        unit: "litre",
        unitPrice: 220,
        consumption: 0.15,
      },
    ],
  },
  {
    id: 4,
    name: "Black Forest Cake",
    unit: "kg",
    price: 1400,
    totalCost: 800,
    materials: [
      {
        materialId: 1,
        name: "Flour (All-purpose)",
        unit: "kg",
        unitPrice: 35,
        consumption: 0.45,
      },
      {
        materialId: 2,
        name: "Sugar (Granulated)",
        unit: "kg",
        unitPrice: 40,
        consumption: 0.25,
      },
      {
        materialId: 6,
        name: "Cocoa Powder",
        unit: "kg",
        unitPrice: 450,
        consumption: 0.12,
      },
      {
        materialId: 12,
        name: "Fresh Cream",
        unit: "litre",
        unitPrice: 220,
        consumption: 0.2,
      },
      {
        materialId: 14,
        name: "Chocolate Chips",
        unit: "kg",
        unitPrice: 520,
        consumption: 0.1,
      },
      {
        materialId: 27,
        name: "Sprinkles (Assorted)",
        unit: "jar",
        unitPrice: 100,
        consumption: 0.02,
      },
    ],
  },
  {
    id: 5,
    name: "Strawberry Cake",
    unit: "kg",
    price: 1250,
    totalCost: 700,
    materials: [
      {
        materialId: 1,
        name: "Flour (All-purpose)",
        unit: "kg",
        unitPrice: 35,
        consumption: 0.4,
      },
      {
        materialId: 2,
        name: "Sugar (Granulated)",
        unit: "kg",
        unitPrice: 40,
        consumption: 0.25,
      },
      {
        materialId: 12,
        name: "Fresh Cream",
        unit: "litre",
        unitPrice: 220,
        consumption: 0.2,
      },
      {
        materialId: 15,
        name: "Strawberry Jam",
        unit: "jar",
        unitPrice: 180,
        consumption: 0.1,
      },
      {
        materialId: 17,
        name: "Food Coloring (Assorted)",
        unit: "set",
        unitPrice: 300,
        consumption: 0.01,
      },
    ],
  },
  {
    id: 6,
    name: "Cupcakes (Assorted)",
    unit: "kg",
    price: 600,
    totalCost: 320,
    materials: [
      {
        materialId: 1,
        name: "Flour (All-purpose)",
        unit: "kg",
        unitPrice: 35,
        consumption: 0.3,
      },
      {
        materialId: 2,
        name: "Sugar (Granulated)",
        unit: "kg",
        unitPrice: 40,
        consumption: 0.15,
      },
      {
        materialId: 7,
        name: "Butter (Unsalted)",
        unit: "kg",
        unitPrice: 480,
        consumption: 0.08,
      },
      {
        materialId: 9,
        name: "Vanilla Extract",
        unit: "bottle",
        unitPrice: 250,
        consumption: 0.02,
      },
      {
        materialId: 27,
        name: "Sprinkles (Assorted)",
        unit: "jar",
        unitPrice: 100,
        consumption: 0.01,
      },
    ],
  },
  {
    id: 7,
    name: "Cheesecake (Baked)",
    unit: "kg",
    price: 1600,
    totalCost: 900,
    materials: [
      {
        materialId: 7,
        name: "Butter (Unsalted)",
        unit: "kg",
        unitPrice: 480,
        consumption: 0.1,
      },
      {
        materialId: 18,
        name: "Icing Sugar",
        unit: "kg",
        unitPrice: 90,
        consumption: 0.05,
      },
      {
        materialId: 12,
        name: "Fresh Cream",
        unit: "litre",
        unitPrice: 220,
        consumption: 0.25,
      },
      {
        materialId: 21,
        name: "Almond Flour",
        unit: "kg",
        unitPrice: 850,
        consumption: 0.05,
      },
      {
        materialId: 9,
        name: "Vanilla Extract",
        unit: "bottle",
        unitPrice: 250,
        consumption: 0.01,
      },
    ],
  },
  {
    id: 8,
    name: "Fruit Cake",
    unit: "kg",
    price: 1100,
    totalCost: 600,
    materials: [
      {
        materialId: 1,
        name: "Flour (All-purpose)",
        unit: "kg",
        unitPrice: 35,
        consumption: 0.35,
      },
      {
        materialId: 2,
        name: "Sugar (Granulated)",
        unit: "kg",
        unitPrice: 40,
        consumption: 0.25,
      },
      {
        materialId: 7,
        name: "Butter (Unsalted)",
        unit: "kg",
        unitPrice: 480,
        consumption: 0.1,
      },
      {
        materialId: 5,
        name: "Vegetable Mix (Frozen)",
        unit: "kg",
        unitPrice: 120,
        consumption: 0.08,
      },
      {
        materialId: 9,
        name: "Vanilla Extract",
        unit: "bottle",
        unitPrice: 250,
        consumption: 0.01,
      },
    ],
  },
];

// ====================================================================
// V. PRODUCTION RECIPES (KEY DATA FOR CALCULATION)
// ====================================================================
// Structure: { productionId: [ { materialId, quantity (per production unit) } ] }
export const PRODUCTION_RECIPES = {
  // 1: Chocolate Cake (Small) - requires Cocoa, Flour, Sugar, Butter
  1: [
    { materialId: 6, quantity: 0.15 }, // 0.15 kg Cocoa Powder
    { materialId: 1, quantity: 0.5 }, // 0.5 kg Flour
    { materialId: 2, quantity: 0.3 }, // 0.3 kg Sugar
    { materialId: 7, quantity: 0.2 }, // 0.2 kg Butter
  ],

  // 2: Chicken Shawarma - requires Chicken, Flour (for bread), Yeast, Sauce
  2: [
    { materialId: 4, quantity: 0.15 }, // 0.15 kg Chicken
    { materialId: 1, quantity: 0.1 }, // 0.1 kg Flour
    { materialId: 3, quantity: 0.01 }, // 0.01 pack Yeast
    { materialId: 8, quantity: 0.05 }, // 0.05 L Garlic Sauce
  ],

  // 3: Vegetable Biryani - requires Vegetable Mix, Rice, Spices
  3: [
    { materialId: 5, quantity: 0.6 }, // 0.6 kg Vegetable Mix
    { materialId: 9, quantity: 0.4 }, // 0.4 kg Basmati Rice
    { materialId: 10, quantity: 0.05 }, // 0.05 kg Spices
  ],

  // 4: Spring Roll - requires Vegetable Mix, Flour (for wrapper), Oil
  4: [
    { materialId: 5, quantity: 0.05 }, // 0.05 kg Vegetable Mix
    { materialId: 1, quantity: 0.03 }, // 0.03 kg Flour
    { materialId: 11, quantity: 0.1 }, // 0.1 L Oil
  ],

  // 5: Paneer Tikka - requires Paneer, Spices, Yogurt
  5: [
    { materialId: 12, quantity: 0.3 }, // 0.3 kg Paneer
    { materialId: 10, quantity: 0.05 }, // 0.05 kg Spices
    { materialId: 13, quantity: 0.1 }, // 0.1 L Yogurt
  ],

  // 6: Strawberry Smoothie - requires Milk, Strawberries, Sugar
  6: [
    { materialId: 14, quantity: 0.25 }, // 0.25 L Milk
    { materialId: 15, quantity: 0.2 }, // 0.2 kg Strawberries
    { materialId: 2, quantity: 0.05 }, // 0.05 kg Sugar
  ],
};
