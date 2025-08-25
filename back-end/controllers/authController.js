import prisma from "../src/db.js";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email.js";


const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });


export const signup = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm)
    return next(new AppError("Passwords do not match", 400));

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
    select: { id: true, username: true, email: true, role: true },
  });

  const token = signToken(newUser.id);

  res.status(201).json({ status: "success", token, data: newUser });
});


export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  const token = signToken(user.id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});


export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return next(new AppError("You are not logged in", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id },
  });
  if (!currentUser) return next(new AppError("User no longer exists", 401));

  req.user = currentUser;
  next();
});


export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("You do not have permission", 403));
    next();
  };


export const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, passwordConfirm } = req.body;
  const userId = req.user.id;

  if (newPassword !== passwordConfirm)
    return next(new AppError("Passwords do not match", 400));

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!(await bcrypt.compare(currentPassword, user.password)))
    return next(new AppError("Current password is incorrect", 401));

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  res
    .status(200)
    .json({ status: "success", message: "Password updated successfully" });
});

// ----------------------
// Forgot Password
// ----------------------
export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return next(new AppError("No user with that email", 404));

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordResetToken: hashedToken, passwordResetExpires: expires },
  });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/reset-password/${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: "Password reset",
    text: `Reset your password: ${resetURL}`,
  });

  res.status(200).json({ status: "success", message: "Token sent to email!" });
});

// ----------------------
// Reset Password
// ----------------------
export const resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { newPassword, passwordConfirm } = req.body;

  if (newPassword !== passwordConfirm)
    return next(new AppError("Passwords do not match", 400));

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await prisma.user.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { gt: new Date() },
    },
  });
  if (!user) return next(new AppError("Token is invalid or expired", 400));

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
  });

  const jwtToken = signToken(user.id);
  res
    .status(200)
    .json({
      status: "success",
      token: jwtToken,
      message: "Password reset successfully",
    });
});


