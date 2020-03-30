import { Component } from '@angular/core';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent {
  public canShowDepartmentForm: boolean = false;
  public addTranslate: string;

  constructor(public translation: TranslationService) {
    this.translation.translationChanged().subscribe(
      () => {
        this.addTranslate = this.translation.translate('add');
      }
    );
  }

  public showDepartmentForm(): void {
    this.canShowDepartmentForm = (!this.canShowDepartmentForm) ? true : false;
  }
}
