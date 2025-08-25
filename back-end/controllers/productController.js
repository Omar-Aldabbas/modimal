import prisma from "../src/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await prisma.product.findMany({
    include: {
      variants: true,
      pics: true,
      tags: true,
      season: true,
    },
  });

  if (!products) return next(new AppError("There is no Products yet!", 404));

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

export const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      variants: true,
      pics: true,
      tags: true,
      season: true,
    },
  });

  if (!product) return next(new AppError("Product not found", 404));

  res.status(200).json({
    status: "success",
    data: product,
  });
});

export const createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, seasonId, mainPic, variants, tags, pics } =
    req.body;

  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
      seasonId,
      mainPic,
      variants: { create: variants }, // [{size, color, quantity}, ...]
      tags: { create: tags }, // [{name}, ...]
      pics: { create: pics }, // [{url, isMain}, ...]
    },
    include: { variants: true, tags: true, pics: true, season: true },
  });

  res.status(201).json({
    status: "success",
    message: "Product created",
    data: newProduct,
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, seasonId, mainPic } = req.body;

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id) },
    data: { name, description, price, seasonId, mainPic },
    include: { variants: true, tags: true, pics: true, season: true },
  });

  res.status(200).json({
    status: "success",
    message: "Product updated",
    data: updatedProduct,
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await prisma.product.delete({ where: { id: parseInt(id) } });

  res.status(200).json({
    status: "success",
    message: "Product deleted",
  });
});
