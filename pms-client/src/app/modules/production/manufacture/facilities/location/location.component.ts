import { Component } from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent {

  public addTranslate: string;
  public canShowLocationForm: boolean = false;

  constructor(public translation: TranslationService) {
    this.translation.translationChanged().subscribe(
      () => {
        this.addTranslate = this.translation.translate('add');
      }
    );
  }

  public showLocationForm(): void {
    this.canShowLocationForm = (!this.canShowLocationForm) ? true : false;
  }
}