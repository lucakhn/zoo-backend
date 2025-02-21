import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { compoundRouter } from "./routes/compound.js";
import { cors } from "hono/cors";
import { animalRouter } from "./routes/animal.js";
import { staffRouter } from "./routes/staff.js";

const app = new Hono();

// cors
app.use(cors());

// Connecting routes
app.route("/compounds", compoundRouter);
app.route("/animals", animalRouter);
app.route("/staff", staffRouter);

app.get("/", async (c) => {
  return c.text("Hello Luca! ");
});

serve(
  {
    fetch: app.fetch,
    port: 8080,
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  }
);
