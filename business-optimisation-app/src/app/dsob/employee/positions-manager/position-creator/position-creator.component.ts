import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PositionInfo } from 'src/app/models/HR/PositionInfo';
import { PositionService } from '../services/position.service';

@Component({
   selector: 'app-position-creator',
   templateUrl: './position-creator.component.html',
   styleUrls: ['./position-creator.component.css']
})
export class PositionCreatorComponent implements OnInit {
   // TODO: refactor this component
   @Output() positionAdded = new EventEmitter();
   @Input() horizontalLayout = true;

   newPosition: PositionInfo;

   get addEnabled(): boolean {
      return this.newPosition.isAllFieldsNotEmpty();
   }

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

   get buttonColumnClass(): string {
      if (this.horizontalLayout) {
         return 'col-lg-4 col-sm-12';
      } else {
         return 'fullWidth';
      }
   }

   constructor(private positionService: PositionService) {
      this.newPosition = new PositionInfo();
   }

   ngOnInit() {
   }

   onAdd() {
      const response = this.positionService.addPosition(this.newPosition);
      if (!response.success) {
         // TODO: provide normal dialog
         alert(response.error);
         return;
      }
      this.newPosition = new PositionInfo();
      this.positionAdded.emit();
   }

}
