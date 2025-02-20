import { HTTPException } from "hono/http-exception";
import { getPool } from "../db/db.js";

export class StaffModel {
  static async findAll() {
    const result = await getPool().query(
      `SELECT p.id, b.bezeichnung FROM personal p JOIN beruf b ON p.beruf_id = b.id`
    );

    if (result.rowCount === 0) {
      throw new HTTPException(404, { message: "No Staff found" });
    }
    return result.rows;
  }

  static async getFreeVets() {
    const freeVets = await getPool().query(
      `SELECT p.id, COUNT(*) FROM personal p
        JOIN beruf b ON p.beruf_id = b.id
        JOIN tier t ON t.tierarzt_id = p.id
        WHERE b.bezeichnung = 'Tierarzt'
        GROUP BY p.id;`
    );

    if (freeVets.rowCount === 0) {
      throw new HTTPException(404, { message: "No Staff found" });
    }
    return freeVets.rows;
  }

  static async isVet(id: number) {
    const findVet = await getPool().query(
      `SELECT * FROM personal 
      JOIN beruf ON personal.beruf_id = beruf.id 
      WHERE personal.id = $1 
      AND beruf.bezeichnung LIKE 'Tierarzt'`,
      [id]
    );
    return findVet.rows.length > 0;
  }
}
