import { Component, OnInit } from '@angular/core';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/storage/storage.service';

@Component({
  selector: 'app-instrument-servises',
  templateUrl: './instrument-servises.component.html',
  styleUrls: ['./instrument-servises.component.scss']
})
export class InstrumentServisesComponent implements OnInit {

  public servicesForm: FormGroup;

  public instruments: InstrumentServis[] = [];

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.servicesForm = new FormGroup({
      'id': new FormControl(null, [Validators.required]),
      'startDate': new FormControl(''),
      'endDate': new FormControl(''),
      'status': new FormControl(''),
      'description': new FormControl('')
    });
  }

  onAdd(){
    if (this.servicesForm.valid) {
      const newItem = new InstrumentServis(
        this.servicesForm.get('id').value, 
        this.servicesForm.get('startDate').value, 
        this.servicesForm.get('endDate').value,
        this.servicesForm.get('status').value,
        this.servicesForm.get('description').value
        )

        this.instruments.push(
          newItem
        );

        if (this.storage.has('_services')) {
          this.storage.delete('_services');
        }
        
        this.storage.set('_services', this.instruments);
    }
  }


  onDelete(index: number) {
    this.instruments.splice(index,1);
    
    if (this.storage.has('_services')) {
      this.storage.delete('_services');
    }
    
    this.storage.set('_services', this.instruments);
  }

  onUppdate(element: InstrumentServis, index: number): void {
    this.servicesForm.get('description').setValue(element.description);
    
    const newDescription = 'Some text';
    const newInstrument: InstrumentServis = { ...element, description: newDescription };

    this.instruments.splice(index, 1, newInstrument);
  }

}
