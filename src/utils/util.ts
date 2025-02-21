import { getPool } from "../db/db.js";

export async function getRowCount(tableName: string) {
  const result = await getPool().query(
    `SELECT (reltuples / relpages * (pg_relation_size(oid) / 8192))::bigint
        FROM   pg_class
        WHERE  oid = $1::regclass;`,
    [tableName]
  );
  return result.rows[0];
}
