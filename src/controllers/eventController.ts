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

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
export async function listEvents(req: Request, res: Response) {
  const {
    country,
    city,
    rideType,
    owner,
    startDate,
    endDate,
    page = "1",
    limit = "20",
    sort,
    order,
  } = req.query as Record<string, string | undefined>;

  const filter: any = {};

  if (country) filter.country = country.toUpperCase();
  if (city && city !== "All Cities")
    filter.city = new RegExp(`^${escapeRegExp(city)}$`, "i");
  if (rideType) filter.rideType = rideType;
  if (owner) filter.owner = owner;

  if (startDate && endDate) {
    filter.$and = [
      { startDate: { $lte: new Date(endDate) } },
      { endDate: { $gte: new Date(startDate) } },
    ];
  } else if (startDate) {
    filter.startDate = { $gte: new Date(startDate) };
  } else if (endDate) {
    filter.endDate = { $lte: new Date(endDate) };
  }

  const pageNum = Math.max(1, Number(page) || 1);
  const limitNum = Math.min(100, Math.max(1, Number(limit) || 20));
  const skip = (pageNum - 1) * limitNum;

  const sortField = sort && sort.length ? sort : "startDate";
  const sortDir = order === "desc" ? -1 : 1;

  const [data, total] = await Promise.all([
    Event.find(filter)
      .sort({ [sortField]: sortDir })
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Event.countDocuments(filter),
  ]);

  res.json({
    data,
    page: pageNum,
    limit: limitNum,
    total,
    hasMore: pageNum * limitNum < total,
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
export const getEventsByOwner = async (req: Request, res: Response) => {
  const { ownerId } = req.params;
  const events = await Event.find({ owner: ownerId });
  res.json(events);
};
