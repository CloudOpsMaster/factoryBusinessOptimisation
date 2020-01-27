export interface ICheckListModel {
    lastSeen: number;
    list: ICheckList[];
}

export interface ICheckList {
    name: string;
    type: ListType;
    list: ICheckItem[];
}

export interface ICheckItem {
    name: string;
    checked: boolean;
}

export enum ListType {
    Sorted,
    Free
}

export const ListTypeInfo = [
    {
        name: 'Сортированный',
        type: ListType.Sorted
    },
    {
        name: 'Свободный',
        type: ListType.Free
    }
]