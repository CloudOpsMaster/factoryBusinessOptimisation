import { Component, OnInit, Input } from '@angular/core';
import { Plot } from 'src/app/models/plot';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit {

  ngOnInit() {
  }

  private allPlots = new Array<Plot>();
  private plot: Plot;

  getItems(event: Array<Plot>): void {
    this.allPlots = event;
  }
  getRow(event: Plot): void {
    this.plot = event;
  }
}
