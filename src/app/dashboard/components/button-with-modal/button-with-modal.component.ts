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
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-button-with-modal',
  templateUrl: './button-with-modal.component.html',
  styleUrls: ['./button-with-modal.component.css'],
})
export class ButtonWithModalComponent implements OnInit {
  @ViewChild('closeButton') closeButton: any;
  formModel;
  jobs;
  departments;
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
    private dashboardService: DashboardService,
    private jobApisService: JobApisService,
    private departmentApisService: DepartmentApisService
  ) {
    this.getAllJobs();
  }

  ngOnInit(): void {
  }
  AddNewItem() {
    let newItem = this.form['dynamicFormGroup'].value;
    console.log(newItem)
    this.genericApiService.createNewItem(newItem).subscribe((res) => {
      this.responseItem.emit({
        item: newItem,
        status: 'add',
        jobs: this.jobs,
        departments: this.departments,
      });
      this.form['dynamicFormGroup'].reset();
      this.closeModal();
    });
  }
  // AddNewEntry() {
  //   let newEntry = this.form['dynamicFormGroup'].value;
  //   this.entryApisService
  //     .createNewEntry(newEntry)
  //     .subscribe((res) => {
  //       this.responseEntry.emit({
  //         entry:newEntry,
  //         status:'add',
  //         jobs:this.jobs,
  //         departments:this.departments
  //       })
  //       this.form['dynamicFormGroup'].reset();
  //       this.closeModal();
  //     });
  // }
  updateItem(id) {
    let itemToUpdate = this.form['dynamicFormGroup'].value;
    console.log(this.form)
    this.genericApiService.editItem(id, itemToUpdate).subscribe((res) => {
      this.responseItem.emit({
        item: { id, ...itemToUpdate },
        status: 'edit',
        jobs: this.jobs,
        departments: this.departments,
      });
      this.closeModal();
    });
  }

  getAllJobs() {
    this.jobApisService.getAllJobs().subscribe((res) => {
      this.jobs = res;
      this.getAllDepartments();
    });
  }

  getAllDepartments() {
    this.departmentApisService.getAllDepartments().subscribe((res) => {
      this.departments = res;
      this.formModel = this.dashboardService.displayEntryFormModel(
        this.item,
        this.jobs,
        this.departments
      );
    });
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

  onSubmit(id) {
    console.log(this.status)
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
  }
}
