import { GenericApiService } from './../../services/generic-api.service';
import { DepartmentApisService } from './../../services/department-apis.service';
import { JobApisService } from './../../services/job-apis.service';
import { DashboardService } from './../../services/dashboard.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-button-with-modal',
  templateUrl: './button-with-modal.component.html',
  styleUrls: ['./button-with-modal.component.css'],
})
export class ButtonWithModalComponent implements OnInit {
  @ViewChild('closeButton') closeButton: any;
  @Input() formModel;
  @Input() jobs;
  @Input() departments;
  @ViewChild('form') form!: ElementRef;
  @Input() buttonName: string;
  @Input() buttonClass: string;
  @Input() modalTitle: string;
  @Input() submitButtonName: string;
  @Input() item;
  @Input() status: string;
  @Input() id: string | number;

  @Output() responseItem = new EventEmitter<any>();

  constructor(
    private genericApiService: GenericApiService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    if (this.status !== 'delete') {
      this.formModel = this.dashboardService.displayEntryFormModel(
        this.item,
        this.jobs,
        this.departments
      );
    }
  }

  ngAfterViewInit() {}
  AddNewItem() {
    let newItem = this.form['dynamicFormGroup'].value;
    this.genericApiService.createNewItem(newItem).subscribe((res) => {
      this.responseItem.emit({
        item: newItem,
        status: 'add',
      });
      this.form['dynamicFormGroup'].reset();
      this.closeModal();
    });
  }
  updateItem(id) {
    let itemToUpdate = this.form['dynamicFormGroup'].value;
    this.genericApiService.editItem(id, itemToUpdate).subscribe((res) => {
      this.responseItem.emit({
        item: { id, ...itemToUpdate },
        status: 'edit',
      });
      this.closeModal();
    });
  }

  deleteItem() {
    this.genericApiService.deleteItem(this.item.id).subscribe(
      res=>{
        this.responseItem.emit({
          item: this.item,
          status: 'delete',
        });
        this.closeModal();
      })
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

  onSubmit(id) {
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
}
