import {
  ListTypeInfo,
  ListType
} from '../../../models/check-list/check-list-model';
import { ICheckListModel } from '../../../models/check-list/check-list-model';
import { StorageService, StorageKey } from '../../../services/storage.service';
import { CheckListArray } from '../../../models/check-list/check-list-array';
import { Directive } from "@angular/core";

@Directive()
export class CheckListBase {
  protected storage = new StorageService();

  public checkList: CheckListArray;
  public listTypes = ListTypeInfo;

  constructor() {
    this.dataRequest();
  }

  canCheck(taskIndex: number) {
    const name = this.checkList.current.list.tasks[taskIndex].name;
    const one = this.checkList.current.list.type === ListType.Free;
    const two =
      taskIndex === 0 ||
      this.checkList.current.list.tasks[taskIndex - 1].checked;

    return (
      (one || two) &&
      !this.isEmptyOrSpaces(name) &&
      !this.checkList.current.list.tasks[taskIndex].checked
    );
  }

  listSelect(listIndex: number) {
    this.checkList.listSelect(listIndex);
    this.dataSave();
  }

  dataSave() {
    let save: ICheckListModel = {
      lastSeen: this.checkList.current.index,
      list: Array.from(this.checkList.array)
    };

    this.storage.setData(StorageKey.CheckList, save);
  }

  dataRequest() {
    const request = this.storage.getTypedData<ICheckListModel>(
      StorageKey.CheckList
    );

    // this.storage.deleteData(StorageKey.CheckList)

    if (request !== null) {
      this.checkList = new CheckListArray(request.list);

      if (request.lastSeen < this.checkList.length) {
        this.checkList.listSelect(request.lastSeen);
      }
    }
  }

  protected isEmptyOrSpaces(text) {
    return text === null || text.match(/^ *$/) !== null;
  }
}
