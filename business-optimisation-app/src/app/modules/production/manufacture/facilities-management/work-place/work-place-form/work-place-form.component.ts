import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorkPlace } from 'src/app/models/facilities-management/work-place';
import { WorkArea } from 'src/app/models/facilities-management/work-area';
import { LocationService } from '../../location/location.service';
import { Location } from 'src/app/models/facilities-management/location';
import { WorkPlaceService } from '../work-place.service';
import { WorkAreaService } from '../../work-area/work-area.service';

@Component({
  selector: 'app-work-place-form',
  templateUrl: './work-place-form.component.html',
  styleUrls: ['./work-place-form.component.scss']
})
export class WorkPlaceFormComponent {
  private workPlace: WorkPlace = null;
  
  public canShowWorkPlaceFormForChange: boolean;
  public workPlaceForm: FormGroup;
  public workAreas: Array<WorkArea> = [];
  public locations: Array<Location> = [];
  public countFloors: Array<number> = null;

  @Input() canShowWorkPlaceForm: boolean;

  constructor(private workPlaceService: WorkPlaceService, private workAreaService: WorkAreaService, private locationService: LocationService) {
    this.workAreas = this.workAreaService.getAllWorkAreas();
    this.locations = this.locationService.getAllLocations();
    this.createForm();
    this.workPlaceService.variableWorkPlace.subscribe((workPlace: WorkPlace) => {
      if (workPlace && workPlace.id > -1) {
        this.canShowWorkPlaceFormForChange = true;
        this.canShowWorkPlaceForm = true;
        this.workPlace = workPlace;
        this.setLocation(workPlace);
      }
    })
  }

  private createForm(): void {
    this.workPlaceForm = new FormGroup({
      workPlace: new FormControl(null),
      workArea: new FormControl(null),
      location: new FormControl(null),
      floor: new FormControl(null),
      comment: new FormControl(null),
    })
  }

  public getLocationFromSelect(): void {
    const location: Location = this.workPlaceForm.get('location').value;
    let index = 1;
    this.countFloors = [];
    while (index != location.address.floors) {
      this.countFloors.push(index++);
    }
  }

  private getWorkPlace(): WorkPlace {
    const workPlace = new WorkPlace();
    workPlace.name = this.workPlaceForm.get('workPlace').value;
    workPlace.workArea = this.workPlaceForm.get('workArea').value;
    workPlace.location = this.workPlaceForm.get('location').value;
    workPlace.floor = this.workPlaceForm.get('floor').value;
    workPlace.comment = this.workPlaceForm.get('comment').value;
    return workPlace;
  }

  private clearForm(): void {
    this.workPlaceForm.reset();
  }

  private setViewForm(): void {
    this.canShowWorkPlaceFormForChange = false;
    this.canShowWorkPlaceForm = false;
  }

  public onSave(): void {
    this.getWorkPlace();
    this.workPlaceService.add(this.getWorkPlace());
    this.clearForm();
  }

  public onChange(): void {
    this.workPlaceService.change(this.getWorkPlace(), this.workPlace);
    this.clearForm();
    this.setViewForm();
  }

  public onCancel(): void {
    this.clearForm();
    this.setViewForm();
  }

  public onDelete(): void {
    this.workPlaceService.remove(this.workPlace);
    this.clearForm();
    this.setViewForm();
  }

  private setLocation(workPlace: WorkPlace): void {
    this.workPlaceForm.get('workPlace').setValue(workPlace.name);
    this.workPlaceForm.get('workArea').setValue(this.workAreas[this.getWorkAreaId(workPlace.workArea)]);
    this.workPlaceForm.get('location').setValue(this.locations[this.getLocationId(workPlace.location)]);
    this.getLocationFromSelect();
    const floor = workPlace.floor;
    this.workPlaceForm.get('comment').setValue(this.workPlace.comment);
    this.workPlaceForm.get('floor').setValue(this.countFloors[floor-1]);
  }

  private getWorkAreaId(workArea: WorkArea): number {
    return this.workAreas.map(wa => { return wa.id; }).indexOf(workArea.id);
  }

  private getLocationId(location: Location): number {
    return this.locations.map(l => { return l.id; }).indexOf(location.id);
  }
}
