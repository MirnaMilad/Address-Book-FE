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
  constructor() {}

  genericTableHeader(status){
    console.log(status)
    if (status === 'Entries') {
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
      return this.tableHeader
    } else {
      this.tableHeader = ['Title', 'Description', 'Edit', 'Delete'];
      return this.tableHeader
    }
  }


  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
