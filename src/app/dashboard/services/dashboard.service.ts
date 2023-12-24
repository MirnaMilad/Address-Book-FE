import { DepartmentApisService } from './department-apis.service';
import { JobApisService } from './job-apis.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  displayEntryFormModel(entry, jobs, departments) {
    let newEntry = {
      fullName: {
        label: 'Full Name',
        value: entry ? entry.fullName : '',
        col: 'col-12 py-2',
        type: 'text',
        rules: {
          required: true,
        },
      },
      jobId: {
        label: 'Job',
        value: entry ? entry.job.id : '',
        col: 'col-12 py-2',
        type: 'select',
        options: jobs,
        rules: {
          required: true,
        },
      },
      departmentId: {
        label: 'Department',
        value: entry ? entry.department.id : '',
        col: 'col-12 py-2',
        type: 'select',
        options: departments,
        rules: {
          required: true,
        },
      },
      mobileNumber: {
        label: 'Mobile Number',
        value: entry ? entry.mobileNumber : '',
        col: 'col-12 py-2',
        type: 'number',
        rules: {
          required: true,
          phoneNumber: true,
        },
      },
      dateOfBirth: {
        label: 'Date of birth',
        value: entry ? entry.dateOfBirth : '',
        col: 'col-12 py-2',
        type: 'date',
        rules: {
          required: true,
        },
      },
      address: {
        label: 'Address',
        value: entry ? entry.address : '',
        col: 'col-12 py-2',
        type: 'text',
        rules: {
          required: true,
        },
      },
      email: {
        label: 'Email',
        value: entry ? entry.email : '',
        col: 'col-12 py-2',
        type: 'text',
        rules: { required: true, email: true },
      },
      // photo: {
      //   withLabel: false,
      //   label: 'Photo',
      //   value: '',
      //   col: 'col-12 py-2',
      //   type: 'attachment',
      //   rules: {
      //     required: true,
      //   },
      // },
      age: {
        label: 'Age',
        value: entry ? entry.age : '',
        col: 'col-12 py-2',
        type: 'number',
        rules: { required: true },
      },
    };
    return newEntry;
  }
}