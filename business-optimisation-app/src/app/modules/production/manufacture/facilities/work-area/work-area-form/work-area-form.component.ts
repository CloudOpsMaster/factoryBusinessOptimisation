import { Component, OnInit, Input } from '@angular/core';
import { WorkArea } from 'src/app/models/facilities-management/work-area';
import { FormGroup, FormControl } from '@angular/forms';
import { WorkAreaService } from '../work-area.service';
import { DepartmentService } from '../../department/department.service';
import { Department } from 'src/app/models/facilities-management/department';

@Component({
  selector: 'app-work-area-form',
  templateUrl: './work-area-form.component.html',
  styleUrls: ['./work-area-form.component.scss']
})
export class WorkAreaFormComponent {
  private workArea: WorkArea = null;

  public canShowWorkAreaFormForChange: boolean;
  public workAreaForm: FormGroup;
  public departments: Department[] = null;

  @Input() canShowWorkAreaForm: boolean;

  constructor(private workAreaService: WorkAreaService, private departmentService: DepartmentService) {
    this.departments = this.departmentService.getAllDepartments();
    this.createForm();
    this.workAreaService.variableWorkArea.subscribe((workArea: WorkArea) => {
      if (workArea && workArea.id > -1) {
        this.canShowWorkAreaFormForChange = true;
        this.canShowWorkAreaForm = true;
        this.workArea = workArea;
        this.setLocation(workArea);
      }
    })
  }

  private createForm(): void {
    this.workAreaForm = new FormGroup({
      name: new FormControl(null),
      department: new FormControl(null),
    })
  }

  private getWorkArea(): WorkArea {
    const workArea = new WorkArea();
    workArea.name = this.workAreaForm.get('name').value;
    workArea.department = this.departmentService.getDepartmentByName(this.workAreaForm.get('department').value);
    return workArea;
  }

  private clearForm(): void {
    this.workAreaForm.reset();
  }

  private setViewForm(): void {
    this.canShowWorkAreaFormForChange = false;
    this.canShowWorkAreaForm = false;
  }

  public onSave(): void {
    this.workAreaService.add(this.getWorkArea());
    this.clearForm();
  }

  public onChange(): void {
    this.workAreaService.change(this.getWorkArea(), this.workArea);
    this.clearForm();
    this.setViewForm();
  }

  public onCancel(): void {
    this.clearForm();
    this.setViewForm();
  }

  public onDelete(): void {
    this.workAreaService.remove(this.workArea);
    this.clearForm();
    this.setViewForm();
  }

  private setLocation(workArea: WorkArea): void {
    this.workAreaForm.get('name').setValue(workArea.name);
    this.workAreaForm.get('department').setValue(workArea.department.name);
  }
}
