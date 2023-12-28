import { GenericApiService } from './../../services/generic-api.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UpdateTableService } from '../../services/update-table.service';
import { Department, Job } from '../../models/table.model';

@Component({
  selector: 'app-button-with-modal',
  templateUrl: './button-with-modal.component.html',
  styleUrls: ['./button-with-modal.component.css'],
})
export class ButtonWithModalComponent implements OnInit {
  @ViewChild('closeButton') closeButton: any;
  @ViewChild('form') form!: ElementRef;
  @Input() formModel: any;
  @Input() jobs: Job[];
  @Input() departments: Department[];
  @Input() buttonName: string;
  @Input() buttonClass: string;
  @Input() modalTitle: string;
  @Input() submitButtonName: string;
  @Input() item: any;
  @Input() status: string;
  @Input() id: string | number;
  @Input() icon: string;

  statusSubscription$: Subscription;
  tableStatus: string;

  @Output() responseItem = new EventEmitter<{ item: any; status: string }>();

  constructor(
    private genericApiService: GenericApiService,
    private updateTableService: UpdateTableService
  ) {
    this.statusSubscription$ = this.genericApiService.status.subscribe(
      (res) => {
        this.tableStatus = res;
        this.formModel = null;
      }
    );
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  //Create
  AddNewItem() {
    let newItem = this.form['dynamicFormGroup'].value;
    this.genericApiService
      .createNewItem(this.tableStatus, newItem)
      .subscribe((res) => {
        this.responseItem.emit({
          item: res,
          status: 'add',
        });
        this.form['dynamicFormGroup'].reset();
        this.closeModal();
      });
  }
  //Update
  updateItem(id) {
    let itemToUpdate = this.form['dynamicFormGroup'].value;
    this.genericApiService
      .editItem(this.tableStatus, id, itemToUpdate)
      .subscribe((res) => {
        this.responseItem.emit({
          item: { id, ...itemToUpdate },
          status: 'edit',
        });
        this.closeModal();
      });
  }
  //Delete
  deleteItem() {
    this.genericApiService
      .deleteItem(this.tableStatus, this.item.id)
      .subscribe((res) => {
        this.responseItem.emit({
          item: this.item,
          status: 'delete',
        });
        this.closeModal();
      });
  }
  //Form Creation
  getFormModel() {
    this.formModel = this.updateTableService.displayEntryFormModel(
      this.item,
      this.jobs,
      this.departments,
      this.tableStatus
    );
  }
  //CloseModal
  closeModal() {
    this.closeButton.nativeElement.click();
  }
  //Submit
  onSubmit() {
    if (this.status !== 'delete') {
      if (this.form['dynamicFormGroup'].valid) {
        switch (this.status) {
          case 'add':
            this.AddNewItem();
            break;
          case 'edit':
            this.updateItem(this.item.id);
            break;
        }
      } else {
        // Form is invalid, handle invalid form (e.g., display error messages)
        this.form['dynamicFormGroup'].markAllAsTouched();
      }
    } else {
      this.deleteItem();
    }
  }

  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
