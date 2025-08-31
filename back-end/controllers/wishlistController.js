import prisma from "../src/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";


export const getWishlist = catchAsync(async (req, res, next) => {
  const wishlist = await prisma.wishlist.findMany({
    where: { userId: req.user.id },
    include: {
      product: true,
    },
  });

  res.status(200).json({
    status: "success",
    results: wishlist.length,
    data: wishlist.map((item) => item.product),
  });
});


export const addToWishlist = catchAsync(async (req, res, next) => {
  const { productId } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) },
  });
  if (!product) return next(new AppError("Product not found", 404));

  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_productId: { userId: req.user.id, productId: parseInt(productId) },
    },
  });
  if (existing) return next(new AppError("Already in wishlist", 400));

  const wishlistItem = await prisma.wishlist.create({
    data: { userId: req.user.id, productId: parseInt(productId) },
    include: { product: true },
  });

  res.status(201).json({
    status: "success",
    message: "Product added to wishlist",
    data: wishlistItem.product,
  });
});


export const removeFromWishlist = catchAsync(async (req, res, next) => {
  const { productId } = req.params;

  await prisma.wishlist.delete({
    where: {
      userId_productId: { userId: req.user.id, productId: parseInt(productId) },
    },
  });

  res.status(200).json({
    status: "success",
    message: "Removed from wishlist",
  });
});

export const clearWishlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  await prisma.wishlistItem.deleteMany({
    where: { userId },
  });

  res.status(200).json({
    status: "success",
    message: "Wishlist cleared successfully",
  });
});