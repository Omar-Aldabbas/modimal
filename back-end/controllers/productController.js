import prisma from "../src/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// ======================
// GET ALL PRODUCTS
// ======================
export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await prisma.product.findMany({
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
      createdAt: true,
    },
  });

  if (!products.length) {
    return next(new AppError("There are no products yet!", 404));
  }

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
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
      createdAt: true,
    },
  });

  if (!product) return next(new AppError("Product not found", 404));

  res.status(200).json({
    status: "success",
    data: product,
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
      variants, // pass JSON directly
      tags, // pass array of strings
      pics, // pass array of strings
    },
  });

  res.status(201).json({
    status: "success",
    message: "Product created",
    data: newProduct,
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

  res.status(200).json({
    status: "success",
    message: "Product updated",
    data: updatedProduct,
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
    message: "Product deleted",
  });
});
