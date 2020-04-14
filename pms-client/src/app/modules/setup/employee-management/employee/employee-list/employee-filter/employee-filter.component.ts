import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeFilter } from './employee-filter';
import { TranslationService } from 'angular-l10n';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css']
})
export class EmployeeFilterComponent implements OnInit {

  @Input() locked = false;
  @Output() applyFilter = new EventEmitter<EmployeeFilter>();

  visible = false;
  filter = new EmployeeFilter();
  applyTitle: string;
  resetTitle: string;

  constructor(private translation: TranslationService) { }

  ngOnInit() {
    this.translation.translationChanged().subscribe(() => {
      this.applyTitle = this.translation.translate('apply');
      this.resetTitle = this.translation.translate('reset');
    });
  }

  onApplyClick() {
    this.applyFilter.emit(this.filter);
  }

  onResetClick() {
    this.filter = new EmployeeFilter();
    this.onApplyClick();
  }

  onFilterClick() {
    this.visible = !this.visible;
  }

}
