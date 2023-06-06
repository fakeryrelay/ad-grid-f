import ShopsService from "../../services/shops.service";

export const createParamsAll = async () => {
  const { data } = await ShopsService.getAll()
  const res = data.map(el => ({ id: el.id, name: el.name}))

  return [
    {
      name: "name",
      placeholder: "Фамилия имя",
      required: true,
      type: "text",
      maxLength: 255,
      el: "input",
    },
    {
      name: "salary",
      placeholder: "Зарплата",
      required: true,
      type: "number",
      step: "0.0000000000001",
      el: "input",
    },
    {
      name: "hire_date",
      placeholder: "Дата устройства",
      required: true,
      type: "date",
      el: "input",
    },
    {
      name: "performance",
      placeholder: "Производительность",
      required: true,
      type: "number",
      el: "input",
    },
    {
      name: 'shop_id',
      placeholder: 'Магазин',
      required: true,
      el: 'select',
      data: res
    }
  ];
}
