import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plot } from 'src/app/models/plot/plot';
import { GridColumn } from 'src/app/common/ui/grid/model/grid-column';

@Component({
  selector: 'app-plots-table',
  templateUrl: './plots-table.component.html',
  styleUrls: ['./plots-table.component.scss']
})
export class PlotsTableComponent implements OnInit {
  private table: boolean;
  private tableForPlots: boolean ;
  private tableForLocation: boolean = true;
  private tableForWorkSiteOfGuild: boolean;
  private tableForWorkSiteOfOffice: boolean;
  @Input() set openTable(value: boolean) { this.table = value; }
  @Output() closedTable = new EventEmitter<boolean>();
  items: Map<number, string> = new Map<number, string>();
  ngOnInit() {
  }
  constructor() {
    this.items.set(1, 'Участки');
    this.items.set(2, 'Адреса локаций');
    this.items.set(3, 'Отделы');
    this.items.set(4, 'Рабочие участки');
  }

  private print(value): void {
    switch (value) {
      case this.items.get(1):
        this.setTable(true, false, false, false);
        break;
      case this.items.get(2):
        this.setTable(false, true, false, false);
        break;
      case this.items.get(3):
        this.setTable(false, false, true, false);
        break;
      case this.items.get(4):
        this.setTable(false, false, false, true);
        break;
    }
  }
  private setTable(tableForPlots: boolean, tableForLocation: boolean, tableForWorkSiteOfOffice: boolean, tableForWorkSiteOfGuild: boolean): void {
    this.tableForPlots = tableForPlots;
    this.tableForLocation = tableForLocation;
    this.tableForWorkSiteOfOffice = tableForWorkSiteOfOffice;
    this.tableForWorkSiteOfGuild = tableForWorkSiteOfGuild;
  }

  /* @Input() plots = new Array<Plot>();
   @Output() plot = new EventEmitter<Plot>();
   columns = new Array<GridColumn>();
 
   private onRowClick(plot: Plot): void {
     this.plot.emit(plot);
   }
  */
}
