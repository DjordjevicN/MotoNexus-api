import { z } from "zod";

export const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const UserCreateSchema = z.object({
  body: z
    .object({
      displayName: z.string().min(2).max(50),
      email: z.string().email().max(120),
      password: z.string().min(6).max(128),
      avatarUrl: z.string().url().optional(),
      city: z.string().min(2).max(100),
      country: z.string().min(2).max(100),
      subscription: z.enum(["free", "premium"]).optional(),
    })
    .strict(),
});

export const UserUpdateSchema = z.object({
  params: z.object({ id: objectId }),
  body: z
    .object({
      displayName: z.string().min(2).max(50).optional(),
      email: z.string().email().max(120).optional(),
      password: z.string().min(6).max(128).optional(),
      avatarUrl: z.string().url().optional(),
      city: z.string().min(2).max(100).optional(),
      country: z.string().min(2).max(100).optional(),
      subscription: z.enum(["free", "premium"]).optional(),
    })
    .strict()
    .refine((v) => Object.keys(v).length > 0, {
      message: "Provide at least one field to update",
    }),
});

export const UserIdParamSchema = z.object({
  params: z.object({ id: objectId }),
});

export const UserListQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    pageSize: z.coerce.number().int().min(1).max(100).default(20),
  }),
});
