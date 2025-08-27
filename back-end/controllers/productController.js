import prisma from "../src/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// ======================
// CONFIG
// ======================
const GITHUB_BASE_URL =
  "https://raw.githubusercontent.com/Omar-Aldabbas/modimal/main/back-end/public/images";

// Helper: prepend full URL to images
const mapImagesToURL = (product) => ({
  ...product,
  mainPic: product.mainPic ? `${GITHUB_BASE_URL}/${product.mainPic}` : "",
  pics: product.pics?.map((pic) => `${GITHUB_BASE_URL}/${pic}`) || [],
});

// ======================
// GET ALL PRODUCTS
// ======================
export const getAllProducts = catchAsync(async (req, res, next) => {
  const { season, tag, sort, limit, page, search, priceMin, priceMax } = req.query;

  const take = limit ? parseInt(limit) : 6;
  const currentPage = page ? parseInt(page) : 1;
  const skip = (currentPage - 1) * take;

  // Build filters
  const where = {
    ...(season && {
      season: season.charAt(0).toUpperCase() + season.slice(1).toLowerCase(),
    }),
    ...(tag && { tags: { has: tag } }),
    ...(search && { name: { contains: search, mode: "insensitive" } }),
    ...(priceMin && { price: { gte: Number(priceMin) } }),
    ...(priceMax && {
      price: {
        ...(priceMin ? { gte: Number(priceMin) } : {}),
        lte: Number(priceMax),
      },
    }),
  };

  // Sorting
  let orderBy = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };
  if (sort === "sales") orderBy = { sales: "desc" };

  const total = await prisma.product.count({ where });

  const products = await prisma.product.findMany({
    where,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      season: true,
      mainPic: true,
      pics: true,
      variants: true,
      tags: true,
      sales: true,
      createdAt: true,
    },
    orderBy,
    skip,
    take,
  });

  res.status(200).json({
    status: "success",
    results: products.length,
    total,
    page: currentPage,
    pages: Math.ceil(total / take),
    data: products.map(mapImagesToURL),
  });
});



// ======================
// GET TOP SELLERS
// ======================
export const getTopSellers = catchAsync(async (req, res, next) => {
  const products = await prisma.product.findMany({
    orderBy: { sales: "desc" },
    take: 10,
  });

  if (!products.length) return next(new AppError("No top sellers yet", 404));

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products.map(mapImagesToURL),
  });
});

// ======================
// GET NEW ITEMS
// ======================
export const getNewItems = catchAsync(async (req, res, next) => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  if (!products.length) return next(new AppError("No new items yet", 404));

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products.map(mapImagesToURL),
  });
});

// ======================
// GET PRODUCT BY ID
// ======================
export const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      season: true,
      mainPic: true,
      pics: true,
      variants: true,
      tags: true,
      sales: true,
      createdAt: true,
    },
  });

  if (!product) return next(new AppError("Product not found", 404));

  res.status(200).json({
    status: "success",
    data: mapImagesToURL(product),
  });
});

// ======================
// CREATE PRODUCT
// ======================
export const createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, season, mainPic, variants, tags, pics } =
    req.body;

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      season,
      mainPic,
      variants,
      tags,
      pics,
    },
  });

  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: mapImagesToURL(newProduct),
  });
});

// ======================
// UPDATE PRODUCT
// ======================
export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, season, mainPic, variants, tags, pics } =
    req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: { name, description, price, season, mainPic, variants, tags, pics },
  });

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: mapImagesToURL(updatedProduct),
  });
});

// ======================
// DELETE PRODUCT
// ======================
export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await prisma.product.delete({ where: { id: parseInt(id) } });

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});
