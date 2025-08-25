import prisma from "../src/db.js";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";


export const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { id: true, username: true, email: true } },
      items: {
        include: {
          product: { select: { id: true, name: true, price: true } },
          variant: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: orders,
  });
});


export const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: {
      user: { select: { id: true, username: true, email: true } },
      items: {
        include: {
          product: { select: { id: true, name: true, price: true } },
          variant: true,
        },
      },
    },
  });

  if (!order) return next(new AppError("Order not found", 404));

  res.status(200).json({
    status: "success",
    data: order,
  });
});

export const createOrder = catchAsync(async (req, res, next) => {
  const { userId, items } = req.body;
  // items = [{ productId, variantId?, quantity, price }, ...]

  if (!items || !items.length)
    return next(new AppError("No items provided", 400));

  const newOrder = await prisma.order.create({
    data: {
      userId,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || null,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      user: { select: { id: true, username: true } },
      items: {
        include: {
          product: { select: { id: true, name: true, price: true } },
          variant: true,
        },
      },
    },
  });

  res.status(201).json({
    status: "success",
    message: "Order created",
    data: newOrder,
  });
});


export const deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await prisma.order.delete({
    where: { id: parseInt(id) },
  });

  res.status(200).json({
    status: "success",
    message: "Order deleted",
  });
});

export const getMyOrders = catchAsync(async (req, res, next) => {
  const userId = req.user.id;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: { select: { id: true, name: true, price: true } },
          variant: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: orders,
  });
});

export const updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { status, items } = req.body; 
  // status: "pending", "shipped", "delivered", etc.
  // items: optional array to update items, e.g., quantity changes

  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: { items: true },
  });

  if (!order) return next(new AppError("Order not found", 404));

  const updatedOrder = await prisma.order.update({
    where: { id: parseInt(id) },
    data: {
      status: status || order.status,
      items: items
        ? {
            // Replace items with new ones (optional)
            deleteMany: {}, // remove old items
            create: items.map((item) => ({
              productId: item.productId,
              variantId: item.variantId || null,
              quantity: item.quantity,
              price: item.price,
            })),
          }
        : undefined,
    },
    include: {
      user: { select: { id: true, username: true, email: true } },
      items: {
        include: {
          product: { select: { id: true, name: true, price: true } },
          variant: true,
        },
      },
    },
  });

  res.status(200).json({
    status: "success",
    message: "Order updated",
    data: updatedOrder,
  });
});
