import {
  ArrowDown,
  ArrowUp,
  Component,
  CreditCard,
  DollarSign,
  Receipt,
} from "lucide-react";

export const types = [
  {
    value: "entrada",
    label: "Entrada",
    icon: ArrowUp,
  },
  {
    value: "saida",
    label: "Saida",
    icon: ArrowDown,
  },
];

export const modalitys = [
  {
    label: "Pix",
    value: "pix",
    icon: Component,
  },
  {
    label: "Dinheiro",
    value: "dinheiro",
    icon: DollarSign,
  },
  {
    label: "Credito",
    value: "credito",
    icon: CreditCard,
  },
  {
    label: "Debito",
    value: "debito",
    icon: CreditCard,
  },
  {
    label: "Boleto",
    value: "boleto",
    icon: Receipt,
  },
];
