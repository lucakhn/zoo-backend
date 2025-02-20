import { getPool } from "../db/db.js";
import type { Gehege } from "../types.js";

export class CompoundModel {
  static async findAll() {
    const result = await getPool().query(`SELECT * FROM "Gehege"`);
    return result.rows;
  }

  static async findCompound(id: string) {
    const values = [id];
    const result = await getPool().query(
      `SELECT * FROM "Gehege" WHERE id = $1`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async addCompound(data: Gehege) {
    const values = [data.groesse, data.instandhaltungskosten, data.name];

    const result = await getPool().query(
      `INSERT INTO "Gehege" (groesse,instandhaltungskosten,name)
      VALUES ($1, $2, $3)
      RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async updateCompound(id: string, data: Gehege) {
    const values = [
      data.groesse,
      data.instandhaltungskosten,
      data.name,
      data.id,
    ];
    const result = await getPool().query(
      `UPDATE "Gehege" 
        SET groesse = $1, instandhaltungskosten = $2, name = $3
        WHERE id = $4
        RETURNING *`,
      values
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async updateCompoundVariable(id: string, data: Gehege) {
    const values = [data.groesse, data.instandhaltungskosten, data.name, id];

    const result = await getPool().query(
      `UPDATE "Gehege" 
          SET groesse = COALESCE($1,groesse),instandhaltungskosten = COALESCE($2,instandhaltungskosten), name = COALESCE($3,name)
          WHERE id = $4
          RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }

  static async deleteCompound(id: string) {
    const values = [id];
    const result = await getPool().query(
      `DELETE FROM "Gehege" WHERE id = $1 RETURNING *`,
      values
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }
  }
}
