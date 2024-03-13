import { RequestHandler } from "express-serve-static-core";
import * as people from "../services/people";

import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;

  const getPeople = await people.getAll({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });
  if (getPeople) return res.json({ people: getPeople });

  res.json({ error: "Ocorreu um erro" });
};

export const getPeople: RequestHandler = async (req, res) => {
  const { id_event, id_group, id_people } = req.params;

  const getPeopleSchema = z.object({
    cpf: z.string().optional(),
  });

  const body = getPeopleSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados Invalidos" });

  const getPeople = await people.getPeople({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
    id: parseInt(id_people),
    cpf: body.data.cpf,
  });
  console.log("get: ", getPeople);
  if (getPeople) return res.json({ people: getPeople });

  return res.json({ error: "Ocorreu um erro" });
};
