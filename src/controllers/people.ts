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

  if (getPeople) return res.json({ people: getPeople });

  return res.json({ error: "Ocorreu um erro" });
};

export const addPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;

  const addPersonSchema = z.object({
    name: z.string(),
    cpf: z.string().transform((value) => value.replace(/\.|-/gm, "")),
  });
  const body = addPersonSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados invalidos" });
  const newPerson = await people.add({
    ...body.data,
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });
  if (newPerson)
    return res.json({ mensgem: "person create sucess", person: newPerson });
  res.json({ error: "Ocorreu um erro" });
};

export const updatePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id_people } = req.params;
  const updatePersonSchema = z.object({
    name: z.string().optional(),
    cpf: z.string().optional(),
    matched: z.string().optional(),
  });
  const body = updatePersonSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados invalidos" });

  const updatedPerson = await people.update(
    {
      id: parseInt(id_people),
      id_event: parseInt(id_event),
      id_group: parseInt(id_group),
    },
    body.data
  );
  if (updatedPerson)
    return res.json({
      mensagem: "atualizado com sucesso!",
      people: updatedPerson,
    });
  res.json({ error: "Ocorreu um erro" });
};

export const deletePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id_people } = req.params;

  const deletedPerson = await people.deletePerson({
    id: parseInt(id_people),
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });
  if (deletedPerson)
    return res.json({
      message: "deletado com sucesso",
      deleted: deletedPerson,
    });

  res.json({ error: "Ocorreu um erro" });
};
