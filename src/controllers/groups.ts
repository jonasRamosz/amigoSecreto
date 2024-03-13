import { RequestHandler } from "express-serve-static-core";
import * as groups from "../services/groups";
import { z } from "zod";
import { group } from "console";

export const getAll: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const items = await groups.getAll(parseInt(id_event));

  if (items) return res.json({ groups: items });

  res.json({ error: "Ocorreu um erro" });
};

export const getGroup: RequestHandler = async (req, res) => {
  const { id_event, id } = req.params;

  const groupItem = await groups.getOne({
    id_event: parseInt(id_event),
    id: parseInt(id),
  });
  console.log("group: ", groupItem);
  if (groupItem) return res.json({ group: groupItem });
  if (groupItem === null) return res.json({ error: "grupo nao existe" });

  res.json({ error: "Ocorreu um erro" });
};

export const addGroup: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const addGroupSchema = z.object({ name: z.string() });
  const body = addGroupSchema.safeParse(req.body);
  console.log("body: ", body);

  if (!body.success) return res.json({ error: "Dados invalidos" });

  const newGroup = await groups.addOne({
    ...body.data,
    id_event: parseInt(id_event),
  });

  if (newGroup) return res.json({ group: newGroup });

  return { error: "Ocorreu um erro" };
};

export const updateGroup: RequestHandler = async (req, res) => {
  const { id_event, id } = req.params;
  const updateGroupSchema = z.object({ name: z.string().optional() });

  const body = updateGroupSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados invalidos" });

  const updatedGroup = await groups.update(
    { id: parseInt(id), id_event: parseInt(id_event) },
    body.data
  );

  if (updatedGroup) return res.json({ group: updatedGroup });

  res.json({ error: "Ocorreu um erro" });
};

export const deleteGroup: RequestHandler = async (req, res) => {
  const { id_event, id } = req.params;
  const deleteGroup = await groups.remove({
    id: parseInt(id),
    id_event: parseInt(id_event),
  });
  if (deleteGroup)
    return res.json({ message: "deletado com sucesso", group: deleteGroup });

  res.json({ error: "ocorreu um erro" });
};
