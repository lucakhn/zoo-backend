import { Hono } from "hono";
import { AnimalModel } from "../models/animal.js";
import { Tier_Schema } from "../types.js";

export const animalRouter = new Hono();

animalRouter.get("/", async (c) => {
  try {
    //Logik
    const animals = await AnimalModel.findAll();
    return c.json(
      {
        data: animals,
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

animalRouter.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const animal = await AnimalModel.findAnimalbyId(id);
    return c.json(
      {
        data: animal,
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

animalRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const result = await Tier_Schema.safeParseAsync(body);
    if (!result.success) return c.json({ error: result.error }, 400);
    return c.json(result.data);

    // const addAnimal = await AnimalModel.addAnimal(body);
    // if (addAnimal) {
    //   return c.json(
    //     { message: "Animal created succesfully", data: addAnimal },
    //     200
    //   );
    // }
  } catch (error) {
    if (error instanceof SyntaxError) {
      return c.json({
        error: "No JSON body provided",
      });
    }
    console.error("Error create new Animal:", error);
    return c.text("Internal Server Error", 500);
  }
});

animalRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updateAnimal = await AnimalModel.updateAnimal(id, body);

    if (updateAnimal) {
      return c.json(
        { message: "Animal updated succesfully", data: updateAnimal },
        200
      );
    } else {
      return c.text("Animal not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating Animal:", error);
    return c.text("Internal Server Error", 500);
  }
});

animalRouter.patch("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const updateVariable = await AnimalModel.updateAnimalDetail(id, body);

    if (updateVariable) {
      return c.json(
        { message: "Animal updated succesfully", data: updateVariable },
        200
      );
    } else {
      return c.text("Animal not found or update failed", 404);
    }
  } catch (error) {
    console.error("Error updating Animal:", error);
    return c.text("Internal Server Error", 500);
  }
});

animalRouter.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const deleteAnimal = await AnimalModel.deleteAnimal(id);

    if (deleteAnimal) {
      return c.json(
        { message: "Compound deleted succesfully", data: deleteAnimal },
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
