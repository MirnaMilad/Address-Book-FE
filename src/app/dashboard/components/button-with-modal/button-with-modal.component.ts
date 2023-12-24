import { DepartmentApisService } from './../../services/department-apis.service';
import { JobApisService } from './../../services/job-apis.service';
import { EntryApisService } from './../../services/entryApis.service';
import { DashboardService } from './../../services/dashboard.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

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
  @Input() entry;
  @Input() status: string;
  @Input() id: string | number;

  @Output() responseEntry = new EventEmitter<any>();

  constructor(
    private entryApisService: EntryApisService,
    private dashboardService: DashboardService,
    private jobApisService: JobApisService,
    private departmentApisService: DepartmentApisService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getAllJobs();
  }
  AddNewEntry() {
    let newEntry = this.form['dynamicFormGroup'].value;
    this.entryApisService
      .createNewEntry(newEntry)
      .subscribe((res) => {
        this.responseEntry.emit({
          entry:newEntry,
          status:'add',
          jobs:this.jobs,
          departments:this.departments
        })
        this.closeModal();
      });
  }
  updateEntry(id) {
    let entryToUpdate = this.form['dynamicFormGroup'].value;
    this.entryApisService
      .editEntry(id, entryToUpdate)
      .subscribe((res) => {
        this.responseEntry.emit({
          entry:{id , ...entryToUpdate},
          status:'edit',
          jobs:this.jobs,
          departments:this.departments
        })
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
        this.entry,
        this.jobs,
        this.departments
      );
    });
  }

  closeModal(){
    this.closeButton.nativeElement.click();
  }

  onSubmit(id) {
    if (this.form['dynamicFormGroup'].valid) {
      switch (this.modalTitle) {
        case 'Add New Entry':
          this.AddNewEntry();
          break;
        case 'Edit Entry':
          this.updateEntry(this.entry.id);
          break;

      }
    } else {
      // Form is invalid, handle invalid form (e.g., display error messages)
      this.form['dynamicFormGroup'].markAllAsTouched();
    }
  }
}
