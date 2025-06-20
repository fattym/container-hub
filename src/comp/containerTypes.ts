// src/constants/containerTypes.ts
export const ContainerType = [
  {
    id: 1,
    type: "20ft Standard",
    description: "Perfect for general cargo and storage needs.",
    price: 2200,
    image:
      "https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%2020ft%20standard%20shipping%20container%20in%20pristine%20condition%2C%20blue%20color%2C%20placed%20on%20a%20clean%20concrete%20surface%20with%20a%20minimalist%20industrial%20background%2C%20soft%20natural%20lighting%20highlighting%20the%20container%20details%2C%20commercial%20product%20photography%20style&width=400&height=300&seq=001&orientation=landscape",

    specifications:
      "General purpose dry cargo container with corrugated steel walls, weatherproof, and secure double doors.",
    external: "6.06 x 2.44 x 2.59 m",
    internal: "5.90 x 2.35 x 2.39 m",
    doorOpening: "2.34 x 2.28 m",
    maxPayload: "28,200 kg",
    cubicCapacity: "33.2 m³",
    tare: "2,170 kg",
    floorStrength: "7,260 kg/m²",
    material: "Corten steel",
    floor: "Marine-grade plywood",
    wallThickness: "1.6 mm",
    roofThickness: "2.0 mm",
    doorType: "Double swing doors",
    lockingSystem: "4-bar locking with cam and keeper",
    paint: "Marine-grade anti-corrosive epoxy paint",
    features1: "Weatherproof and secure",
    features2: "Easy to transport and stack",
    additionalImages: "h",
    inStock: true,
    condition: "New",
    size: "20ft",
    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    features: [
      "Wind and water tight",
      "Cargo worthy",
      "CSC plated",
      "Lockable doors",
      "Easy to load and unload",
      "Durable construction for long-term use",
      "Versatile for various cargo types",
      "Easy access with double doors",
      "Secure locking system for safe transport",
      "Durable construction for long-term use",
      "Versatile for various cargo types",
      "Easy access with double doors",
      "Secure locking system for safe transport",
    ],
  },
  {
    id: 2,
    type: "40ft High Cube",
    description: "Extra height for maximum storage capacity.",
    price: 4500,
    image:
      "https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%2040ft%20high%20cube%20shipping%20container%20in%20pristine%20condition%2C%20blue%20color%2C%20placed%20on%20a%20clean%20concrete%20surface%20with%20a%20minimalist%20industrial%20background%2C%20soft%20natural%20lighting%20highlighting%20the%20container%20details%2C%20commercial%20product%20photography%20style&width=400&height=300&seq=002&orientation=landscape",

    specifications:
      "High cube container with extra vertical space for voluminous or lightweight cargo.",
    external: "12.19 x 2.44 x 2.90 m",
    internal: "12.03 x 2.35 x 2.69 m",
    doorOpening: "2.34 x 2.59 m",
    maxPayload: "28,800 kg",
    cubicCapacity: "76.3 m³",
    tare: "3,940 kg",
    floorStrength: "5,460 kg/m²",
    floor: "Marine-grade plywood",
    wallThickness: "1.6 mm",
    roofThickness: "2.0 mm",
    doorType: "Double swing doors",
    lockingSystem: "4-bar locking with cam and keeper",
    paint: "Marine-grade anti-corrosive epoxy paint",
    material: "Corten steel",
    features1: "Extra height for maximum storage",
    features2: "Ideal for bulky items and equipment",
    features3: "Stackable for efficient transport",
    features4: "Secure and weatherproof design",
    features5: "Easy access with double doors",
    features6: "Versatile for various cargo types",
    features7: "Durable construction for long-term use",
    additionalImages: "h",
    inStock: "Pre order",
    condition: "New",
    size: "40ft High Cube",

    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    features: [
      "Wind and water tight",
      "Cargo worthy",
      "CSC plated",
      "Lockable doors",
      "Easy to load and unload",
      "Durable construction for long-term use",
      "Versatile for various cargo types",
      "Easy access with double doors",
      "Secure locking system for safe transport",
    ],
  },
  {
    id: 3,
    type: "40ft Refrigerated Container",
    description: "Temperature-controlled for perishable goods.",
    price: 6800,
    image:
      "https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20refrigerated%20shipping%20container%20with%20external%20cooling%20unit%20visible%2C%20white%20color%2C%20placed%20on%20a%20clean%20concrete%20surface%20with%20a%20minimalist%20industrial%20background%2C%20soft%20natural%20lighting%20highlighting%20the%20container%20details%2C%20commercial%20product%20photography%20style&width=400&height=300&seq=003&orientation=landscape",

    specifications:
      "Insulated container with refrigeration unit, used for temperature-sensitive cargo between -30°C and +30°C.",
    external: "12.19 x 2.44 x 2.59 m",
    internal: "11.59 x 2.29 x 2.24 m",
    doorOpening: "2.29 x 2.26 m",
    maxPayload: "29,000 kg",
    cubicCapacity: "67.5 m³",
    tare: "4,800 kg",
    floorStrength: "4,500 kg/m²",
    floor: "T-bar aluminum floor",
    wallThickness: "75 mm (insulated)",
    roofThickness: "100 mm (insulated)",
    doorType: "Double insulated doors",
    lockingSystem: "Dual lock cam rods",
    paint: "UV-resistant food-grade coating",
    material: "Aluminum + stainless steel",
    features1: "Temperature-controlled for perishable goods",
    features2: "Energy-efficient refrigeration unit",
    features3: "Insulated walls for optimal temperature retention",
    features4: "Easy access with double doors",
    features5: "Durable construction for long-term use",
    features6: "Versatile for various temperature-sensitive cargo",
    additionalImages: "h",
    preOrder: true,
    condition: "New",
    size: "40ft Refrigerated",
    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    features: [
      "Wind and water tight",
      "Cargo worthy",
      "CSC plated",
      "Lockable doors",
      "Extra Height",
      "Backup generator connection"
    ],
  },
  {
    id: 4,
    type: "Open Top Container",
    description: "Removable roof for easy loading of tall cargo.",
    price: 3200,
    image:
      "https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20an%20open%20top%20shipping%20container%20with%20the%20roof%20removed%2C%20green%20color%2C%20placed%20on%20a%20clean%20concrete%20surface%20with%20a%20minimalist%20industrial%20background%2C%20soft%20natural%20lighting%20highlighting%20the%20container%20details%2C%20commercial%20product%20photography%20style&width=400&height=300&seq=004&orientation=landscape",

    specifications:
      "Standard container without a solid roof, used for over-height cargo. Covered with tarpaulin.",
    external: "6.06 x 2.44 x 2.59 m",
    internal: "5.90 x 2.35 x 2.35 m",
    doorOpening: "2.34 x 2.28 m",
    maxPayload: "28,000 kg",
    cubicCapacity: "32.0 m³",
    tare: "2,350 kg",
    floorStrength: "7,260 kg/m²",
    floor: "Marine-grade plywood",
    wallThickness: "1.6 mm",
    roofThickness: "None (tarpaulin cover)",
    doorType: "Double swing doors",
    lockingSystem: "Standard container lock bars",
    paint: "Marine-grade anti-corrosive epoxy paint",
    material: "Corten steel",
    features1: "Removable roof for easy loading of tall cargo",
    features2: "Covered with tarpaulin for weather protection",
    features3: "Ideal for machinery, pipes, and other oversized items",
    features4: "Easy access with double doors",
    additionalImages: "h",
    preOrder: true,
    features5: "Durable construction for long-term use",
    condition: "New",
    size: "20ft Open Top",
    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    features: [
      "Wind and water tight",
      "Cargo worthy",
      "CSC plated",
      "Lockable doors",
      "Easy to load and unload",
      "Durable construction for long-term use",
      "Versatile for various cargo types",
      "Easy access with double doors",
      "Secure locking system for safe transport",
      "Backup generator connection",
    ],
  },
  {
    id: 5,
    type: "Flat Rack Container",
    description: "Collapsible sides for oversized cargo.",
    price: 3500,
    image:
      "https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20flat%20rack%20shipping%20container%20with%20collapsible%20sides%2C%20yellow%20color%2C%20placed%20on%20a%20clean%20concrete%20surface%20with%20a%20minimalist%20industrial%20background%2C%20soft%20natural%20lighting%20highlighting%20the%20container%20details%2C%20commercial%20product%20photography%20style&width=400&height=300&seq=005&orientation=landscape",
    specifications:
      "Container frame with collapsible or fixed end walls; used for heavy or oversized machinery and cargo.",
    external: "6.06 x 2.44 x 2.59 m (ends up)",
    internal: "5.61 x 2.23 m (open top)",
    doorOpening: "Not applicable",
    maxPayload: "30,000 kg",
    cubicCapacity: "Not applicable",
    tare: "2,720 kg",
    floorStrength: "7,260 kg/m²",
    floor: "Steel crossmembers with hardwood insert",
    wallThickness: "2.0 mm",
    roofThickness: "None",
    doorType: "None",
    lockingSystem: "Twist lock lugs",
    paint: "Heavy-duty anti-corrosive primer and finish",
    material: "Corten steel",
    features1: "Collapsible sides for easy loading and unloading",
    features2: "Ideal for heavy or oversized cargo",
    features3: "Stackable for efficient transport",
    features4: "Durable construction for long-term use",
    features5: "Versatile for various cargo types",
    features6: "Easy access with open top design",
    features7: "Secure locking system for safe transport",
    additionalImages: "h",
    preOrder: true,
    features8: "Ideal for heavy or oversized cargo",
    features9: "Stackable for efficient transport",
    condition: "New",
    size: "20ft Flat Rack",
    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    Features: [
      "Wind and water tight",
      "Cargo worthy",
      "CSC plated",
      "Lockable doors",
      "Easy to load and unload",
      "Durable construction for long-term use",
      "Versatile for various cargo types",
      "Easy access with double doors",
      "Secure locking system for safe transport",
    ],
  },
  {
    id: 6,
    type: "Tank Container",
    description: "Designed for liquid cargo transportation.",
    price: 7200,
    image:
      "https://readdy.ai/api/search-image?query=A%20professional%20photograph%20of%20a%20tank%20shipping%20container%20designed%20for%20liquid%20transport%2C%20stainless%20steel%20finish%2C%20placed%20on%20a%20clean%20concrete%20surface%20with%20a%20minimalist%20industrial%20background%2C%20soft%20natural%20lighting%20highlighting%20the%20container%20details%2C%20commercial%20product%20photography%20style&width=400&height=300&seq=006&orientation=landscape",

    specifications: "Designed for liquid cargo transportation",
    external: "6.06 x 2.44 x 2.59 m",
    internal: "Ø1.60–1.80 x 5.50–6.00 m",
    doorOpening: "Not applicable",
    maxPayload: "Up to 26,000 kg",
    cubicCapacity: "21,000 – 26,000 L",
    tare: "3,400 – 4,000 kg",
    floorStrength: "Varies; typically frame-supported (≥6,000 kg/m²)",
    floor: "Frame supported with beam rails",
    wallThickness: "4.5 mm (tank barrel)",
    roofThickness: "Not applicable",
    doorType: "Manhole cover (top access)",
    lockingSystem: "Pressure-rated safety locking with discharge valve",
    paint: "White polyurethane or zinc-rich epoxy primer",
    material: "Stainless steel (316L)",
    features1: "Designed for liquid cargo transportation",
    features2: "Pressure-rated for safe transport of hazardous liquids",
    features3: "Insulated options available for temperature-sensitive liquids",
    features4: "Easy access with top manhole cover",
    features5: "Durable stainless steel construction for long-term use",
    additionalImages: "h",
    preOrder: true,
    condition: "New",
    size: "20ft Tank",
    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    Features: [
      "Wind and water tight",
      "Cargo worthy",
      "CSC plated",
      "Lockable doors",
      "Extra height",
      "Temperature control (-30°C to +30°C)",
      "Integrated cooling unit",
      "Digital temperature display",
      "Backup generator connection",
    ],
  },
  {
    id: 7,
    type: "20ft Side Door Container",
    description: "Convenient side access for easy loading and unloading.",
    price: 3000,
    image:
      "https://readdy.ai/api/search-image?query=Used%252020ft%2520shipping%2520container%252C%2520blue%2520color%2520with%2520moderate%2520weathering%252C%2520isolated%2520on%2520white%2520background%252C%2520high-quality%2520professional%2520product%2520photograph%252C%2520detailed%2520texture%252C%2520clean%2520lines%252C%2520industrial%2520design%252C%2520global%2520logistics%252C%2520no%2520text%2520or%2520labels%252C%2520front%2520three-quarter%2520view&width=600&height=400&seq=8&orientation=landscape",

    specifications:
      "Container with side doors for easy access to cargo without needing to open the end doors.",
    external: "6.06 x 2.44 x 2.59 m",
    internal: "5.90 x 2.35 x 2.39 m",
    doorOpening: "1.95 x 2.28 m (side doors)",
    maxPayload: "28,200 kg",
    cubicCapacity: "33.2 m³",
    tare: "2,170 kg",
    floorStrength: "7,260 kg/m²",
    floor: "Marine-grade plywood",
    wallThickness: "1.6 mm",
    roofThickness: "2.0 mm",
    doorType: "Side swing doors + end doors",
    lockingSystem: "4-bar locking with cam and keeper",
    paint: "Marine-grade anti-corrosive epoxy paint",
    material: "Corten steel",
    features1: "Convenient side access for easy loading and unloading",
    features2: "Weatherproof and secure design",
    features3: "Easy to transport and stack",
    additionalImages: "h",
    preOrder: true,
    condition: "New",
    size: "20ft Side Door",
    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    Features: [
      "Weatherproof and secure",
      "Easy to transport and stack",
      "Convenient side access for easy loading and unloading",
      "Durable stainless steel construction for long-term use",
      "Versatile for various cargo types",
      "Easy access with side doors",
      "Secure locking system for safe transport",
      "Integrated cooling unit for temperature control",
      "Digital temperature display for real-time monitoring",
      "Backup generator connection for power outages",
      "Easy to install and maintain",
    ],
  },
  {
    id: 8,
    type: "20ft Refrigerated",
    size: "20ft",
    condition: "New",
    description:
      "Compact refrigerated solution for temperature-sensitive cargo.",
    price: 5800,
    image:
      "https://readdy.ai/api/search-image?query=A%2520professional%2520photograph%2520of%2520a%252020ft%2520refrigerated%2520shipping%2520container%2520with%2520external%2520cooling%2520unit%2520visible%252C%2520white%2520color%252C%2520placed%2520on%2520a%2520clean%2520concrete%2520surface%2520with%2520a%2520minimalist%2520industrial%2520background%252C%2520soft%2520natural%2520lighting%2520highlighting%2520the%2520container%2520details%252C%2520commercial%2520product%2520photography%2520style&width=400&height=300&seq=008&orientation=landscape",
    specifications:
      "Compact refrigerated solution for temperature-sensitive cargo",
    external: "6.06 x 2.44 x 2.59 m",
    internal: "5.90 x 2.35 x 2.39 m",
    doorOpening: "2.34 x 2.28 m",
    maxPayload: "28,200 kg",
    cubicCapacity: "33.2 m³",
    tare: "2,170 kg",
    floorStrength: "7,260 kg/m²",
    floor: "Marine-grade plywood",
    wallThickness: "1.6 mm",
    roofThickness: "2.0 mm",
    doorType: "Double swing doors",
    lockingSystem: "4-bar locking with cam and keeper",
    paint: "Marine-grade anti-corrosive epoxy paint",
    material: "Corten steel",
    features1: "Compact refrigerated solution for temperature-sensitive cargo",
    features2: "Energy-efficient refrigeration unit",
    features3: "Insulated walls for optimal temperature retention",
    features4: "Easy access with double doors",
    features5: "Durable construction for long-term use",
    additionalImages: "h",
    preOrder: true,
    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    features: [
      "Wind and water tight",
      "Cargo worthy",
      "CSC plated",
      "Lockable doors",
      "Easy to load and unload",
      "Durable construction for long-term use",
      "Versatile for various cargo types",
      "Easy access with double doors",
      "Secure locking system for safe transport",
    ],
  },
  {
    id: 9,
    type: "45ft High Cube",
    size: "45ft",
    condition: "New",
    description: "Maximum length and height for optimal storage capacity.",
    price: 4800,
    image:
      "https://readdy.ai/api/search-image?query=A%2520professional%2520photograph%2520of%2520a%252045ft%2520high%2520cube%2520shipping%2520container%2520in%2520pristine%2520condition%252C%2520blue%2520color%252C%2520placed%2520on%2520a%2520clean%2520concrete%2520surface%2520with%2520a%2520minimalist%2520industrial%2520background%252C%2520soft%2520natural%2520lighting%2520highlighting%2520the%2520container%2520details%252C%2520commercial%2520product%2520photography%2520style&width=400&height=300&seq=009&orientation=landscape",
    specifications: "Maximum length and height for optimal storage capacity",
    external: "13.72 x 2.44 x 2.90 m",
    internal: "13.56 x 2.35 x 2.69 m",
    doorOpening: "2.34 x 2.59 m",
    maxPayload: "30,000 kg",
    cubicCapacity: "86.0 m³",
    tare: "4,500 kg",
    floorStrength: "5,460 kg/m²",
    floor: "Marine-grade plywood",
    wallThickness: "1.6 mm",
    roofThickness: "2.0 mm",
    doorType: "Double swing doors",
    lockingSystem: "4-bar locking with cam and keeper",
    paint: "Marine-grade anti-corrosive epoxy paint",
    material: "Corten steel",
    features1: "Maximum length and height for optimal storage capacity",
    features2: "Ideal for bulky items and equipment",
    features3: "Stackable for efficient transport",
    features4: "Secure and weatherproof design",
    features5: "Easy access with double doors",
    features6: "Versatile for various cargo types",
    features7: "Durable construction for long-term use",
    additionalImages: "h",
    preOrder: true,
    deliveryOptions: ["Standard Delivery", "Express Delivery", "Pickup"],
    features: [
      "Wind and water tight",
      "Cargo worthy",
      "CSC plated",
      "Lockable doors",
      "Easy to load and unload",
      "Durable construction for long-term use",
      "Versatile for various cargo types",
      "Easy access with double doors",
      "Secure locking system for safe transport",
      "Extra height for maximum storage",
      "intergrated cooling system",
      "Extra Height ",
    ],
  },
];
