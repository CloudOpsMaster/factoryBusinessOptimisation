import { Component } from '@angular/core';
import { Language, LocaleService } from 'angular-l10n';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Language() lang: string;

  constructor(public locale: LocaleService) { }

  selectLocale(language: string, country: string): void {
    this.locale.setDefaultLocale(language, country);
  }
}
