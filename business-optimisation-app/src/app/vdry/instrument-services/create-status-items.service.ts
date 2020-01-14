import { Injectable } from '@angular/core';
import { DisplayValueItem } from 'src/app/common/model/display-value-item';
import { StatusItem } from 'src/app/models/instrumentServis/InstrumentServis';

@Injectable({
  providedIn: 'root'
})
export class CreateStatusItemsService {

  statusItems: Array<DisplayValueItem>;

constructor() {
   this.getStatusItems();
}

  getStatusItems() {
    this.statusItems = new Array<DisplayValueItem>();
    this.statusItems.push({
      valueMember: StatusItem.Ready,
      displayMember: 'Готов'
    });

    this.statusItems.push({
      valueMember: StatusItem.NotReady,
      displayMember: 'Не готов'
    });

    this.statusItems.push({
      valueMember: StatusItem.NotRestored,
      displayMember: 'Не восстановлен'
    });

    return this.statusItems;
  }

}
