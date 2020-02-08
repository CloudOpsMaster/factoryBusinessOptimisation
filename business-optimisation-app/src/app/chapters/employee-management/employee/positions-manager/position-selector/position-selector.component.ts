import { Component, OnInit, Input } from '@angular/core';
import { PositionInfo } from '../../../../../models/hr/position-info';
import { PositionService } from '../services/position.service';

@Component({
   selector: 'app-position-selector',
   templateUrl: './position-selector.component.html',
   styleUrls: ['./position-selector.component.css']
})
export class PositionSelectorComponent implements OnInit {

   @Input() position: PositionInfo;
   @Input() disabled = false;
   public allPositions: Array<PositionInfo>;

   constructor(private positionService: PositionService) {
      this.allPositions = this.positionService.AllPositions;
      this.positionService.positionsChanged.subscribe(() => {
         this.allPositions = this.positionService.AllPositions;
      });
   }

   ngOnInit() {
   }

}
