import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { PositionInfo } from '../../../../../../../models/hr/position-info';
import { EmploymentInfo } from '../../../../../../../models/hr/employment-info';
import { PositionService } from '../../../positions-manager/services/position.service';

@Component({
   selector: 'app-employment-manager',
   templateUrl: './employment-manager.component.html',
   styleUrls: ['./employment-manager.component.css']
})
export class EmploymentManagerComponent extends BaseEditor implements OnInit {

   @Input() position: PositionInfo;
   @Input() employment: EmploymentInfo;
   @ViewChild('addPositionModal', {static: false}) addPositionModal: any;

   workMode: EmploymentWorkMode = EmploymentWorkMode.Employment;
   showModal: boolean;
   newPosition: PositionInfo;

   get reasonReadonly(): boolean {
      return !this.editMode || !this.employment.dismissalDate;
   }

   get showPositionCreator(): boolean {
      return this.workMode === EmploymentWorkMode.NewPositionCreation;
   }

   get firingEnabled(): boolean {
      return this.editMode && this.canBeFired() && !this.showPositionCreator;
   }

   get firingMode(): boolean {
      return this.workMode === EmploymentWorkMode.Firing;
   }

   get firingCaption(): string {
      return this.firingMode ? 'Отменить увольнение' : 'Уволить';
   }

   get positionFilled(): boolean {
      return this.newPosition.isAllFieldsNotEmpty();
   }

   private originalPosition: PositionInfo;
   private originalEmployment: EmploymentInfo;

   ngOnInit(): void {
      this.originalEmployment = this.employment.clone();
      this.originalPosition = this.position.clone();
   }

   onCreateNewPosition() {
      this.newPosition = new PositionInfo();
      this.workMode = EmploymentWorkMode.NewPositionCreation;
      this.showModal = true;
   }

   addClick() {
      this.showModal = false;
      this.workMode = EmploymentWorkMode.Employment;
      const response = this.positionService.addPosition(this.newPosition);
      if (!response.success) {
         // TODO: provide normal dialog
         alert(response.error);
         return;
      }
   }

   onCancelAddClick() {
      this.showModal = false;
      this.workMode = EmploymentWorkMode.Employment;
   }

   hidePositionCreationModal() {
      this.showModal = false;
   }

   onPositionAdded() {
      this.workMode = EmploymentWorkMode.Employment;
   }

   onEmployeeFireRequested() {
      if (this.workMode === EmploymentWorkMode.Firing) {
         this.workMode = EmploymentWorkMode.Employment;
         this.employment.dismissalDate = undefined;
         this.employment.dismissReason = undefined;
      } else {
         this.workMode = EmploymentWorkMode.Firing;
      }
   }

   constructor(private positionService: PositionService) {
      super();
      this.newPosition = new PositionInfo();
   }

   private canBeFired(): boolean {
      return !this.originalEmployment.dismissalDate && this.originalEmployment.employmentDate !== undefined;
   }

}

enum EmploymentWorkMode {
   NewPositionCreation = 'NewPositionCreation',
   Firing = 'Firing',
   Employment = 'Employment',
   ChangePosition = 'ChangePosition'
}
