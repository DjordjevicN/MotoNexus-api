import { Request, Response } from "express";
import { deleteUserCascade } from "../controllers/deleteUserCascade.js";

export async function deleteUserHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteUserCascade(id);
    return res.status(200).json({ message: "User and related data deleted." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Failed to delete user." });
  }
}
