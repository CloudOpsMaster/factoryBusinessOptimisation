import { Component } from '@angular/core';
import { Language, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @Language() lang: string;

  constructor(public locale: LocaleService) { }

  selectLocale(language: string, country: string): void {
    this.locale.setDefaultLocale(language, country);
  } 
}
