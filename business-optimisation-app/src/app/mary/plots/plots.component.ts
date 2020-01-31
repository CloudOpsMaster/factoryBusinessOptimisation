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
  canOpenForm: boolean;
  canOpenTable: boolean = true;
  canOpenTree: boolean;

  private openForm(): void {
    this.canOpenForm = true;
  }

  private openTable(): void {
    this.canOpenTable = (this.canOpenTable === true) ? false : true;
  }

  private cancelForm(event: boolean): void {
    this.canOpenForm = event;
  }

  private cancelTable(event: boolean): void {
    this.canOpenTable = event;
  }
}
