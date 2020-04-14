import { Component, Input } from '@angular/core';
import { MedicalCard } from 'src/app/models/hr/medical-card';
import { BaseEditor } from '../base-editor';

@Component({
  selector: 'app-medical-info-editor',
  templateUrl: './medical-info-editor.component.html',
  styleUrls: ['./medical-info-editor.component.css']
})
export class MedicalInfoEditorComponent extends BaseEditor {

  @Input() medicalCard: MedicalCard;

  get descriptionReadonly(): boolean {
    return !this.editMode || !this.medicalCard.disabled;
  }
  constructor() {
    super();
  }

}
