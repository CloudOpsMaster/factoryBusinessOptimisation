import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { InstrumentServis } from 'src/app/models/instrumentServis/InstrumentServis';
import { InstrumentService } from '../instrument.service';
import { DisplayValueItem } from 'src/app/common/model/display-value-item';
import { CreateStatusItemsService } from '../create-status-items.service';

@Component({
  selector: 'app-instrument-service-form',
  templateUrl: './instrument-service-form.component.html',
  styleUrls: ['./instrument-service-form.component.css']
})
export class InstrumentServiceFormComponent implements OnInit, OnChanges {

  // @Input() set itemId(id: number) {
  //   if (id && id > -1) {
  //    const item = this.instrumentService.getById(id);
  //    this.servicesForm.get('startDate').setValue(item.startDate),
  //    this.servicesForm.get('endDate').setValue(item.endDate),
  //     this.servicesForm.get('status').setValue(item.status),
  //     this.servicesForm.get('description').setValue(item.description);
  //   }
  //   this.updateItemId = id;

  //   this.disabledSaveBtn = this.instrumentService.getDisabledFlag();
  // }

  @Output() private setItem: EventEmitter<InstrumentServis> = new EventEmitter();
  // @Output() private updateItem: EventEmitter<InstrumentServis> = new EventEmitter();


// ##############################

  public servicesForm: FormGroup;

  public disabled = true;
  public errorDate = false;
  public disabledSaveBtn = true;
  public titleAddBtn = 'Добавить';

  statusItems: Array<DisplayValueItem>;

  private updateItemId;


  // ##############################

  constructor(private storage: StorageService,
              private instrumentService: InstrumentService,
              private createStatusItemsService: CreateStatusItemsService) {
                this.createStatusItems();
              }


  // ##############################

  ngOnInit() {
    this.initForm();
    this.ngOnChanges();
  }

  initForm() {
    this.servicesForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      description: new FormControl('')
    });

    this.servicesForm.controls.startDate.valueChanges.subscribe((valStartDate) => {
      this.servicesForm.controls.endDate.valueChanges.subscribe((valEndDate) => {
          this.errorDate = (valStartDate > valEndDate) ? true : false;
          this.disabled = (this.errorDate && valStartDate > valEndDate) ? true : false;
      });
    });

  }

  ngOnChanges() {
    this.initForm();
  }

  onAdd() {
    const newItem = new InstrumentServis(
      this.servicesForm.get('startDate').value,
      this.servicesForm.get('endDate').value,
      this.servicesForm.get('status').value,
      this.servicesForm.get('description').value
      );

    this.setItem.emit(newItem);


    // this.initForm();
    this.resetSearchForm();
  }


  createStatusItems() {
    this.statusItems = this.createStatusItemsService.getStatusItems();
  }

  resetSearchForm() {
    this.servicesForm.patchValue({
      startDate: undefined,
      endDate: undefined,
      status: undefined,
      description: ''
    });

    this.disabled = true;
  }

    // onSave() {
    //   const newSaveItem = new InstrumentServis(
    //     this.servicesForm.get('startDate').value,
    //     this.servicesForm.get('endDate').value,
    //     this.servicesForm.get('status').value,
    //     this.servicesForm.get('description').value,
    //     this.updateItemId
    //     );

    //   this.updateItem.emit(newSaveItem);

    //   this.instrumentService.disabledFlag(false);
    //   this.disabledSaveBtn = false;
    //   this.initForm();
    // }

  }

