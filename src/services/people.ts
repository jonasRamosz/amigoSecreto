import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type GetAllPeopleFilters = { id_event: number; id_group: number };
export const getAll = async (filter: GetAllPeopleFilters) => {
  try {
    return await prisma.eventPeople.findMany({ where: filter });
  } catch (error) {
    return false;
  }
};

type GetPeopleFilters = {
  id_event: number;
  id_group: number;
  id: number;
  cpf?: string;
};
export const getPeople = async (filter: GetPeopleFilters) => {
  try {
    return await prisma.eventPeople.findFirst({ where: filter });
  } catch (error) {
    console.log("error:", error);
    return false;
  }
};
