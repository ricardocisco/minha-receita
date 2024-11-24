import { z } from "zod";

export const formSchema = z.object({
  userId: z.string(),
  type: z.string().min(1, { message: "o tipo é obrigatório" }),
  amount: z
    .number()
    .min(1, { message: "o valor é obrigatório e deve ser maior que 0 " }),
  description: z.string().min(1, { message: "Descrição é obrigatório" }),
  modality: z.string().min(1, { message: "Modalidade é obrigatório" }),
  date: z.date({ required_error: "Data é obrigatório" }),
});

export type formData = z.infer<typeof formSchema>;
