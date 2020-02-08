export interface ICheckListModel {
    lastSeen: number;
    list: CheckList[];
}

export interface CheckList {
    name: string;
    type: ListType;
    tasks: CheckItem[];
}

export interface CheckItem {
    name: string;
    checked: boolean;
}

export interface ListTypeInfoSelect {
    name: string;
    type: ListType;
}

export enum ListType {
    Sorted,
    Free
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