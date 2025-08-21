import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: AnyZodObject, parts: ("body" | "query" | "params")[] = ["body"]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const input: Record<string, unknown> = {};
    for (const p of parts) input[p] = (req as any)[p];

    const parsed = schema.safeParse(input);

    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    for (const p of parts) {
      (req as any)[p] = (parsed.data as any)[p] ?? (req as any)[p];
    }

    next();
  };
