import { PrismaClient, Prisma } from "@prisma/client";
import * as events from "./events";

const prisma = new PrismaClient();

export const getAll = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: { id_event } });
  } catch (error) {
    return false;
  }
};

type GetOneFilter = { id_event?: number; id: number };
export const getOne = async (filter: GetOneFilter) => {
  try {
    console.log("uai");
    return await prisma.eventGroup.findFirst({ where: filter });
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};
type GroupsCreateData = Prisma.Args<typeof prisma.eventGroup, "create">["data"];
export const addOne = async (data: GroupsCreateData) => {
  try {
    if (!data.id_event) return false;

    const eventItem = await events.getOne(data.id_event);
    if (!eventItem) return false;

    return await prisma.eventGroup.create({ data });
  } catch (error) {
    return false;
  }
};
type GroupsUpdateData = Prisma.Args<typeof prisma.eventGroup, "update">["data"];
type UpdateFilters = { id: number; id_event?: number };
export const update = async (
  filters: UpdateFilters,
  data: GroupsUpdateData
) => {
  try {
    return await prisma.eventGroup.update({ where: filters, data });
  } catch (error) {
    return false;
  }
};

type deleteFilters = { id: number; id_event?: number };
export const remove = async (deleteFilters: deleteFilters) => {
  try {
    return await prisma.eventGroup.delete({ where: deleteFilters });
  } catch (error) {
    return false;
  }
};
