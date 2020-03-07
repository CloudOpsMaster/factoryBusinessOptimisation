import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { InstrumentService } from '../../instrument.service';
import {
  InstrumentServis,
  StatusItem
} from 'src/app/models/instrument-service/instrument-service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { DisplayValueItem } from 'src/app/common/model/display-value-item';
import { CreateStatusItemsService } from '../../create-status-items.service';

@Component({
  selector: 'app-instrument-service-table-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class InstrumentServiceTableItemComponent implements OnInit, OnChanges {
  @Input() instrument: InstrumentServis;
  @Input() indexItem: number;

  @Output() itemId: EventEmitter<number> = new EventEmitter();
  @Output() deleteItem: EventEmitter<number> = new EventEmitter();
  @Output() updateItem: EventEmitter<number> = new EventEmitter();
  @Output() private saveItem: EventEmitter<
    InstrumentServis
  > = new EventEmitter();

  public titleSaveBtn = 'Сохранить';
  public titleEdidtBtn = 'Изменить';
  public titleDeleteBtn = 'Удалить';
  public showCancelBtn = false;
  public updade = false;
  public servicesEditForm: FormGroup;
  public instruments: InstrumentServis[] = [];
  public readonly = true;

  public errorDate = false;

  private updateItemId;

  statusItems: Array<DisplayValueItem>;

  historyArr: InstrumentServis[] = [];

  constructor(
    private instrumentService: InstrumentService,
    private createStatusItemsService: CreateStatusItemsService
  ) {
    this.createStatusItems();
  }

  ngOnInit() {
    if (this.instrumentService.hasKey()) {
      this.instruments = this.instrumentService.getData();
    }

    this.initForm();
  }

  ngOnChanges() {
    this.initForm();
    this.validatorDate();
  }

  // ##################################

  initForm() {
    const item = this.instrumentService.getById(this.instrument.id);

    this.servicesEditForm = new FormGroup({
      startDate: new FormControl(item.startDate, [Validators.required]),
      endDate: new FormControl(item.endDate, [Validators.required]),
      status: new FormControl(item.status, [Validators.required]),
      description: new FormControl(item.description)
    });

    this.servicesEditForm.controls.startDate.valueChanges.subscribe(
      valStartDate => {
        this.servicesEditForm.controls.endDate.valueChanges.subscribe(
          valEndDate => {
            this.errorDate = valStartDate > valEndDate ? true : false;
            this.readonly = valStartDate > valEndDate ? true : false;
          }
        );
      }
    );
  }

  // ##################################

  onDelete() {
    this.deleteItem.emit(this.instrument.id);
  }

  onUpdate() {
    this.updateItem.emit(this.instrument.id);
    this.instrumentService.disabledFlag(true);
    this.onShowCancelBtn();
    this.disable();
  }

  onSave() {
    const newItem = new InstrumentServis(
      this.servicesEditForm.get('startDate').value,
      this.servicesEditForm.get('endDate').value,
      this.servicesEditForm.get('status').value,
      this.servicesEditForm.get('description').value,
      (this.updateItemId = this.instrument.id)
    );

    if (this.validatorDate()) {
      return;
    } else {
      this.saveItem.emit(newItem);
      this.disable();
      this.onShowCancelBtn();
    }
  }

  validatorDate(): boolean {
    if (
      this.servicesEditForm.controls.startDate.value >
      this.servicesEditForm.controls.endDate.value
    ) {
      this.errorDate = true;
      return true;
    }
  }

  disable() {
    this.readonly = !this.readonly;
  }

  onShowCancelBtn() {
    this.showCancelBtn = !this.showCancelBtn;
  }

  createStatusItems() {
    this.statusItems = this.createStatusItemsService.getStatusItems();
  }
}
