import { ListTypeInfo, ListTypeInfoSelect, CheckList } from './CheckListModel';

export class CheckListArray {

    public selectType: ListTypeInfoSelect;

    private _array: CheckList[];
    private _current: number;
    private _template = "Новый список";

    constructor(checkList: CheckList[] = []) {
        this._array = checkList;
        this._current = 0;
        this.selectType = ListTypeInfo[1];
    }

    //#region Get

    public get array() {
        return this._array;
    }

    public get length() {
        return this._array.length;
    }

    public get current() {
        return Object.freeze({
            list: this._array[this._current],
            index: this._current
        });
    }

    //#endregion

    //#region Array Manage

    public clear() {
        this._array = [];
        this.listCreate();
    }

    public listCreate() {
        const generatedName = `${this._template} ${this.nameIndex()}`;

        this._array.push({
            name: generatedName,
            type: this.selectType.type,
            tasks: [
                {
                    name,
                    checked: false
                }
            ]
        });

        this._current = this.array.length - 1;
    }

    public listDelete(listIndex: number) {
        this._array.splice(listIndex, 1);
        if (this._array.length === 0) this.listCreate();

        this._current = this.array.length - 1;
    }

    public listRename(newName: string = '', listIndex: number = this._current) {
        if (newName !== null) {
            if (newName.length && newName.length < 50 && !this.isEmptyOrSpaces(newName)) {
                this._array[listIndex].name = newName;
            }
            else {
                throw "String length '< 0' or '> 50'.";
            }
        }
    }

    public listSelect(listIndex: number) {
        if (listIndex >= 0 && listIndex < this.array.length) {
            this._current = listIndex;
        }
        else {
            throw "Index was outside the bounds of the array";
        }
    }

    //#endregion

    //#region Task Manage

    public taskCreate(name: string = '', checked: boolean = false) {
        this._array[this._current].tasks.push({
            name: name,
            checked: checked
        })
    }

    public taskDelete(taskIndex: number) {
        this._array[this._current].tasks.splice(taskIndex, 1);
        if (this._array[this._current].tasks.length === 0) this.taskCreate();
    }

    //#endregion

    //#region Extentions

    private isEmptyOrSpaces(text) {
        return text === null || text.match(/^ *$/) !== null;
    }

    private nameIndex(startIndex: number = 0) {
        const name = this._template;

        for (const list of this._array) {
            if (list.name.includes(name)) {
                const value = +list.name
                    .replace(name, '')
                    .trim();

                if (!isNaN(value) && value > startIndex) startIndex = value;
            }
        }

        return startIndex + 1;
    }

    //#endregion
}
