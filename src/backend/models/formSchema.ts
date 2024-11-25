import { z } from "zod";

export const formSchema = z.object({
  userId: z.string(),
  type: z.enum(["Entrada", "Saida"]),
  amount: z
    .number()
    .min(1, { message: "o valor é obrigatório e deve ser maior que 0 " }),
  description: z.string().min(1, { message: "Descrição é obrigatório" }),
  modality: z.enum(["Pix", "Dinheiro", "Credito", "Debito", "Boleto"]),
  date: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
});

export type formData = z.infer<typeof formSchema>;
