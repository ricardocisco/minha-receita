export interface Finance {
  id?: string;
  userId: string;
  type: string;
  amount: number;
  description: string;
  modality: string;
  date?: Date | string;
  createdAt?: Date;
}