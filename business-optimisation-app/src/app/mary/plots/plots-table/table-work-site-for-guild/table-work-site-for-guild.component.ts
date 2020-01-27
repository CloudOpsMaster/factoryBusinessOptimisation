import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-work-site-for-guild',
  templateUrl: './table-work-site-for-guild.component.html',
  styleUrls: ['./table-work-site-for-guild.component.scss']
})
export class TableWorkSiteForGuildComponent implements OnInit {

  table: boolean;
  @Input() set openTableForWorkSiteOfGuild(value: boolean) { this.table = value; }
  constructor() { }
  ngOnInit() {
  }
}
