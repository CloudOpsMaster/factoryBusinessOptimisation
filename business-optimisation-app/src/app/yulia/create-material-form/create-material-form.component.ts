import { Component, OnInit } from '@angular/core';
import { StorageKeys, StorageService } from '../../services/storage.service';
import { Category } from '../../models/materials/category';
import { Provider } from '../../models/materials/provider';
import { Unit } from '../../models/materials/material';

@Component({
  selector: 'app-create-material-form',
  templateUrl: './create-material-form.component.html',
  styles: [`
    .mt-32 {
        margin-top: 32px;
    }  
  `]
})
export class CreateMaterialFormComponent implements OnInit {
  categories: Category[];
  providers: Provider[];
  units: Unit[];
  category: Category;
  data: any;

  constructor(private st: StorageService) { }

  ngOnInit() {
    this.categories = this.st.getData(StorageKeys.Materials);
    this.providers = this.st.getData(StorageKeys.MaterialProviders) || [{name: 'Provider1'}, {name: 'Provider2'}];
    this.units = this.st.getData(StorageKeys.MaterialUnits) || [{name: 'шт'}, {name: 'л'}, {name: 'мм'}];
    console.log(this.categories);
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
