import { app } from "./app.js";
import mongoose from "mongoose";

const PORT = Number(process.env.PORT || 4000);
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/motonexus";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Mongo connected");
  app.listen(PORT, () =>
    console.log(`API running on http://localhost:${PORT}`)
  );
}

main().catch((e) => {
  console.error("Startup failed", e);
  process.exit(1);
});
