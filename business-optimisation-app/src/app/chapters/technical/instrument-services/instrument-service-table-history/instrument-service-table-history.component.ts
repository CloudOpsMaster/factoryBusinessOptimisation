import { Component, OnInit, Input } from '@angular/core';
import { InstrumentServis } from 'src/app/models/instrument-service/instrument-service';
import { DisplayValueItem } from 'src/app/common/model/display-value-item';
import { CreateStatusItemsService } from '../create-status-items.service';
import { InstrumentService } from '../instrument.service';
import { element } from 'protractor';

@Component({
  selector: 'app-instrument-service-table-history',
  templateUrl: './instrument-service-table-history.component.html',
  styleUrls: ['./instrument-service-table-history.component.css']
})
export class InstrumentServiceTableHistoryComponent implements OnInit {

  @Input() instrumentList: InstrumentServis[] = [];
  @Input() dataSource: Array<any>;

  statusItems: Array<DisplayValueItem>;

  public instrumentsArray: any[];


  constructor(private createStatusItemsService: CreateStatusItemsService) {
    this.createStatusItems();
  }

  ngOnInit() {

  }

  createStatusItems() {
    this.statusItems = this.createStatusItemsService.getStatusItems();
  }

  getStatusvalue(value) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.statusItems.length; i++) {
      if (value === this.statusItems[i].valueMember) {
        return this.statusItems[i].displayMember;
      }
    }
  }

}
