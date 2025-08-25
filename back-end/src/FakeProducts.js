export const fakeProducts = [
  {
    name: "A.S.I Suit",
    description: "Premium tailored A.S.I suit for formal occasions.",
    price: 120.99,
    seasonId: 1,
    mainPic: "a-s-i-suit.jpg",
    variants: {
      create: [
        { size: "S", color: "Black", quantity: 10 },
        { size: "M", color: "Black", quantity: 15 },
        { size: "L", color: "Gray", quantity: 8 },
      ],
    },
    tags: { create: [{ name: "Suit" }] },
    pics: {
      create: [
        { url: "a-s-i-suit.jpg", isMain: true },
        { url: "a-s-i-suit.jpg", isMain: false },
        { url: "a-s-i-suit.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Adidas Blue Hoodie",
    description: "Comfortable Adidas blue hoodie for everyday wear.",
    price: 59.99,
    seasonId: 2,
    mainPic: "adidas-blue-hoodie.jpg",
    variants: {
      create: [
        { size: "S", color: "Blue", quantity: 12 },
        { size: "M", color: "Blue", quantity: 18 },
        { size: "L", color: "Blue", quantity: 9 },
      ],
    },
    tags: { create: [{ name: "Hoodie" }] },
    pics: {
      create: [
        { url: "adidas-blue-hoodie.jpg", isMain: true },
        { url: "adidas-blue-hoodie.jpg", isMain: false },
        { url: "adidas-blue-hoodie.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Adidas Soccer Jersey",
    description: "Official Adidas soccer jersey, breathable and sporty.",
    price: 79.99,
    seasonId: 2,
    mainPic: "adidas-soccer-jersey.jpg",
    variants: {
      create: [
        { size: "S", color: "White", quantity: 14 },
        { size: "M", color: "White", quantity: 20 },
        { size: "L", color: "White", quantity: 10 },
      ],
    },
    tags: { create: [{ name: "Jersey" }, { name: "Sports" }] },
    pics: {
      create: [
        { url: "adidas-soccer-jersey.jpg", isMain: true },
        { url: "adidas-soccer-jersey.jpg", isMain: false },
        { url: "adidas-soccer-jersey.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Blue Check Shirt",
    description: "Casual blue check shirt for men.",
    price: 45.5,
    seasonId: 1,
    mainPic: "blue-check-shirt.jpg",
    variants: {
      create: [
        { size: "S", color: "Blue", quantity: 10 },
        { size: "M", color: "Blue", quantity: 12 },
        { size: "L", color: "Blue", quantity: 8 },
      ],
    },
    tags: { create: [{ name: "Shirt" }] },
    pics: {
      create: [
        { url: "blue-check-shirt.jpg", isMain: true },
        { url: "blue-check-shirt.jpg", isMain: false },
        { url: "blue-check-shirt.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Black Dress",
    description: "Elegant black dress, perfect for evening occasions.",
    price: 99.99,
    seasonId: 3,
    mainPic: "black-dress.jpg",
    variants: {
      create: [
        { size: "S", color: "Black", quantity: 7 },
        { size: "M", color: "Black", quantity: 12 },
        { size: "L", color: "Black", quantity: 9 },
      ],
    },
    tags: { create: [{ name: "Dress" }] },
    pics: {
      create: [
        { url: "black-dress.jpg", isMain: true },
        { url: "black-dress.jpg", isMain: false },
        { url: "black-dress.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Brown Jacket",
    description: "Warm brown leather jacket with stylish fit.",
    price: 150.0,
    seasonId: 4,
    mainPic: "brown-jacket.jpg",
    variants: {
      create: [
        { size: "M", color: "Brown", quantity: 15 },
        { size: "L", color: "Brown", quantity: 10 },
        { size: "XL", color: "Brown", quantity: 6 },
      ],
    },
    tags: { create: [{ name: "Jacket" }] },
    pics: {
      create: [
        { url: "brown-jacket.jpg", isMain: true },
        { url: "brown-jacket.jpg", isMain: false },
        { url: "brown-jacket.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Classic White Tee",
    description: "Basic white t-shirt, cotton material.",
    price: 25.0,
    seasonId: 2,
    mainPic: "classic-white-tee.jpg",
    variants: {
      create: [
        { size: "S", color: "White", quantity: 20 },
        { size: "M", color: "White", quantity: 25 },
        { size: "L", color: "White", quantity: 15 },
      ],
    },
    tags: { create: [{ name: "T-shirt" }] },
    pics: {
      create: [
        { url: "classic-white-tee.jpg", isMain: true },
        { url: "classic-white-tee.jpg", isMain: false },
        { url: "classic-white-tee.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Denim Jacket",
    description: "Trendy denim jacket with slim fit.",
    price: 130.5,
    seasonId: 1,
    mainPic: "denim-jacket.jpg",
    variants: {
      create: [
        { size: "M", color: "Blue", quantity: 10 },
        { size: "L", color: "Blue", quantity: 7 },
        { size: "XL", color: "Blue", quantity: 5 },
      ],
    },
    tags: { create: [{ name: "Jacket" }] },
    pics: {
      create: [
        { url: "denim-jacket.jpg", isMain: true },
        { url: "denim-jacket.jpg", isMain: false },
        { url: "denim-jacket.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Floral Summer Dress",
    description: "Light floral dress for summer vibes.",
    price: 89.0,
    seasonId: 2,
    mainPic: "floral-summer-dress.jpg",
    variants: {
      create: [
        { size: "S", color: "Multicolor", quantity: 12 },
        { size: "M", color: "Multicolor", quantity: 10 },
        { size: "L", color: "Multicolor", quantity: 8 },
      ],
    },
    tags: { create: [{ name: "Dress" }, { name: "Summer" }] },
    pics: {
      create: [
        { url: "floral-summer-dress.jpg", isMain: true },
        { url: "floral-summer-dress.jpg", isMain: false },
        { url: "floral-summer-dress.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Green Hoodie",
    description: "Cozy green hoodie for casual wear.",
    price: 55.0,
    seasonId: 4,
    mainPic: "green-hoodie.jpg",
    variants: {
      create: [
        { size: "S", color: "Green", quantity: 10 },
        { size: "M", color: "Green", quantity: 12 },
        { size: "L", color: "Green", quantity: 9 },
      ],
    },
    tags: { create: [{ name: "Hoodie" }] },
    pics: {
      create: [
        { url: "green-hoodie.jpg", isMain: true },
        { url: "green-hoodie.jpg", isMain: false },
        { url: "green-hoodie.jpg", isMain: false },
      ],
    },
  },

  {
    name: "Grey Sweatpants",
    description: "Soft cotton grey sweatpants for lounging and casual wear.",
    price: 40.0,
    seasonId: 4,
    mainPic: "grey-sweatpants.jpg",
    variants: {
      create: [
        { size: "S", color: "Grey", quantity: 12 },
        { size: "M", color: "Grey", quantity: 15 },
        { size: "L", color: "Grey", quantity: 9 },
      ],
    },
    tags: { create: [{ name: "Pants" }] },
    pics: {
      create: [
        { url: "grey-sweatpants.jpg", isMain: true },
        { url: "grey-sweatpants.jpg", isMain: false },
        { url: "grey-sweatpants.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Leather Boots",
    description: "Durable brown leather boots for outdoor and street wear.",
    price: 160.0,
    seasonId: 4,
    mainPic: "leather-boots.jpg",
    variants: {
      create: [
        { size: "42", color: "Brown", quantity: 8 },
        { size: "43", color: "Brown", quantity: 10 },
        { size: "44", color: "Brown", quantity: 6 },
      ],
    },
    tags: { create: [{ name: "Shoes" }, { name: "Boots" }] },
    pics: {
      create: [
        { url: "leather-boots.jpg", isMain: true },
        { url: "leather-boots.jpg", isMain: false },
        { url: "leather-boots.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Navy Blazer",
    description: "Formal navy blue blazer with slim tailoring.",
    price: 140.0,
    seasonId: 1,
    mainPic: "navy-blazer.jpg",
    variants: {
      create: [
        { size: "M", color: "Navy", quantity: 10 },
        { size: "L", color: "Navy", quantity: 12 },
        { size: "XL", color: "Navy", quantity: 7 },
      ],
    },
    tags: { create: [{ name: "Blazer" }, { name: "Suit" }] },
    pics: {
      create: [
        { url: "navy-blazer.jpg", isMain: true },
        { url: "navy-blazer.jpg", isMain: false },
        { url: "navy-blazer.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Pink Summer Dress",
    description: "Lightweight pink dress for warm sunny days.",
    price: 70.0,
    seasonId: 2,
    mainPic: "pink-summer-dress.jpg",
    variants: {
      create: [
        { size: "S", color: "Pink", quantity: 12 },
        { size: "M", color: "Pink", quantity: 15 },
        { size: "L", color: "Pink", quantity: 8 },
      ],
    },
    tags: { create: [{ name: "Dress" }, { name: "Summer" }] },
    pics: {
      create: [
        { url: "pink-summer-dress.jpg", isMain: true },
        { url: "pink-summer-dress.jpg", isMain: false },
        { url: "pink-summer-dress.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Polo Shirt",
    description: "Classic polo shirt in navy cotton fabric.",
    price: 50.0,
    seasonId: 2,
    mainPic: "polo-shirt.jpg",
    variants: {
      create: [
        { size: "S", color: "Navy", quantity: 15 },
        { size: "M", color: "Navy", quantity: 18 },
        { size: "L", color: "Navy", quantity: 10 },
      ],
    },
    tags: { create: [{ name: "Shirt" }, { name: "Casual" }] },
    pics: {
      create: [
        { url: "polo-shirt.jpg", isMain: true },
        { url: "polo-shirt.jpg", isMain: false },
        { url: "polo-shirt.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Red High Heels",
    description: "Elegant red heels for evening occasions.",
    price: 110.0,
    seasonId: 3,
    mainPic: "red-high-heels.jpg",
    variants: {
      create: [
        { size: "37", color: "Red", quantity: 6 },
        { size: "38", color: "Red", quantity: 9 },
        { size: "39", color: "Red", quantity: 8 },
      ],
    },
    tags: { create: [{ name: "Shoes" }, { name: "Heels" }] },
    pics: {
      create: [
        { url: "red-high-heels.jpg", isMain: true },
        { url: "red-high-heels.jpg", isMain: false },
        { url: "red-high-heels.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Striped Shirt",
    description: "Cotton striped shirt in black and white.",
    price: 48.0,
    seasonId: 1,
    mainPic: "striped-shirt.jpg",
    variants: {
      create: [
        { size: "S", color: "Striped", quantity: 14 },
        { size: "M", color: "Striped", quantity: 10 },
        { size: "L", color: "Striped", quantity: 9 },
      ],
    },
    tags: { create: [{ name: "Shirt" }] },
    pics: {
      create: [
        { url: "striped-shirt.jpg", isMain: true },
        { url: "striped-shirt.jpg", isMain: false },
        { url: "striped-shirt.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Suede Loafers",
    description: "Soft brown suede loafers for casual and formal wear.",
    price: 95.0,
    seasonId: 2,
    mainPic: "suede-loafers.jpg",
    variants: {
      create: [
        { size: "42", color: "Brown", quantity: 10 },
        { size: "43", color: "Brown", quantity: 8 },
        { size: "44", color: "Brown", quantity: 5 },
      ],
    },
    tags: { create: [{ name: "Shoes" }, { name: "Loafers" }] },
    pics: {
      create: [
        { url: "suede-loafers.jpg", isMain: true },
        { url: "suede-loafers.jpg", isMain: false },
        { url: "suede-loafers.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Trench Coat",
    description: "Classic beige trench coat with waist belt.",
    price: 180.0,
    seasonId: 4,
    mainPic: "trench-coat.jpg",
    variants: {
      create: [
        { size: "M", color: "Beige", quantity: 7 },
        { size: "L", color: "Beige", quantity: 5 },
        { size: "XL", color: "Beige", quantity: 4 },
      ],
    },
    tags: { create: [{ name: "Coat" }] },
    pics: {
      create: [
        { url: "trench-coat.jpg", isMain: true },
        { url: "trench-coat.jpg", isMain: false },
        { url: "trench-coat.jpg", isMain: false },
      ],
    },
  },
  {
    name: "White Sneakers",
    description: "Classic white sneakers for everyday comfort.",
    price: 75.0,
    seasonId: 2,
    mainPic: "white-sneakers.jpg",
    variants: {
      create: [
        { size: "41", color: "White", quantity: 15 },
        { size: "42", color: "White", quantity: 12 },
        { size: "43", color: "White", quantity: 9 },
      ],
    },
    tags: { create: [{ name: "Shoes" }, { name: "Sneakers" }] },
    pics: {
      create: [
        { url: "white-sneakers.jpg", isMain: true },
        { url: "white-sneakers.jpg", isMain: false },
        { url: "white-sneakers.jpg", isMain: false },
      ],
    },
  },

  {
    name: "Wool Scarf",
    description: "Warm wool scarf for chilly winter days.",
    price: 35.0,
    seasonId: 4,
    mainPic: "wool-scarf.jpg",
    variants: {
      create: [{ size: "OneSize", color: "Grey", quantity: 20 }],
    },
    tags: { create: [{ name: "Accessories" }, { name: "Winter" }] },
    pics: {
      create: [
        { url: "wool-scarf.jpg", isMain: true },
        { url: "wool-scarf.jpg", isMain: false },
        { url: "wool-scarf.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Black Leather Jacket",
    description: "Classic black leather jacket with zipper pockets.",
    price: 220.0,
    seasonId: 4,
    mainPic: "black-leather-jacket.jpg",
    variants: {
      create: [
        { size: "M", color: "Black", quantity: 10 },
        { size: "L", color: "Black", quantity: 8 },
        { size: "XL", color: "Black", quantity: 5 },
      ],
    },
    tags: { create: [{ name: "Jacket" }, { name: "Leather" }] },
    pics: {
      create: [
        { url: "black-leather-jacket.jpg", isMain: true },
        { url: "black-leather-jacket.jpg", isMain: false },
        { url: "black-leather-jacket.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Denim Jeans",
    description: "Classic blue denim jeans for casual wear.",
    price: 60.0,
    seasonId: 2,
    mainPic: "denim-jeans.jpg",
    variants: {
      create: [
        { size: "S", color: "Blue", quantity: 15 },
        { size: "M", color: "Blue", quantity: 20 },
        { size: "L", color: "Blue", quantity: 12 },
      ],
    },
    tags: { create: [{ name: "Jeans" }] },
    pics: {
      create: [
        { url: "denim-jeans.jpg", isMain: true },
        { url: "denim-jeans.jpg", isMain: false },
        { url: "denim-jeans.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Floral Summer Dress",
    description: "Bright floral print dress, perfect for summer.",
    price: 80.0,
    seasonId: 2,
    mainPic: "floral-summer-dress.jpg",
    variants: {
      create: [
        { size: "S", color: "Floral", quantity: 12 },
        { size: "M", color: "Floral", quantity: 15 },
        { size: "L", color: "Floral", quantity: 10 },
      ],
    },
    tags: { create: [{ name: "Dress" }, { name: "Summer" }] },
    pics: {
      create: [
        { url: "floral-summer-dress.jpg", isMain: true },
        { url: "floral-summer-dress.jpg", isMain: false },
        { url: "floral-summer-dress.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Casual Hoodie",
    description: "Comfortable hoodie for everyday wear.",
    price: 55.0,
    seasonId: 3,
    mainPic: "casual-hoodie.jpg",
    variants: {
      create: [
        { size: "S", color: "Grey", quantity: 20 },
        { size: "M", color: "Grey", quantity: 18 },
        { size: "L", color: "Grey", quantity: 15 },
      ],
    },
    tags: { create: [{ name: "Hoodie" }, { name: "Casual" }] },
    pics: {
      create: [
        { url: "casual-hoodie.jpg", isMain: true },
        { url: "casual-hoodie.jpg", isMain: false },
        { url: "casual-hoodie.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Summer Sandals",
    description: "Lightweight sandals for hot summer days.",
    price: 45.0,
    seasonId: 2,
    mainPic: "summer-sandals.jpg",
    variants: {
      create: [
        { size: "36", color: "Beige", quantity: 15 },
        { size: "37", color: "Beige", quantity: 12 },
        { size: "38", color: "Beige", quantity: 10 },
      ],
    },
    tags: { create: [{ name: "Shoes" }, { name: "Sandals" }] },
    pics: {
      create: [
        { url: "summer-sandals.jpg", isMain: true },
        { url: "summer-sandals.jpg", isMain: false },
        { url: "summer-sandals.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Patterned Shirt",
    description:
      "Cotton shirt with modern patterns, suitable for office or casual wear.",
    price: 50.0,
    seasonId: 1,
    mainPic: "patterned-shirt.jpg",
    variants: {
      create: [
        { size: "S", color: "Patterned", quantity: 10 },
        { size: "M", color: "Patterned", quantity: 12 },
        { size: "L", color: "Patterned", quantity: 8 },
      ],
    },
    tags: { create: [{ name: "Shirt" }] },
    pics: {
      create: [
        { url: "patterned-shirt.jpg", isMain: true },
        { url: "patterned-shirt.jpg", isMain: false },
        { url: "patterned-shirt.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Winter Coat",
    description: "Thick winter coat with insulated lining.",
    price: 200.0,
    seasonId: 4,
    mainPic: "winter-coat.jpg",
    variants: {
      create: [
        { size: "M", color: "Black", quantity: 5 },
        { size: "L", color: "Black", quantity: 3 },
        { size: "XL", color: "Black", quantity: 2 },
      ],
    },
    tags: { create: [{ name: "Coat" }, { name: "Winter" }] },
    pics: {
      create: [
        { url: "winter-coat.jpg", isMain: true },
        { url: "winter-coat.jpg", isMain: false },
        { url: "winter-coat.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket for casual outfits.",
    price: 120.0,
    seasonId: 3,
    mainPic: "denim-jacket.jpg",
    variants: {
      create: [
        { size: "S", color: "Blue", quantity: 12 },
        { size: "M", color: "Blue", quantity: 15 },
        { size: "L", color: "Blue", quantity: 10 },
      ],
    },
    tags: { create: [{ name: "Jacket" }, { name: "Denim" }] },
    pics: {
      create: [
        { url: "denim-jacket.jpg", isMain: true },
        { url: "denim-jacket.jpg", isMain: false },
        { url: "denim-jacket.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Classic Tee",
    description: "Simple cotton T-shirt for everyday comfort.",
    price: 25.0,
    seasonId: 2,
    mainPic: "classic-tee.jpg",
    variants: {
      create: [
        { size: "S", color: "White", quantity: 20 },
        { size: "M", color: "White", quantity: 25 },
        { size: "L", color: "White", quantity: 18 },
      ],
    },
    tags: { create: [{ name: "Shirt" }, { name: "Casual" }] },
    pics: {
      create: [
        { url: "classic-tee.jpg", isMain: true },
        { url: "classic-tee.jpg", isMain: false },
        { url: "classic-tee.jpg", isMain: false },
      ],
    },
  },

  {
    name: "Sun Dress",
    description: "Light and breezy sundress perfect for summer.",
    price: 45.0,
    seasonId: 2,
    mainPic: "sun-dress.png",
    variants: {
      create: [
        { size: "S", color: "Yellow", quantity: 12 },
        { size: "M", color: "Yellow", quantity: 10 },
        { size: "L", color: "Yellow", quantity: 8 },
      ],
    },
    tags: { create: [{ name: "Dress" }, { name: "Summer" }] },
    pics: {
      create: [
        { url: "sun-dress.png", isMain: true },
        { url: "sun-dress.png", isMain: false },
        { url: "sun-dress.png", isMain: false },
      ],
    },
  },
  {
    name: "Sweater Lethal",
    description: "Thick sweater for winter, stylish and warm.",
    price: 60.0,
    seasonId: 4,
    mainPic: "sweater-lethal.png",
    variants: {
      create: [
        { size: "M", color: "Grey", quantity: 10 },
        { size: "L", color: "Grey", quantity: 8 },
        { size: "XL", color: "Grey", quantity: 5 },
      ],
    },
    tags: { create: [{ name: "Sweater" }, { name: "Winter" }] },
    pics: {
      create: [
        { url: "sweater-lethal.png", isMain: true },
        { url: "sweater-lethal.png", isMain: false },
        { url: "sweater-lethal.png", isMain: false },
      ],
    },
  },
  {
    name: "Tees",
    description: "Soft cotton tees, casual daily wear.",
    price: 25.0,
    seasonId: 2,
    mainPic: "tees.png",
    variants: {
      create: [
        { size: "S", color: "White", quantity: 15 },
        { size: "M", color: "White", quantity: 18 },
        { size: "L", color: "White", quantity: 12 },
      ],
    },
    tags: { create: [{ name: "Shirt" }, { name: "Casual" }] },
    pics: {
      create: [
        { url: "tees.png", isMain: true },
        { url: "tees.png", isMain: false },
        { url: "tees.png", isMain: false },
      ],
    },
  },
  {
    name: "Tees2",
    description: "Colorful cotton tees for everyday outfits.",
    price: 27.0,
    seasonId: 2,
    mainPic: "tees2.png",
    variants: {
      create: [
        { size: "S", color: "Blue", quantity: 10 },
        { size: "M", color: "Blue", quantity: 12 },
        { size: "L", color: "Blue", quantity: 8 },
      ],
    },
    tags: { create: [{ name: "Shirt" }, { name: "Casual" }] },
    pics: {
      create: [
        { url: "tees2.png", isMain: true },
        { url: "tees2.png", isMain: false },
        { url: "tees2.png", isMain: false },
      ],
    },
  },
  {
    name: "Turtleneck Sweater",
    description: "Classic turtleneck sweater for winter.",
    price: 70.0,
    seasonId: 4,
    mainPic: "turtleneck-sweater.jpg",
    variants: {
      create: [
        { size: "M", color: "Beige", quantity: 8 },
        { size: "L", color: "Beige", quantity: 6 },
        { size: "XL", color: "Beige", quantity: 5 },
      ],
    },
    tags: { create: [{ name: "Sweater" }, { name: "Winter" }] },
    pics: {
      create: [
        { url: "turtleneck-sweater.jpg", isMain: true },
        { url: "turtleneck-sweater.jpg", isMain: false },
        { url: "turtleneck-sweater.jpg", isMain: false },
      ],
    },
  },
  {
    name: "Unique Dress",
    description: "Elegant unique design dress for special occasions.",
    price: 150.0,
    seasonId: 3,
    mainPic: "unique-dress.png",
    variants: {
      create: [
        { size: "S", color: "Red", quantity: 6 },
        { size: "M", color: "Red", quantity: 5 },
        { size: "L", color: "Red", quantity: 4 },
      ],
    },
    tags: { create: [{ name: "Dress" }, { name: "Evening" }] },
    pics: {
      create: [
        { url: "unique-dress.png", isMain: true },
        { url: "unique-dress.png", isMain: false },
        { url: "unique-dress.png", isMain: false },
      ],
    },
  },
  {
    name: "White Suit 2",
    description: "Stylish white suit for formal events.",
    price: 220.0,
    seasonId: 3,
    mainPic: "white-suit-2.png",
    variants: {
      create: [
        { size: "M", color: "White", quantity: 4 },
        { size: "L", color: "White", quantity: 3 },
        { size: "XL", color: "White", quantity: 2 },
      ],
    },
    tags: { create: [{ name: "Suit" }, { name: "Formal" }] },
    pics: {
      create: [
        { url: "white-suit-2.png", isMain: true },
        { url: "white-suit-2.png", isMain: false },
        { url: "white-suit-2.png", isMain: false },
      ],
    },
  },
  {
    name: "White Suit",
    description: "Elegant white formal suit with classic cut.",
    price: 210.0,
    seasonId: 3,
    mainPic: "white-suit.png",
    variants: {
      create: [
        { size: "M", color: "White", quantity: 5 },
        { size: "L", color: "White", quantity: 3 },
        { size: "XL", color: "White", quantity: 2 },
      ],
    },
    tags: { create: [{ name: "Suit" }, { name: "Formal" }] },
    pics: {
      create: [
        { url: "white-suit.png", isMain: true },
        { url: "white-suit.png", isMain: false },
        { url: "white-suit.png", isMain: false },
      ],
    },
  },
  {
    name: "Winter Essentials",
    description: "Bundle of winter essentials for cold weather.",
    price: 300.0,
    seasonId: 4,
    mainPic: "winter-essentials.png",
    variants: {
      create: [{ size: "OneSize", color: "Mix", quantity: 10 }],
    },
    tags: { create: [{ name: "Winter" }, { name: "Bundle" }] },
    pics: {
      create: [
        { url: "winter-essentials.png", isMain: true },
        { url: "winter-essentials.png", isMain: false },
        { url: "winter-essentials.png", isMain: false },
      ],
    },
  },
  {
    name: "YUS Formality Dress",
    description: "Formal dress with sophisticated design.",
    price: 180.0,
    seasonId: 3,
    mainPic: "YUS-formality-dress.png",
    variants: {
      create: [
        { size: "S", color: "Black", quantity: 5 },
        { size: "M", color: "Black", quantity: 4 },
        { size: "L", color: "Black", quantity: 3 },
      ],
    },
    tags: { create: [{ name: "Dress" }, { name: "Formal" }] },
    pics: {
      create: [
        { url: "YUS-formality-dress.png", isMain: true },
        { url: "YUS-formality-dress.png", isMain: false },
        { url: "YUS-formality-dress.png", isMain: false },
      ],
    },
  },
];
