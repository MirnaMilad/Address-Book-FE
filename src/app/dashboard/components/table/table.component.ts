import { GenericTableService } from './../../services/generic-table.service';
import { GenericApiService } from '../../services/generic-api.service';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Button, Department, Job } from '../../models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() items: any;
  buttonsArr: Button[];
  tableStatus: string;
  statusSubscription$: Subscription;
  tableHeader: string[];
  jobs: Job[];
  departments: Department[];
  item: any;

  constructor(
    private genericApiService: GenericApiService,
    private genericTableService: GenericTableService
  ) {
    this.buttonsArr = this.genericTableService.buttons;
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
    this.genericApiService.getAllItems('Jobs').subscribe((res: Job[]) => {
      this.jobs = res;
      this.getAllDepartments();
    });
  }

  getAllDepartments() {
    this.genericApiService
      .getAllItems('departments')
      .subscribe((res: Department[]) => {
        this.departments = res;
      });
  }

  //Get All
  getAllItems() {
    this.genericApiService
      .getAllItems(this.tableStatus)
      .subscribe((res) => (this.items = res));
  }
  // Getting specific Job and Department using its Id
  onIncludingjobAndDepartment(event) {
    let job = this.jobs.filter((x) => x.id == event.item.jobId)[0];
    event.item.job = job;
    let department = this.departments.filter(
      (x) => x.id == event.item.departmentId
    )[0];
    event.item.department = department;
  }
  // For Updating ui without reload behavior
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
  //To display selected table
  manageItem(item) {
    this.genericApiService.status.next(item);
  }

  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
