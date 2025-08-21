import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";
import { deleteUserCascade } from "./deleteUserCascade.js";

export const createUser = async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashedPassword });
  res.status(201).json(user);
};

export const getUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find().skip(skip).limit(limit).lean();
  const totalUsers = await User.countDocuments();

  res.json({
    data: users,
    page,
    limit,
    totalPages: Math.ceil(totalUsers / limit),
    totalUsers,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password as string);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user._id });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60,
  });

  res.json({ message: "Login successful", user });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).lean();
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserCascade(req.params.id);
  res.status(204).end();
};
