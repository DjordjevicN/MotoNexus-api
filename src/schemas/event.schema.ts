import { z } from "zod";
export const MongoId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const EventCreateSchema = z.object({
  body: z.object({
    owner: MongoId.optional(),
    title: z.string().max(100),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    location: z
      .object({
        lat: z.number(),
        lng: z.number(),
      })
      .optional(),
    participants: z.array(MongoId).default([]).optional(),
    coverImageUrl: z.string().url().optional(),
    rules: z.array(z.string().min(2).max(500)).optional(),
    description: z.string().min(2).max(1000).optional(),
    maxRiders: z.number().min(1).optional(),
    createdAt: z
      .date()
      .default(() => new Date())
      .optional(),
    country: z.string().min(2).max(100).optional(),
    address: z.string().min(2).max(100).optional(),
    city: z.string().max(100).optional(),
    price: z.number().min(0).optional(),
    rideType: z
      .enum([
        "touring",
        "offRoad",
        "track",
        "city",
        "other",
        "parade",
        "noRide",
      ])
      .optional(),
  }),
});

export const EventUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(100).optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    location: z
      .object({
        name: z.string().min(2).max(100).optional(),
        lat: z.number().min(-90).max(90).optional(),
        lng: z.number().min(-180).max(180).optional(),
      })
      .optional(),
    participants: z.array(z.string().uuid()).optional(),
    coverImageUrl: z.string().url().optional(),
    rules: z.array(z.string().min(2).max(500)).optional(),
    description: z.string().min(2).max(1000).optional(),
    maxRiders: z.number().min(1).optional(),
    createdAt: z
      .date()
      .default(() => new Date())
      .optional(),
    country: z.string().min(2).max(100).optional(),
    address: z.string().min(2).max(100).optional(),
    city: z.string().min(2).max(100).optional(),
    price: z.number().min(0).optional(),
    rideType: z.string().min(2).max(100).optional(),
  }),
});
