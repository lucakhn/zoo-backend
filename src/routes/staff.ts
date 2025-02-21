import { Hono } from "hono";
import { StaffModel } from "../models/staff.js";
import { HTTPException } from "hono/http-exception";

export const staffRouter = new Hono();

staffRouter.get("/", async (c) => {
  try {
    const staff = await StaffModel.findAll();
    return c.json({ data: staff }, 200);
  } catch (error) {
    console.error(error);
    throw new HTTPException(404, { message: "No Staff found" });
  }
});
