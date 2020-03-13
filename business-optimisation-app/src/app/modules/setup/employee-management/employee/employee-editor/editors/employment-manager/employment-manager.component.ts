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

   get employmentEnabled(): boolean {
      return this.editMode && this.originalEmployment.dismissalDate !== undefined;
   }

   get firingMode(): boolean {
      return this.workMode === EmploymentWorkMode.Firing;
   }

   get employmentMode(): boolean {
      return this.workMode === EmploymentWorkMode.Employment;
   }

   get firingCaption(): string {
      return this.firingMode ? 'Отменить увольнение' : 'Уволить';
   }

   get employmentCaption(): string {
      return this.employmentMode ? 'Отменить прием' : 'Принять на работу';
   }

   get positionFilled(): boolean {
      return this.newPosition.isAllFieldsNotEmpty();
   }

   private originalPosition: PositionInfo;
   private originalEmployment: EmploymentInfo;

   ngOnInit(): void {
      this.originalEmployment = this.employment.clone();
      this.originalPosition = this.position.clone();
      this.workMode = this.originalEmployment.dismissalDate ? EmploymentWorkMode.Firing : EmploymentWorkMode.Employment;
   }

   onCreateNewPosition() {
      this.newPosition = new PositionInfo();
      // this.workMode = EmploymentWorkMode.NewPositionCreation;
      this.showModal = true;
   }

   addClick() {
      this.hidePositionCreationModal();
      const response = this.positionService.addPosition(this.newPosition);
      if (!response.success) {
         // TODO: provide normal dialog
         alert(response.error);
         return;
      }
   }

   onCancelAddClick() {
      this.hidePositionCreationModal();
   }

   hidePositionCreationModal() {
      this.showModal = false;
      this.workMode = EmploymentWorkMode.Employment;
   }

   onEmployeeFireRequested() {
      if (this.workMode === EmploymentWorkMode.Firing) {
         this.setModeToEmployment();
      } else {
         this.setModeToFiring();
      }
   }

   onEmployementRequested() {
      if (this.workMode === EmploymentWorkMode.Employment) {
         this.setModeToFiring();
      } else {
         this.setModeToEmployment();
      }
   }

   constructor(private positionService: PositionService) {
      super();
      this.newPosition = new PositionInfo();
   }

   private canBeFired(): boolean {
      return !this.originalEmployment.dismissalDate && this.originalEmployment.employmentDate !== undefined;
   }

   private setModeToFiring(): void {
      this.workMode = EmploymentWorkMode.Firing;
      this.employment.dismissReason = this.originalEmployment.dismissReason;
      this.employment.dismissalDate = this.originalEmployment.dismissalDate;
      this.employment.employmentDate = undefined;
      this.position.id = -1;
   }

   private setModeToEmployment(): void {
      this.workMode = EmploymentWorkMode.Employment;
      this.employment.dismissReason = undefined;
      this.employment.dismissalDate = undefined;
      this.employment.employmentDate = this.originalEmployment.employmentDate;
      this.position.id = this.originalPosition.id;
   }

}

enum EmploymentWorkMode {
   NewPositionCreation = 'NewPositionCreation',
   Firing = 'Firing',
   Employment = 'Employment',
   ChangePosition = 'ChangePosition'
}
