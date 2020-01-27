export const productionDepartments: IDepartment[] = [
    { key: 1, value: "Цех" },
    { key: 2, value: "Офис" },
    { key: 3, value: "Точка продажи" },
    { key: 4, value: "Склад готовой продукции" },
    { key: 5, value: "Склад материалов" }
];

export interface IDepartment {
    key: number;
    value: string;
}