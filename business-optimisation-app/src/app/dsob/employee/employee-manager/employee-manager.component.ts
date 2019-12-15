import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.css']
})
export class EmployeeManagerComponent implements OnInit {

  currentEmployeeId = -1;

  constructor() { }

  ngOnInit() {
  }

  onCurrentEmpChanged(id: number) {
    this.currentEmployeeId = id;
  }

}
