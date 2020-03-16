import { Component, OnInit, Input } from '@angular/core';
import { PositionInfo } from 'src/app/models/hr/position-info';

@Component({
   selector: 'app-position-creator',
   templateUrl: './position-creator.component.html',
   styleUrls: ['./position-creator.component.css']
})
export class PositionCreatorComponent {
   @Input() horizontalLayout = true;
   @Input() newPosition: PositionInfo;

   get titleColumnClass(): string {
      if (this.horizontalLayout) {
         return 'col-lg-3 col-sm-12';
      } else {
         return 'fullWidth';
      }
   }

   get reqColumnClass(): string {
      if (this.horizontalLayout) {
         return 'col-lg-5 col-sm-12';
      } else {
         return 'fullWidth';
      }
   }

   constructor() {
      this.newPosition = new PositionInfo();
   }


}
