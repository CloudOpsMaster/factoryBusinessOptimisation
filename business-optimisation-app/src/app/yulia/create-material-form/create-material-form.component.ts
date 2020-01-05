import { Component, OnInit } from '@angular/core';
import { StorageKey, StorageService } from '../../services/storage.service';
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
    this.categories = this.st.getData(StorageKey.Materials);
    this.providers = this.st.getData(StorageKey.MaterialProviders) || [{name: 'Provider1'}, {name: 'Provider2'}];
    this.units = this.st.getData(StorageKey.MaterialUnits) || [{name: 'шт'}, {name: 'л'}, {name: 'мм'}];
    console.log(this.categories);
  }

  set() {
    this.st.addData(StorageKey.Materials, this.category);
  }

  delete() {
    this.st.deleteData(StorageKey.Materials);
  }

  get() {
    this.data = this.st.getData(StorageKey.Materials);
  }
}
