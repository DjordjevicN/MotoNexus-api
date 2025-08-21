import { Router } from "express";

const r = Router();

r.get("/", (_req, res) => {
  res.json({ ok: true, msg: "dev route alive" });
});

export default r;
