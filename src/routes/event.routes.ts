import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEventsByOwner,
  listEvents,
  updateEvent,
} from "../controllers/eventController.js";
import { validate } from "../middleware/validate.js";
import { EventCreateSchema } from "../schemas/event.schema.js";
import { asyncH } from "../utils/asyncH.js";
const r = Router();

// POST /api/events
r.post("/", validate(EventCreateSchema, ["body"]), asyncH(createEvent));

r.get("/", asyncH(listEvents));
r.get("/:id", asyncH(getEventById));
r.get("/owner/:ownerId", asyncH(getEventsByOwner));
r.patch("/:id", asyncH(updateEvent));
r.delete("/:id", asyncH(deleteEvent));
export default r;
