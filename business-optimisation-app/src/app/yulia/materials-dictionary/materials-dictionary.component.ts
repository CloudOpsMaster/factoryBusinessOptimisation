import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/materials/category';
import { MaterialBuilder } from '../../models/materials/material';
import { StorageKeys, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-materials-dictionary',
  templateUrl: './materials-dictionary.component.html',
  styleUrls: ['./materials-dictionary.component.scss']
})
export class MaterialsDictionaryComponent implements OnInit {
  categories: Category[] = [
    {
      name: 'Wood',
      materials: [
        new MaterialBuilder('Wood1')
          .setId(12344)
          .build(),
        new MaterialBuilder('Wood2')
          .setId(12344)
          .build(),
        new MaterialBuilder('Wood3')
          .setId(12344)
          .build()
      ]
    },
    {
      name: 'Instruments',
      materials: [
        new MaterialBuilder('Instrument1')
          .setId(12344)
          .build(),
        new MaterialBuilder('Instrument2')
          .setId(12344)
          .build(),
        new MaterialBuilder('Instrument3')
          .setId(12344)
          .build(),
      ]
    }
  ];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.setData(StorageKeys.Materials, this.categories);
    this.categories[1].materials[2].isActive = false;
  }

}
