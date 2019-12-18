import { Component, OnInit } from '@angular/core';
import { StorageKeys, StorageService } from '../../services/storage.service';
import { Category } from '../../models/materials/category';

@Component({
  selector: 'app-create-material-form',
  templateUrl: './create-material-form.component.html'
})
export class CreateMaterialFormComponent implements OnInit {
  categories: Category[];
  category: Category;
  data: any;

  constructor(private st: StorageService) { }

  ngOnInit() {
    this.st.getData(StorageKeys.Materials);
  }

  set() {
    this.st.setData(StorageKeys.Materials, this.category);
  }

  delete() {
    this.st.deleteData(StorageKeys.Materials);
  }

  get() {
    this.data = this.st.getData(StorageKeys.Materials);
  }
}
