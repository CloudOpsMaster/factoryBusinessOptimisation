import { Component, OnInit, Input } from '@angular/core';
import { GridColumn } from 'src/app/common/ui/grid/model/grid-column';
import { Department } from 'src/app/models/facilities-management/department';
import { DepartmentService } from '../department.service';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.scss']
})
export class DepartmentTableComponent implements OnInit {
  private nameTranslate: string;
  private typeTranslate: string;
  private commentTranslate: string;

  public columns = new Array<GridColumn>();
  public departmnets: Array<Department> = [];
  public tracktionField = 'id';

  @Input() locked = false;
  @Input() hideSelection = false;
  @Input() focusEntityId = 0;

  constructor(private departmnetServise: DepartmentService, public translation: TranslationService) {
    this.initDepartments();
  }

  ngOnInit() {
    this.translation.translationChanged().subscribe(
      () => {
        this.nameTranslate = this.translation.translate('name');
        this.typeTranslate = this.translation.translate('type');
        this.commentTranslate = this.translation.translate('description');
      }
    );
    this.departmnetServise.addNewDepartment.subscribe((department: Department) => {
      this.departmnets.push(department);
    })
    this.departmnetServise.removeDepartment.subscribe((departmentId: number) => {
      this.departmnets.splice(departmentId, 1);
    })
    this.departmnetServise.changeDepartment.subscribe((department: Department) => {
      this.departmnets[this.departmnetServise.getDepartmentIdForChange()] = department;
    })
    this.initGrid();
  }

  private initDepartments(): void {
    this.departmnetServise.getAllDepartments().forEach((department: Department) => {
      this.departmnets.push(department);
    })
  }

  private initGrid(): void {
    this.columns.push({ header: '№', field: 'id' });
    this.columns.push({ header: this.nameTranslate, field: 'name' });
    this.columns.push({ header: this.typeTranslate, field: 'type' });;
    this.columns.push({ header: this.commentTranslate, field: 'comment' });
  }

  public onRowClick(department: Department): void {
    this.focusEntityId = department.id;
    this.departmnetServise.setDepartmentById(this.focusEntityId);
  }
}
