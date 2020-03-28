import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { GridColumn } from 'src/app/common/ui/grid/model/grid-column';
import { LocaleService, TranslationService } from 'angular-l10n';
import { LocationService } from '../location.service';
import { Location } from "../../../../../../models/facilities-management/location"

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.scss']
})
export class LocationTableComponent implements OnInit {
  private cityTranslate: string;
  private streetTranslate: string;
  private buildingNumberTranslate: string;
  private floorsTranslate: string;
  private commentTranslate: string;

  public columns = new Array<GridColumn>();
  public locations: Array<Location> = [];
  public tracktionField = 'id';

  @Input() locked = false;
  @Input() hideSelection = false;
  @Input() focusEntityId = 0;

  constructor(public locale: LocaleService, public translation: TranslationService, private locationServise: LocationService) {
    this.initLocations();
  }

  ngOnInit() {
    this.translation.translationChanged().subscribe(
      () => {
        this.cityTranslate = this.translation.translate('city');
        this.streetTranslate = this.translation.translate('street');
        this.buildingNumberTranslate = this.translation.translate('buildingNumber');
        this.floorsTranslate = this.translation.translate('countFloors');
        this.commentTranslate = this.translation.translate('description');
      }
    );
    this.locationServise.addNewLocation.subscribe((location: Location) => {
      this.locations.push(location);
    })
    this.locationServise.removeLocation.subscribe((locationId: number) => {
      this.locations.splice(locationId, 1);
    })
    this.locationServise.changeLocation.subscribe((location: Location) => {
      this.locations[this.locationServise.getLocationIdForChange()] = location;
    })
    this.initGrid();
  }

  private initLocations(): void {
    this.locationServise.getAllLocations().forEach((location: Location) => {
      this.locations.push(location);
    })
  }

  private initGrid(): void {
    this.columns.push({ header: '№', field: 'id' });
    this.columns.push({ header: this.cityTranslate, field: 'address.city' });
    this.columns.push({ header: this.streetTranslate, field: 'address.street' });
    this.columns.push({ header: this.buildingNumberTranslate, field: 'address.buildingNumber' });
    this.columns.push({ header: this.floorsTranslate, field: 'address.floors' });
    this.columns.push({ header: this.commentTranslate, field: 'comment' });
  }

  public onRowClick(location: Location): void {
    this.focusEntityId = location.id;
    this.locationServise.setLocationById(this.focusEntityId);
  }
}