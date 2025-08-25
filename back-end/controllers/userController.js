import bcrypt from "bcryptjs";
import prisma from "../src/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";


export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

// ----------------------
// Get user by ID
// ----------------------
export const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  if (!user) return next(new AppError("User not found!", 404));

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

// ----------------------
// Update user
// ----------------------
export const updateUser = catchAsync(async (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id) && req.user.role !== "admin") {
    return next(new AppError("You cannot update this user", 403));
  }

  const { id } = req.params;
  const { password, username, role, email } = req.body;

  const data = {};
  if (username) data.username = username;
  if (email) data.email = email;
  if (role) data.role = role;
  if (password) data.password = await bcrypt.hash(password, 10);

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data,
    select: { id: true, username: true, email: true, role: true, createdAt: true },
  });

  res.status(200).json({
    status: "success",
    message: "User updated successfully",
    data: updatedUser,
  });
});

// ----------------------
// Delete user (admin)
// ----------------------
export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await prisma.user.delete({ where: { id: parseInt(id) } });

  res.status(200).json({
    status: "success",
    message: "User deleted",
  });
});

// ----------------------
// Get logged-in user profile
// ----------------------
export const getMe = catchAsync(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, username: true, email: true, role: true, createdAt: true },
  });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

// ----------------------
// Delete logged-in user account
// ----------------------
export const deleteMe = catchAsync(async (req, res, next) => {
  await prisma.user.delete({ where: { id: req.user.id } });

  res.status(204).json({
    status: "success",
    message: "Your account has been deleted",
    data: null,
  });
});
