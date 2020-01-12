import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plot } from 'src/app/models/plot';

@Component({
  selector: 'app-plots-table',
  templateUrl: './plots-table.component.html',
  styleUrls: ['./plots-table.component.scss']
})
export class PlotsTableComponent {

  @Input() plots = new Array<Plot>();
  @Output() plot = new EventEmitter<Plot>(); 

  private onRowClick(plot: Plot): void {
    this.plot.emit(plot);
  }
}
