import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-work-place',
  templateUrl: './work-place.component.html',
  styleUrls: ['./work-place.component.scss']
})
export class WorkPlaceComponent {

  public canShowWorkPlaceForm: boolean = false;
  public addTranslate: string;

  constructor(public translation: TranslationService) {
    this.translation.translationChanged().subscribe(
      () => {
        this.addTranslate = this.translation.translate('add');
      }
    );
  }
  public showWorkPlaceForm(): void {
    this.canShowWorkPlaceForm = (!this.canShowWorkPlaceForm) ? true : false;
  }
}
