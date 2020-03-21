import { Component, OnInit, Input } from '@angular/core';
import { GridColumn } from 'src/app/common/ui/grid/model/grid-column';
import { WorkPlace } from 'src/app/models/facilities-management/work-place';
import { WorkPlaceService } from '../work-place.service';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-work-place-table',
  templateUrl: './work-place-table.component.html',
  styleUrls: ['./work-place-table.component.scss']
})
export class WorkPlaceTableComponent implements OnInit {
  private workPlace: string;
  private workArea: string;
  private street: string;
  private buildingNumber: string;
  private floor: string;
  private comment: string;

  public columns = new Array<GridColumn>();
  public workPlaces: Array<WorkPlace> = [];
  public tracktionField = 'id';

  @Input() locked = false;
  @Input() hideSelection = false;
  @Input() focusEntityId = 0;

  constructor(private workPlaceService : WorkPlaceService, private translation: TranslationService) {
    this.initWorkAreas();
  }

  ngOnInit() {
    this.translation.translationChanged().subscribe(
      () => {
        this.workPlace = this.translation.translate('workPlace');
        this.workArea = this.translation.translate('workArea');
        this.street = this.translation.translate('street');
        this.buildingNumber = this.translation.translate('buildingNumber');
        this.floor = this.translation.translate('floor');
        this.comment = this.translation.translate('description');
      }
    );

    this.workPlaceService.addNewWorkPlace.subscribe((workPlace: WorkPlace) => {
      this.workPlaces.push(workPlace);
    });
    this.workPlaceService.removeWorkPlace.subscribe((workPlaceId: number) => {
      this.workPlaces.splice(workPlaceId, 1);
    });
    this.workPlaceService.changeWorkPlace.subscribe((workPlace: WorkPlace) => {
      this.workPlaces[this.workPlaceService.getWorkPlaceIdForChange()] = workPlace;
    });
    this.initGrid();
  }

  private initWorkAreas(): void {
    this.workPlaceService.getAllWorkPlaces().forEach((workPlace: WorkPlace) => {
      this.workPlaces.push(workPlace);
    })
  }

  private initGrid(): void {
    this.columns.push({ header: '№', field: 'id' });
    this.columns.push({ header: this.workPlace, field: 'name' });
    this.columns.push({ header: this.workArea, field: 'workArea.name' });
    this.columns.push({ header: this.street, field: 'location.address.street'});
    this.columns.push({ header: this.buildingNumber, field: 'location.address.buildingNumber'});
    this.columns.push({ header: this.floor, field: 'floor' });
    this.columns.push({ header: this.comment, field: 'comment' });
  }

  public onRowClick(workPlace: WorkPlace): void {
    this.focusEntityId = workPlace.id;
    this.workPlaceService.setWorkAreaById(this.focusEntityId);
  }
}
