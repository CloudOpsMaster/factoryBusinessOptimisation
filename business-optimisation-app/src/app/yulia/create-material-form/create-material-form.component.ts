import { Component, OnInit } from '@angular/core';
import { Material, MaterialBuilder } from '../../models/materials/material';

@Component({
  selector: 'app-create-material-form',
  templateUrl: './create-material-form.component.html'
})
export class CreateMaterialFormComponent implements OnInit {
  material: Material;

  constructor() { }

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

}
