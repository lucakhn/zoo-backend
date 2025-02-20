import { z } from "zod";
import { StaffModel } from "./models/staff.js";

export const StandArtEnum = z.enum([
  "Eis",
  "Regenschirm",
  "Infokarte",
  "Burger",
]);

export const Gehege_Schema = z.object({
  id: z.number().optional(),
  groesse: z.number(),
  instandhaltungskosten: z.number(),
  name: z.string(),
});

export type Gehege = z.infer<typeof Gehege_Schema>;

export const Beruf_Schema = z.object({
  id: z.number().optional(),
  bezeichnung: z.string(),
});

export type Beruf = z.infer<typeof Beruf_Schema>;

export const Gehege_Personal_Schema = z.object({
  pfleger_id: z.number(),
  gehege_id: z.number(),
});

export type Gehege_Personal = z.infer<typeof Gehege_Personal_Schema>;

export const Personal_Schema = z.object({
  id: z.number().optional(),
  beruf_id: z.number(),
});
export type Personal = z.infer<typeof Personal_Schema>;

export const Spende_Schema = z.object({
  id: z.number().optional(),
  spender_name: z.string(),
  datum: z.date(),
  betrag: z.number(),
  beleg_url: z.string(),
});
export type Spende = z.infer<typeof Spende_Schema>;

export const Tier_Schema = z.object({
  id: z.number().optional(),
  name: z.string(),
  gehege_id: z.number(),
  tierarzt_id: z.number().refine(async (id) => await StaffModel.isVet(id), {
    message: "No Vet found with this id",
  }),
});
export type Tier = z.infer<typeof Tier_Schema>;

export const Umsatz_Schema = z.object({
  id: z.number().optional(),
  tagessumme: z.number(),
  datum: z.date(),
  stand_id: z.number(),
  spende_id: z.number(),
  is_eintritt: z.boolean(),
});
export type Umsatz = z.infer<typeof Umsatz_Schema>;

export const Verkaufsstand_Schema = z.object({
  id: z.number().optional(),
  stand_art: z.string(),
  verkaeufer_id: z.number(),
});
export type Verkaufsstand = z.infer<typeof Verkaufsstand_Schema>;

export const Zoo_Schema = z.object({
  kontostand: z.number(),
  eintritt: z.number(),
});
export type Zoo = z.infer<typeof Zoo_Schema>;
