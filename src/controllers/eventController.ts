import { Request, Response } from "express";
import { Event } from "../models/event.model.js";

export const createEvent = async (req: Request, res: Response) => {
  const eventData = await Event.create(req.body);
  res.status(201).json(eventData);
};

export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const eventData = await Event.findByIdAndUpdate(id, req.body, { new: true });
  res.json(eventData);
};

export async function listEvents(req: Request, res: Response) {
  const {
    country,
    code,
    city,
    rideType,
    owner,
    from,
    to,
    page = 1,
    limit = 20,
    sort,
    order,
  } = req.query as any;

  const filter: any = {};
  if (code) filter.countryCode = String(code).toUpperCase(); //
  if (country) filter.country = new RegExp(`^${country}$`, "i");
  if (city) filter.city = new RegExp(`^${city}$`, "i");
  if (rideType) filter.rideType = rideType;
  if (owner) filter.owner = owner;
  if (from || to) {
    filter.startDate = {
      ...(from ? { $gte: new Date(from) } : {}),
      ...(to ? { $lte: new Date(to) } : {}),
    };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const sortSpec = { [sort]: order === "desc" ? -1 : 1 };

  const [data, total] = await Promise.all([
    Event.find(filter).sort(sortSpec).skip(skip).limit(Number(limit)).lean(),
    Event.countDocuments(filter),
  ]);

  res.json({
    data,
    page: Number(page),
    limit: Number(limit),
    total,
    hasMore: Number(page) * Number(limit) < total,
  });
}

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  res.sendStatus(204);
};

export const getEventById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) return res.sendStatus(404);
  res.json(event);
};
