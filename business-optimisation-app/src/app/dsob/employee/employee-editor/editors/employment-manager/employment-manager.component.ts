import { Component, OnInit, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { PositionInfo } from '../../../../../models/HR/PositionInfo';
import { EmploymentInfo } from '../../../../../models/HR/EmploymentInfo';

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
      return this.editMode && this.canBeFired();
   }

   get firingMode(): boolean {
      return this.workMode === EmploymentWorkMode.Firing;
   }

   ngOnInit(): void {
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
      this.workMode = EmploymentWorkMode.Firing;
   }

   constructor() {
      super();
   }

   private canBeFired(): boolean {
      return !this.employment.dismissalDate && this.employment.employmentDate !== undefined;
   }

}

enum EmploymentWorkMode {
   NewPositionCreation = 'NewPositionCreation',
   Firing = 'Firing',
   Employment = 'Employment',
   ChangePosition = 'ChangePosition'
}
