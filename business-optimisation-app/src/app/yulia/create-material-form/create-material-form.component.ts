import { Component, OnInit } from '@angular/core';
import { Material, MaterialBuilder } from '../../models/materials/material';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-create-material-form',
  templateUrl: './create-material-form.component.html'
})
export class CreateMaterialFormComponent implements OnInit {
  material: Material;
  data: any;

  constructor(private st: StorageService) { }

  ngOnInit() {
    this.material = new MaterialBuilder('Wood')
      .setCount(3)
      .setDescription('Some description')
      .setHeight(12)
      .setWeight(2)
      .setLength(23)
      .build();
    console.log(this.material);
  }

  set() {
    this.st.setData('materials', this.material);
  }

  delete() {
    this.st.deleteData('materials');
  }

  get() {
    this.data = this.st.getData('materials');
  }
}
