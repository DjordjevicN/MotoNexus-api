import express from "express";
import helmet from "helmet";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import eventRoutes from "./routes/event.routes.js";
import motorcycleRoutes from "./routes/motorcycle.routes.js";
import cookieParser from "cookie-parser";
export const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://motonexus.nikola-djordjevic.com",
];
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed"), false);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// ROUTES
app.get("/listen", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});
app.use("/users", usersRoutes);
app.use("/events", eventRoutes);
app.use("/motorcycles", motorcycleRoutes);
