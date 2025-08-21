import { Request, Response } from "express";
import { Motorcycle } from "../models/motorcycle.model.js";

export const createMotorcycle = async (req: Request, res: Response) => {
  const motorcycle = new Motorcycle(req.body);
  await motorcycle.save();
  res.status(201).json(motorcycle);
};

export const updateMotorcycle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const motorcycle = await Motorcycle.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!motorcycle) {
    return res.status(404).json({ error: "Motorcycle not found" });
  }
  res.json(motorcycle);
};

export const deleteMotorcycle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const motorcycle = await Motorcycle.findByIdAndDelete(id);
  if (!motorcycle) {
    return res.status(404).json({ error: "Motorcycle not found" });
  }
  res.status(204).send();
};

export const getMotorcycleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const motorcycle = await Motorcycle.findById(id);
  if (!motorcycle) {
    return res.status(404).json({ error: "Motorcycle not found" });
  }
  res.json(motorcycle);
};

const addRange = (filter: any, field: string, min?: number, max?: number) => {
  if (min != null || max != null) {
    filter[field] = {
      ...(min != null ? { $gte: min } : {}),
      ...(max != null ? { $lte: max } : {}),
    };
  }
};

export const listMotorcycles = async (req: Request, res: Response) => {
  const {
    owner,
    make,
    model,
    priceMin,
    priceMax,
    engineMin,
    engineMax,
    hpMin,
    hpMax,
    mileageMin,
    mileageMax,
    motorcycleType,
    types,
    page = 1,
    limit = 20,
  } = req.query as any;

  const filter: any = {};

  if (owner) filter.owner = owner;
  if (make) filter.make = new RegExp(`^${make}$`, "i");
  if (model) filter.model = new RegExp(`^${model}$`, "i");

  addRange(filter, "price", Number(priceMin), Number(priceMax));
  addRange(filter, "engineCapacity", Number(engineMin), Number(engineMax));
  addRange(filter, "horsepower", Number(hpMin), Number(hpMax));
  addRange(filter, "mileage", Number(mileageMin), Number(mileageMax));

  if (motorcycleType) filter.motorcycleType = motorcycleType;

  // support CSV list: ?types=sport,adventure
  if (types) {
    const arr = String(types)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (arr.length) filter.motorcycleType = { $in: arr };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [data, total] = await Promise.all([
    Motorcycle.find(filter).skip(skip).limit(Number(limit)).lean(),
    Motorcycle.countDocuments(filter),
  ]);

  res.json({
    data,
    page: Number(page),
    limit: Number(limit),
    total,
    hasMore: Number(page) * Number(limit) < total,
  });
};
