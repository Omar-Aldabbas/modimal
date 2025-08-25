export const FakeProducts = [
  {
    id: 101,
    name: "Classic Winter Jacket",
    season: "Winter",
    mainPic: "https://example.com/images/jacket-main.jpg",
    pics: ["https://example.com/images/jacket-1.jpg","https://example.com/images/jacket-2.jpg","https://example.com/images/jacket-3.jpg"],
    variants: [
      { size: "S", color: "Black", quantity: 5 },
      { size: "M", color: "Black", quantity: 8 },
      { size: "L", color: "Black", quantity: 4 },
      { size: "S", color: "Navy", quantity: 6 },
      { size: "M", color: "Navy", quantity: 7 },
      { size: "L", color: "Navy", quantity: 3 }
    ],
    sales: 120,
    createdAt: "2025-01-15T10:30:00Z"
  },
  {
    id: 102,
    name: "Autumn Knit Sweater",
    season: "Fall",
    mainPic: "https://example.com/images/sweater-main.jpg",
    pics: ["https://example.com/images/sweater-1.jpg","https://example.com/images/sweater-2.jpg"],
    variants: [
      { size: "S", color: "Beige", quantity: 10 },
      { size: "M", color: "Beige", quantity: 12 },
      { size: "L", color: "Beige", quantity: 8 },
      { size: "S", color: "Rust", quantity: 7 },
      { size: "M", color: "Rust", quantity: 9 },
      { size: "L", color: "Rust", quantity: 5 }
    ],
    sales: 85,
    createdAt: "2025-02-10T12:00:00Z"
  },
  {
    id: 103,
    name: "Spring Floral Dress",
    season: "Spring",
    mainPic: "https://example.com/images/dress-main.jpg",
    pics: ["https://example.com/images/dress-1.jpg","https://example.com/images/dress-2.jpg","https://example.com/images/dress-3.jpg"],
    variants: [
      { size: "XS", color: "Pink", quantity: 6 },
      { size: "S", color: "Pink", quantity: 8 },
      { size: "M", color: "Pink", quantity: 10 },
      { size: "XS", color: "Mint", quantity: 5 },
      { size: "S", color: "Mint", quantity: 7 },
      { size: "M", color: "Mint", quantity: 9 }
    ],
    sales: 60,
    createdAt: "2025-03-05T09:15:00Z"
  },
  {
    id: 104,
    name: "Summer Casual Shorts",
    season: "Summer",
    mainPic: "https://example.com/images/shorts-main.jpg",
    pics: ["https://example.com/images/shorts-1.jpg","https://example.com/images/shorts-2.jpg"],
    variants: [
      { size: "M", color: "Blue", quantity: 15 },
      { size: "L", color: "Blue", quantity: 12 },
      { size: "XL", color: "Blue", quantity: 10 },
      { size: "M", color: "Khaki", quantity: 8 },
      { size: "L", color: "Khaki", quantity: 6 },
      { size: "XL", color: "Khaki", quantity: 4 }
    ],
    sales: 95,
    createdAt: "2025-04-01T14:45:00Z"
  },
  {
    id: 105,
    name: "Leather Winter Boots",
    season: "Winter",
    mainPic: "https://example.com/images/boots-main.jpg",
    pics: ["https://example.com/images/boots-1.jpg","https://example.com/images/boots-2.jpg"],
    variants: [
      { size: "38", color: "Black", quantity: 10 },
      { size: "39", color: "Black", quantity: 8 },
      { size: "40", color: "Brown", quantity: 5 },
      { size: "41", color: "Brown", quantity: 6 }
    ],
    sales: 75,
    createdAt: "2025-01-20T11:00:00Z"
  },
  {
    id: 106,
    name: "Cozy Wool Scarf",
    season: "Fall",
    mainPic: "https://example.com/images/scarf-main.jpg",
    pics: ["https://example.com/images/scarf-1.jpg","https://example.com/images/scarf-2.jpg"],
    variants: [
      { size: "One Size", color: "Beige", quantity: 20 },
      { size: "One Size", color: "Gray", quantity: 15 },
      { size: "One Size", color: "Rust", quantity: 12 }
    ],
    sales: 50,
    createdAt: "2025-02-15T13:30:00Z"
  },
  {
    id: 107,
    name: "Summer Linen Shirt",
    season: "Summer",
    mainPic: "https://example.com/images/linen-shirt-main.jpg",
    pics: ["https://example.com/images/linen-shirt-1.jpg","https://example.com/images/linen-shirt-2.jpg"],
    variants: [
      { size: "S", color: "White", quantity: 10 },
      { size: "M", color: "White", quantity: 12 },
      { size: "L", color: "Blue", quantity: 8 },
      { size: "XL", color: "Blue", quantity: 6 }
    ],
    sales: 65,
    createdAt: "2025-03-12T10:20:00Z"
  },
  {
    id: 108,
    name: "Casual Denim Jeans",
    season: "All Seasons",
    mainPic: "https://example.com/images/jeans-main.jpg",
    pics: ["https://example.com/images/jeans-1.jpg","https://example.com/images/jeans-2.jpg"],
    variants: [
      { size: "S", color: "Blue", quantity: 12 },
      { size: "M", color: "Blue", quantity: 14 },
      { size: "L", color: "Blue", quantity: 10 },
      { size: "XL", color: "Black", quantity: 8 }
    ],
    sales: 110,
    createdAt: "2025-04-05T09:45:00Z"
  },
  {
    id: 109,
    name: "Elegant Evening Dress",
    season: "Spring",
    mainPic: "https://example.com/images/evening-dress-main.jpg",
    pics: ["https://example.com/images/evening-dress-1.jpg","https://example.com/images/evening-dress-2.jpg"],
    variants: [
      { size: "S", color: "Red", quantity: 4 },
      { size: "M", color: "Red", quantity: 6 },
      { size: "L", color: "Black", quantity: 3 },
      { size: "M", color: "Black", quantity: 5 }
    ],
    sales: 80,
    createdAt: "2025-03-20T14:00:00Z"
  },
  {
    id: 110,
    name: "Athletic Running Shoes",
    season: "All Seasons",
    mainPic: "https://example.com/images/shoes-main.jpg",
    pics: ["https://example.com/images/shoes-1.jpg","https://example.com/images/shoes-2.jpg","https://example.com/images/shoes-3.jpg"],
    variants: [
      { size: "38", color: "White", quantity: 8 },
      { size: "39", color: "White", quantity: 10 },
      { size: "40", color: "Black", quantity: 6 },
      { size: "41", color: "Black", quantity: 5 }
    ],
    sales: 150,
    createdAt: "2025-01-30T12:15:00Z"
  },

];
