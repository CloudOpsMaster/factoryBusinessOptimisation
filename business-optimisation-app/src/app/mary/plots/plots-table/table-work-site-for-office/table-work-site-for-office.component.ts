import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-work-site-for-office',
  templateUrl: './table-work-site-for-office.component.html',
  styleUrls: ['./table-work-site-for-office.component.scss']
})
export class TableWorkSiteForOfficeComponent implements OnInit {

  constructor() { }
  private table: boolean;
  ngOnInit() {
  }
  @Input() set openTableForWorkSiteOfOffice(value: boolean) { this.table = value; }
}
