export interface ICheckListModel {
    lastSeen: number;
    list: ICheckList[];
}

export interface ICheckList {
    name: string;
    type: ListType;
    tasks: ICheckItem[];
}

export interface ICheckItem {
    name: string;
    checked: boolean;
}

export enum ListType {
    Sorted,
    Free
}

export interface ListTypeInfoSelect {
    name: string;
    type: ListType;
}

export const ListTypeInfo: ListTypeInfoSelect[] = [
    {
        name: 'Сортированный',
        type: ListType.Sorted
    },
    {
        name: 'Свободный',
        type: ListType.Free
    }
]