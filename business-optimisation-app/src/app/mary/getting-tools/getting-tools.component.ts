import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-getting-tools',
  templateUrl: './getting-tools.component.html',
  styleUrls: ['./getting-tools.component.scss']
})
export class GettingToolsComponent implements OnInit {
  plots: Array<string> = [
    "Швейный",
    "Напиловка"
  ];

  posts: Array<string> = [
    "Сборщик",
    "Паралонщик"
  ];

  notes: Array<string> = [
    "Ремонт",
    "Проверка",
    "Списание"
  ];

  constructor() { }

  ngOnInit() {
  }

}
