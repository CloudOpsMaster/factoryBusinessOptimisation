import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IWorkSite } from 'src/app/models/plot/work-site';

@Component({
  selector: 'app-work-site-form',
  templateUrl: './work-site-form.component.html',
  styleUrls: ['./work-site-form.component.scss']
})
export class WorkSiteFormComponent implements OnInit {
  workSiteForm: FormGroup;
  canDisplayForm: boolean;

  @Output() reset = new EventEmitter<boolean>();
  @Output() renovation = new EventEmitter<IWorkSite>();
  @Output() deletion = new EventEmitter<IWorkSite>();

  @Input() set openForm(value: boolean) { this.canDisplayForm = value; }
  @Input() set row(value: IWorkSite) {
    if (value != null) {
      this.workSiteForm.get('id').setValue(value.id);
      this.workSiteForm.get('name').setValue(value.name);
    }
  }

  constructor() {
    this.createForm();
  }

  ngOnInit() { }

  private createForm(): void {
    this.workSiteForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl()
    })
  }

  private getWorkSite(): any {
    const workSite = <IWorkSite>{
      id: this.workSiteForm.get('id').value,
      name: this.workSiteForm.get('name').value
    };
    return workSite;
  }

  private onChange(): void {
    this.renovation.emit(this.getWorkSite());
    this.onReset();
  }

  private onDelete(): void {
    this.deletion.emit(this.getWorkSite());
    this.onReset();
  }

  private onReset(): void {
    this.workSiteForm.reset();
    this.reset.emit(true);
  }
}
