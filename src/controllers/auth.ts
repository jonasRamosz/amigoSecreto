import { RequestHandler } from "express";
import { z } from "zod";
import * as auth from "../services/auth";

export const login: RequestHandler = (req, res) => {
  const loginSchema = z.object({
    password: z.string(),
  });

  const body = loginSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados invalidos" });

  if (!auth.validatePassword(body.data.password)) {
    return res.status(403).json({ error: "login ou senha invalidos" });
  }

  res.json({ token: auth.createToken() });
};

export const validate: RequestHandler = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("aqui");
    return res.status(403).json({ error: "acesso negado" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!auth.validateToken(token)) {
    return res.status(403).json({ error: "acesso negado" });
  }

  next();
};
