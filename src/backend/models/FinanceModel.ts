import { Modality as PrismaModality, Type as PrismaType } from "@prisma/client";

export type Modality = PrismaModality;

export type Type = PrismaType;

export type Finance = {
  id?: string;
  userId?: string;
  type: Type;
  amount: number;
  description: string;
  modality: Modality;
  date?: Date | string;
  createdAt?: Date;
};
