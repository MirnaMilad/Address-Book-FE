import { GenericTableService } from './../../services/generic-table.service';
import { GenericApiService } from '../../services/generic-api.service';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() items;
  tableStatus: string;
  statusSubscription$: Subscription;
  tableHeader;
  jobs;
  departments;
  item;

  constructor(
    private genericApiService: GenericApiService,
    private genericTableService: GenericTableService
  ) {
    this.items = [];
    this.getAllJobs();
    this.statusSubscription$ = this.genericApiService.status.subscribe(
      (res) => {
        this.tableStatus = res;
        this.getAllItems();
        this.tableHeader = this.genericTableService.genericTableHeader(
          this.tableStatus
        );
      }
    );
  }

  ngOnInit() {}

  getAllJobs() {
    this.genericApiService.getAllItems('Jobs').subscribe((res) => {
      this.jobs = res;
      this.getAllDepartments();
    });
  }

  getAllDepartments() {
    this.genericApiService.getAllItems('departments').subscribe((res) => {
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
    this.genericApiService.deleteItem(this.tableStatus, id).subscribe((res) => {
      this.onUpdateUi({
        id: id,
        status: 'delete',
      });
    });
  }

  manageItem(item) {
    this.genericApiService.status.next(item);
  }

  getAllItems() {
    this.genericApiService
      .getAllItems(this.tableStatus)
      .subscribe((res) => (this.items = res));
  }

  

  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
