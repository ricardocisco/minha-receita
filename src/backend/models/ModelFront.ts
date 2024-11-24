export type Finance = {
  id?: string;
  userId?: string;
  type: string;
  amount: number;
  description: string;
  modality: string;
  date?: Date;
  createdAt?: Date;
};
