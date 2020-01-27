import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-for-plots',
  templateUrl: './table-for-plots.component.html',
  styleUrls: ['./table-for-plots.component.scss']
})
export class TableForPlotsComponent implements OnInit {
  table:boolean;
  @Input() set openTableForPlots(value: boolean) { this.table = value; }
  constructor() { }

  ngOnInit() {
  }

}
