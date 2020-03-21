import { Component, OnInit, Input } from '@angular/core';
import { TranslationService } from 'angular-l10n';
import { WorkAreaService } from '../work-area.service';
import { WorkArea } from 'src/app/models/facilities-management/work-area';
import { GridColumn } from 'src/app/common/ui/grid/model/grid-column';

@Component({
  selector: 'app-work-area-table',
  templateUrl: './work-area-table.component.html',
  styleUrls: ['./work-area-table.component.scss']
})
export class WorkAreaTableComponent implements OnInit {
  private nameTranslate: string;
  private typeTranslate: string;

  public columns = new Array<GridColumn>();
  public workAreas: Array<WorkArea> = [];
  public tracktionField = 'id';

  @Input() locked = false;
  @Input() hideSelection = false;
  @Input() focusEntityId = 0;

  constructor(private workAreaService : WorkAreaService, private translation: TranslationService) {
    this.initWorkAreas();
  }

  ngOnInit() {
    this.translation.translationChanged().subscribe(
      () => {
        this.nameTranslate = this.translation.translate('name');
        this.typeTranslate = this.translation.translate('type');
      }
    );
    this.workAreaService.addNewWorkArea.subscribe((workArea: WorkArea) => {
      this.workAreas.push(workArea);
    });
    this.workAreaService.removeWorkArea.subscribe((workAreaId: number) => {
      this.workAreas.splice(workAreaId, 1);
    });
    this.workAreaService.changeWorkArea.subscribe((workArea: WorkArea) => {
      this.workAreas[this.workAreaService.getWorkAreaIdForChange()] = workArea;
    });
    this.initGrid();
  }

  private initWorkAreas(): void {
    this.workAreaService.getAllWorkAreas().forEach((workArea: WorkArea) => {
      this.workAreas.push(workArea);
    })
  }

  private initGrid(): void {
    this.columns.push({ header: '№', field: 'id' });
    this.columns.push({ header: this.nameTranslate, field: 'name' });
    this.columns.push({ header: this.typeTranslate, field: 'department.name' });;
  }

  public onRowClick(department: WorkArea): void {
    this.focusEntityId = department.id;
    this.workAreaService.setWorkAreaById(this.focusEntityId);
  }
}
