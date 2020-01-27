import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plot } from 'src/app/models/plot/plot';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit {

  ngOnInit() {
  }
  openForm: boolean;
  openTable: boolean = true;
  openTree: boolean;

  private editForm(): void {
    this.openForm = true;
  }

  private editTable(): void {
    if(this.openTable) {
      this.openTable = false;
    }
    else {
      this.openTable = true;
    }
  }

  private cancelForm(event: boolean): void {
    this.openForm = event;
  }

  private cancelTable(event: boolean): void {
    this.openTable = event;
  }
  /**********old************/

  private allPlots = new Array<Plot>();
  private plot: Plot;

  getItems(event: Array<Plot>): void {
    this.allPlots = event;
  }
  getRow(event: Plot): void {
    this.plot = event;
  }
}
