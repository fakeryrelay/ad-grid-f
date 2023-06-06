export const createParams = [
  {
    name: "name",
    placeholder: "Название",
    required: true,
    type: "text",
    maxLength: 255,
  },
  {
    name: "total_revenue",
    placeholder: "Общая прибыль",
    required: true,
    type: "number",
    step: "0.0000000000001",
  },
  {
    name: "open_date",
    placeholder: "Дата открытия",
    required: true,
    type: "date",
  },
  {
    name: "area",
    placeholder: "Площадь",
    required: true,
    type: "number",
  },
];