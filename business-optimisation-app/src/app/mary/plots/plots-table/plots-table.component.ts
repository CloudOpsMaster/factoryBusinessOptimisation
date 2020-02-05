import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-plots-table',
  templateUrl: './plots-table.component.html',
  styleUrls: ['./plots-table.component.scss']
})
export class PlotsTableComponent implements OnInit {
  private canOpenTable: boolean;
  @Input() set componentForTables(value: boolean) {
    this.canOpenTable = value;
  }
  ngOnInit() {
  }
}
