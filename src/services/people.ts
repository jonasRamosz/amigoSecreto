import { Prisma, PrismaClient } from "@prisma/client";
import * as groups from "./groups";
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

type PeopleCreateData = Prisma.Args<
  typeof prisma.eventPeople,
  "create"
>["data"];
export const add = async (data: PeopleCreateData) => {
  try {
    if (!data.id_group) return false;
    const group = await groups.getOne({
      id: data.id_group,
      id_event: data.id_event,
    });
    if (!group) return false;
    return await prisma.eventPeople.create({ data });
  } catch (error) {
    return false;
  }
};

type PeopleUpdateData = Prisma.Args<
  typeof prisma.eventPeople,
  "update"
>["data"];
type FilterUpdate = { id?: number; id_event: number; id_group?: number };
export const update = async (filter: FilterUpdate, data: PeopleUpdateData) => {
  try {
    return await prisma.eventPeople.updateMany({ where: filter, data });
  } catch (error) {
    return false;
  }
};
type Filterdelete = { id: number; id_event?: number; id_group?: number };
export const deletePerson = async (filter: Filterdelete) => {
  try {
    return await prisma.eventPeople.delete({ where: filter });
  } catch (error) {
    return false;
  }
};
