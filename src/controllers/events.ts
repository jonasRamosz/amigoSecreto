import { RequestHandler } from "express";
import { z } from "zod";
import * as events from "../services/events";
import exp from "constants";

export const getAll: RequestHandler = async (req, res) => {
  const items = await events.getAll();
  if (items) return res.json({ events: items });

  res.json({ error: "Ocorreu um erro" });
};

export const getEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const eventItem = await events.getOne(parseInt(id));
  if (eventItem) return res.json({ event: eventItem });

  res.json({ error: "Ocorreu um erro" });
};

export const addEvent: RequestHandler = async (req, res) => {
  const addEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean(),
  });

  const body = addEventSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados invalidos" });
  const newEvent = await events.add(body.data);
  if (newEvent) return res.status(201).json({ event: newEvent });

  res.json({ error: "Ocorreu um erro" });
};

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updateEventSchema = z.object({
    status: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
  });

  const body = updateEventSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados invalidos" });

  const updateEvent = await events.updateEvent(parseInt(id), body.data);
  if (updateEvent) {
    if (updateEvent.status) {
      // TODO: fazer o sorteio
    } else {
      //TODO: limpar o sorteio
    }
    return res.json({ event: updateEvent });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedEvent = await events.deleteEvent(parseInt(id));
  if (deletedEvent)
    return res
      .status(200)
      .json({ mensagem: "Deletado com sucesso", event: deletedEvent });

  res.json({ erro: "Ocorreu um erro" });
};
