import { HTTPException } from "hono/http-exception";
import { getPool } from "../db/db.js";
import type { Tier } from "../types.js";

export class AnimalModel {
  static async findAll() {
    const result = await getPool().query(`SELECT * FROM tier`);

    if (result.rowCount === 0) {
      throw new HTTPException(404, { message: "No animals found" });
    }
    return result.rows;
  }

  static async findAnimalbyId(id: string) {
    const result = await getPool().query(`SELECT * FROM tier WHERE id = $1`, [
      id,
    ]);

    if (result.rowCount === 0) {
      throw new HTTPException(404, { message: "No animal found" });
    }
    return result.rows[0];
  }

  static async addAnimal(animal: Tier) {
    // Constraints
    // 1. Tier darf niemals ohne Tierarzt existieren
    // 2. Tierarzt max 25 Tiere
    // 3. Tier muss in Gehege passen (Kapazität)

    const values = [animal.name, animal.gehege_id, animal.tierarzt_id];

    const result = await getPool().query(
      `INSERT INTO tier (name, gehege_id, tierarzt_id) VALUES ($1, $2, $3) RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async deleteAnimal(id: string) {
    const result = await getPool().query(
      `DELETE FROM tier WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async updateAnimal(id: string, animal: Tier) {
    const values = [animal.name, animal.gehege_id, animal.tierarzt_id, id];

    const result = await getPool().query(
      `UPDATE tier SET name = $1, gehege_id = $2, tierarzt_id = $3 WHERE id = $4 RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async updateAnimalDetail(id: string, animal: Tier) {
    const values = [animal.name, animal.gehege_id, animal.tierarzt_id, id];

    const result = await getPool().query(
      `UPDATE tier SET name = COALESCE($1, name), gehege_id = COALESCE($2, gehege_id), tierarzt_id = COALESCE($3, tierarzt_id) WHERE id = $4 RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }
}
