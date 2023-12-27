import { GenericTableService } from './../../services/generic-table.service';
import { GenericApiService } from '../../services/generic-api.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { JobApisService } from '../../services/job-apis.service';
import { DepartmentApisService } from '../../services/department-apis.service';
import { DashboardService } from '../../services/dashboard.service';
import { ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  items;
  tableStatus: string;
  statusSubscription$: Subscription;
  tableHeader;
  jobs;
  departments;
  item;

  constructor(
    private genericApiService: GenericApiService,
    private genericTableService: GenericTableService,
    private jobApisService: JobApisService,
    private departmentApisService: DepartmentApisService,
    private dashboardService: DashboardService
  ) {
    this.items = [];
    this.getAllJobs();
    this.statusSubscription$ = this.genericApiService.status.subscribe(
      (res) => {
        this.getAllItems();
        this.tableStatus = res;
        this.tableHeader = this.genericTableService.genericTableHeader(
          this.tableStatus
        );
      }
    );
  }

  ngOnInit() {}

  getAllJobs() {
    this.jobApisService.getAllJobs().subscribe((res) => {
      this.jobs = res;
      this.getAllDepartments();
    });
  }

  getAllDepartments() {
    this.departmentApisService.getAllDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  onIncludingjobAndDepartment(event) {
    let job = this.jobs.filter((x) => x.id == event.item.jobId)[0];
    event.item.job = job;
    let department = this.departments.filter(
      (x) => x.id == event.item.departmentId
    )[0];
    event.item.department = department;
  }
  onUpdateUi(event) {
    if (event.status === 'add') {
      this.onIncludingjobAndDepartment(event);
      this.items.push(event.item);
    } else if (event.status === 'edit') {
      this.onIncludingjobAndDepartment(event);
      this.items = this.items
        .map((obj) => {
          if (obj.id == event.item.id) {
            return event.item;
          }
          return obj;
        })
        .slice();
    } else if (event.status === 'delete') {
      this.items = this.items.filter((item) => item.id !== event.item.id);
    }
  }

  onDeleting(id) {
    this.genericApiService.deleteItem(id).subscribe((res) => {
      this.onUpdateUi({
        id: id,
        status: 'delete',
      });
    });
  }

  manageJobs() {
    this.genericApiService.status.next('Jobs');
  }

  manageDepartments() {
    this.genericApiService.status.next('Departments');
  }
  manageEntries() {
    this.genericApiService.status.next('Entries');
  }

  getAllItems() {
    this.genericApiService.getAllItems().subscribe((res) => (this.items = res));
  }

  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
