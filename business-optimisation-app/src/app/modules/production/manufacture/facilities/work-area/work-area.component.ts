import { Component } from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-work-area',
  templateUrl: './work-area.component.html',
  styleUrls: ['./work-area.component.scss']
})
export class WorkAreaComponent {

  public canShowWorkAreaForm: boolean = false;
  public addTranslate: string;

  constructor(public translation: TranslationService) {
    this.translation.translationChanged().subscribe(
      () => {
        this.addTranslate = this.translation.translate('add');
      }
    );
  }

  public showWorkAreaForm(): void {
    this.canShowWorkAreaForm = (!this.canShowWorkAreaForm) ? true : false;
  }
}
