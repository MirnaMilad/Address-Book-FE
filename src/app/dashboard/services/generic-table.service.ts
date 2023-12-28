import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Button } from '../models/table.model';

@Injectable({
  providedIn: 'root',
})
export class GenericTableService {
  statusSubscription$: Subscription;
  tableHeader: string[];
  buttons: Button[];
  constructor() {
    this.buttons = [
      {
        buttonName: 'Entries',
      },
      {
        buttonName: 'Departments',
      },
      {
        buttonName: 'Jobs',
      },
    ];
  }

  genericTableHeader(status) {
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
      return this.tableHeader;
    } else {
      this.tableHeader = ['Title', 'Description', 'Edit', 'Delete'];
      return this.tableHeader;
    }
  }

  ngOnDestroy() {
    this.statusSubscription$.unsubscribe();
  }
}
