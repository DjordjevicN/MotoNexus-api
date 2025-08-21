import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  let status = 500;
  let code = "INTERNAL_ERROR";
  let message = "Unexpected error";

  if (err instanceof mongoose.Error.CastError) {
    status = 400;
    code = "BAD_ID";
    message = `Invalid ${err.path}`;
  } else if (err instanceof mongoose.Error.ValidationError) {
    status = 400;
    code = "VALIDATION_ERROR";
    message = err.message;
  } else if (err?.name === "MongoServerError" && err?.code === 11000) {
    status = 409;
    code = "DUPLICATE_KEY";
    const fields = Object.keys(err.keyPattern || {});
    message = `Duplicate value for ${fields.join(", ")}`;
  } else if (err?.status && err?.message) {
    status = err.status;
    code = err.code || "ERROR";
    message = err.message;
  }

  res.status(status).json({ code, message });
}
