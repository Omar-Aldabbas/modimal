// controllers/cartController.js
import prisma from "../src/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// Helper: include product info in cart
const includeCartItems = {
  include: {
    items: {
      include: {
        product: true,
      },
    },
  },
};

// ======================
// GET CART (for logged in user)
// ======================
export const getCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id; // comes from auth middleware

  let cart = await prisma.cart.findUnique({
    where: { userId },
    ...includeCartItems,
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      ...includeCartItems,
    });
  }

  res.status(200).json({
    status: "success",
    data: cart,
  });
});

// ======================
// ADD ITEM TO CART
// ======================
export const addToCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  let cart = await prisma.cart.findUnique({
    where: { userId },
    ...includeCartItems,
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      ...includeCartItems,
    });
  }

  // Check if product already exists in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + (quantity || 1) },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: quantity || 1,
      },
    });
  }

  const updatedCart = await prisma.cart.findUnique({
    where: { userId },
    ...includeCartItems,
  });

  res.status(200).json({
    status: "success",
    message: "Item added to cart",
    data: updatedCart,
  });
});

// ======================
// UPDATE ITEM QUANTITY
// ======================
export const updateCartItem = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) return next(new AppError("Cart not found", 404));

  const item = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (!item) return next(new AppError("Item not in cart", 404));

  if (quantity <= 0) {
    await prisma.cartItem.delete({
      where: { id: item.id },
    });
  } else {
    await prisma.cartItem.update({
      where: { id: item.id },
      data: { quantity },
    });
  }

  const updatedCart = await prisma.cart.findUnique({
    where: { userId },
    ...includeCartItems,
  });

  res.status(200).json({
    status: "success",
    message: "Cart updated",
    data: updatedCart,
  });
});

// ======================
// REMOVE ITEM FROM CART
// ======================
export const removeFromCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { productId } = req.body;

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) return next(new AppError("Cart not found", 404));

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });

  const updatedCart = await prisma.cart.findUnique({
    where: { userId },
    ...includeCartItems,
  });

  res.status(200).json({
    status: "success",
    message: "Item removed from cart",
    data: updatedCart,
  });
});

// ======================
// CLEAR CART
// ======================
export const clearCart = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) return next(new AppError("Cart not found", 404));

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  res.status(200).json({
    status: "success",
    message: "Cart cleared",
  });
});
