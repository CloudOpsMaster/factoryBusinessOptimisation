import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/materials/category';
import { StorageKey, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-materials-dictionary',
  templateUrl: './materials-dictionary.component.html',
  styleUrls: ['./materials-dictionary.component.scss']
})
export class MaterialsDictionaryComponent implements OnInit {
  categories: Category[];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.categories = this.storageService.getData(StorageKey.Materials);
  }
}
