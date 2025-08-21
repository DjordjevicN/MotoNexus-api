import Router from "express";
import { asyncH } from "../utils/asyncH.js";
import {
  createMotorcycle,
  deleteMotorcycle,
  getMotorcycleById,
  listMotorcycles,
  updateMotorcycle,
} from "../controllers/motorcycle.controller.js";

const r = Router();
r.get("/", asyncH(listMotorcycles));
// GET /motorcycles?priceMin=2000&priceMax=8000
// GET /motorcycles?engineMin=600&engineMax=900&hpMin=60
// GET /motorcycles?mileageMax=40000&types=sport,adventure
// GET /motorcycles?owner=66df...a123&motorcycleType=cruiser&page=1&limit=12
r.post("/", asyncH(createMotorcycle));
r.patch("/:id", asyncH(updateMotorcycle));
r.delete("/:id", asyncH(deleteMotorcycle));
r.get("/:id", asyncH(getMotorcycleById));

export default r;
