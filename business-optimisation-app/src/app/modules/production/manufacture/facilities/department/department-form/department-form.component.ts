import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DepartmentService } from '../department.service';
import { Department } from 'src/app/models/facilities-management/department';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent {
  private department: Department = null;
  
  public typeOfDepartments;
  public canShowDepartmentFormForChange: boolean;
  public departmentForm: FormGroup;
  public applyTranslate: string;
  public cancelTranslate: string;
  public deleteTranslate: string;

  @Input() canShowDepartmentForm: boolean;

  constructor(private departmentService: DepartmentService, public translation: TranslationService) {
    this.typeOfDepartments = departmentService.getTypeOfDepartments();
    this.createForm();
    this.translation.translationChanged().subscribe(
      () => {
        this.applyTranslate = this.translation.translate('apply');
        this.cancelTranslate = this.translation.translate('cancel');
        this.deleteTranslate = this.translation.translate('delete');
      }
    );
    this.departmentService.variableDepartment.subscribe((department: Department) => {
      if (department && department.id > -1) {
        this.canShowDepartmentFormForChange = true;
        this.canShowDepartmentForm = true;
        this.department = department;
        this.setDepartment(department);
      }
    })
  }

  private createForm(): void {
    this.departmentForm = new FormGroup({
      name: new FormControl(null),
      type: new FormControl(null),
      comment: new FormControl(null)
    })
  }

  private getDepartment(): Department {
    const department = new Department();
    department.name = this.departmentForm.get('name').value;
    department.type = this.departmentForm.get('type').value;
    department.comment = this.departmentForm.get('comment').value;
    return department;
  }
  private clearForm(): void {
    this.departmentForm.reset();
  }

  public onSave(): void {
    this.departmentService.add(this.getDepartment());
    this.clearForm();
  }

  public onChange(): void {
    this.departmentService.change(this.getDepartment(), this.department);
    this.clearForm();
    this.setViewForm();
  }

  private setViewForm(): void {
    this.canShowDepartmentFormForChange = false;
    this.canShowDepartmentForm = false;
  }

  public onCancel(): void {
    this.clearForm();
    this.setViewForm();
  }

  public onDelete(): void {
    this.departmentService.remove(this.department);
    this.clearForm();
    this.setViewForm();
  }

  private setDepartment(department: Department): void {
    this.departmentForm.get('name').setValue(department.name);
    this.departmentForm.get('type').setValue(department.type);
    this.departmentForm.get('comment').setValue(department.comment);
  }
}
