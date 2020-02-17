import { Component, OnInit, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { PositionInfo } from '../../../../../../models/hr/position-info';
import { EmploymentInfo } from '../../../../../../models/hr/employment-info';

@Component({
   selector: 'app-employment-manager',
   templateUrl: './employment-manager.component.html',
   styleUrls: ['./employment-manager.component.css']
})
export class EmploymentManagerComponent extends BaseEditor implements OnInit {

   @Input() position: PositionInfo;
   @Input() employment: EmploymentInfo;

   workMode: EmploymentWorkMode = EmploymentWorkMode.Employment;

   get createNewCaption(): string {
      if (this.workMode === EmploymentWorkMode.NewPositionCreation) {
         return 'Отмена создания новой должности';
      } else {
         return 'Создание новой должности';
      }
   }

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

   private originalPosition: PositionInfo;
   private originalEmployment: EmploymentInfo;

   ngOnInit(): void {
      this.originalEmployment = this.employment.clone();
      this.originalPosition = this.position.clone();
   }

   onCreateNewPosition() {
      if (this.workMode === EmploymentWorkMode.NewPositionCreation) {
         this.workMode = EmploymentWorkMode.Employment;
      } else {
         this.workMode = EmploymentWorkMode.NewPositionCreation;
      }
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

   constructor() {
      super();
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
