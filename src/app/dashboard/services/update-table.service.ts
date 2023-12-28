import { Injectable } from '@angular/core';
import { Department, Job } from '../models/table.model';

@Injectable({
  providedIn: 'root',
})
export class UpdateTableService {
  constructor() {}

  displayEntryFormModel(
    item: any,
    jobs: Job[],
    departments: Department[],
    status: string
  ) {
    let newItem;
    if (status == 'Entries') {
      newItem = {
        fullName: {
          label: 'Full Name',
          value: item ? item.fullName : '',
          col: 'col-12 py-2',
          type: 'text',
          rules: {
            required: true,
          },
        },
        jobId: {
          label: 'Job',
          value: item?.job?.id ? item.job.id : '',
          col: 'col-12 py-2',
          type: 'select',
          options: jobs,
          rules: {
            required: true,
          },
        },
        departmentId: {
          label: 'Department',
          value: item?.department?.id ? item.department.id : '',
          col: 'col-12 py-2',
          type: 'select',
          options: departments,
          rules: {
            required: true,
          },
        },
        mobileNumber: {
          label: 'Mobile Number',
          value: item ? item.mobileNumber : '',
          col: 'col-12 py-2',
          type: 'number',
          rules: {
            required: true,
            phoneNumber: true,
          },
        },
        dateOfBirth: {
          label: 'Date of birth',
          value: item ? item.dateOfBirth : '',
          col: 'col-12 py-2',
          type: 'date',
          rules: {
            required: true,
          },
        },
        address: {
          label: 'Address',
          value: item ? item.address : '',
          col: 'col-12 py-2',
          type: 'text',
          rules: {
            required: true,
          },
        },
        email: {
          label: 'Email',
          value: item ? item.email : '',
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
          value: item ? item.age : '',
          col: 'col-12 py-2',
          type: 'number',
          rules: { required: true },
        },
      };
    } else {
      newItem = {
        title: {
          label: 'Title',
          value: item?.title ? item?.title : '',
          col: 'col-12 py-2',
          type: 'text',
          rules: {
            required: true,
          },
        },
        description: {
          label: 'Description',
          value: item?.description ? item?.description : '',
          col: 'col-12 py-2',
          type: 'text',
          rules: {
            required: true,
          },
        },
      };
    }
    return newItem;
  }
}
