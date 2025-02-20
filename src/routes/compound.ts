import { Hono } from "hono";
import { CompoundModel } from "../models/compound.js";

export const compoundRouter = new Hono();

compoundRouter.get("/", async (c) => {
  try {
    //Logik
    const compounds = await CompoundModel.findAll();
    return c.json(
      {
        data: compounds,
      },
      200
    );
  } catch (error) {
    //Error handling
    console.log(error);
    c.json(
      {
        error: "Something went wrong.",
      },
      404
    );
  }
});

compoundRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const findCompounds = await CompoundModel.findCompound(id);
    return c.json(
      {
        data: findCompounds,
      },
      200
    );
  } catch (error) {
    console.log(error);
    c.json(
      {
        error: "Something went wrong.",
      },
      404
    );
  }
});

compoundRouter.post("/", async (c) => {
  const body = await c.req.json();
  try {
    const addCompounds = await CompoundModel.addCompound(body);

    if (addCompounds) {
      return c.json(
        { message: "Compound created succesfully", data: addCompounds },
        200
      );
    }
  } catch (error) {
    console.error("Error create new Compound:", error);
    return c.text("Internal Server Error", 500);
  }
});

compoundRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updateCompound = await CompoundModel.updateCompound(id, body);

    if (updateCompound) {
      return c.json(
        { message: "Compound updated succesfully", data: updateCompound },
        200
      );
    } else {
      return c.text("Compound not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating Compound:", error);
    return c.text("Internal Server Error", 500);
  }
});

compoundRouter.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updateVariable = await CompoundModel.updateCompoundVariable(id, body);

    if (updateVariable) {
      return c.json(
        { message: "Compound updated succesfully", data: updateVariable },
        200
      );
    } else {
      return c.text("Compound not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating Compound:", error);
    return c.text("Internal Server Error", 500);
  }
});

compoundRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deleteCompound = await CompoundModel.deleteCompound(id);

    if (deleteCompound) {
      return c.json(
        { message: "Compound deleted succesfully", data: deleteCompound },
        200
      );
    } else {
      return c.text("Compound not found or delete failed", 404);
    }
  } catch (error) {
    console.error("Error delete Compound:", error);
    return c.text("Internal Server Error", 500);
  }
});
