import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root',
})
export class GenericTableService {
  statusSubscription$: Subscription;
  tableStatus;
  tableData;
  tableHeader;
  constructor(private genericService: GenericApiService) {
    this.statusSubscription$ = this.genericService.status.subscribe((res) => {
      this.tableStatus = res;
      if (this.tableStatus === 'Entries') {
        this.tableHeader = [
          'Full Name',
          'Job',
          'Department',
          'Mobile Number',
          'Date of birth',
          'Address',
          'Email',
          'Age',
          'Edit',
          'Delete',
        ];
      } else {
        this.tableHeader = ['Title', 'Description', 'Edit', 'Delete'];
      }
    });
  }
  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
