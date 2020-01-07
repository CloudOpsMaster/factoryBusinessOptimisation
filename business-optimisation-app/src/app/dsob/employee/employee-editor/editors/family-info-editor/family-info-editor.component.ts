import { Component, Input } from '@angular/core';
import { BaseEditor } from '../base-editor';
import { FamilyInfo, Child } from 'src/app/models/HR/FamilyInfo';

@Component({
  selector: 'app-family-info-editor',
  templateUrl: './family-info-editor.component.html',
  styleUrls: ['./family-info-editor.component.css']
})
export class FamilyInfoEditorComponent extends BaseEditor {

  @Input() family: FamilyInfo;

  get childCount(): string {
    let response = 'нет';
    if (this.family && this.family.children.length > 0) {
      response = this.family.children.length.toString();
    }
    return response;
  }

  get addNewChildDisabled(): boolean {
    return !this.editMode || !this.newChild.dob;
  }

  newChild = new Child();
  editChildId = -1;

  editCaptionFor(child: Child): string {
    if (child.id === this.editChildId) {
      return 'Отмена';
    } else {
      return 'Изменить';
    }
  }

  isDobReadonlyForChild(child): boolean {
    return child.id !== this.editChildId;
  }

  onAddChild() {
    this.assignIdForNewChild();
    this.family.children.push(this.newChild.clone());
    this.newChild = new Child();
  }

  onDeleteClick(child: Child) {
    this.family.children = this.family.children.filter(c => c.id !== child.id);
  }

  onEditClick(child: Child) {
    if (child.id === this.editChildId) {
      this.editChildId = -1;
    } else {
      this.editChildId = child.id;
    }
  }

  constructor() {
    super();
  }

  private assignIdForNewChild() {
    if (this.family.children.length > 0) {
      this.newChild.id = this.family.children[this.family.children.length - 1].id + 1;
    } else {
      this.newChild.id = 1;
    }
  }

}
