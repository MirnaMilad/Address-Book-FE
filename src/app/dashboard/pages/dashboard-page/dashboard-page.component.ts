import { EntryApisService } from './../../services/entryApis.service';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  addNewEntryformModel;
  entryForEditing;
  entries;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router,
    private entryApisService: EntryApisService
  ) {
    this.entries = [];
  }

  ngOnInit(): void {
    this.getAllEntries();
  }

  getAllEntries() {
    this.entryApisService
      .getAllEntries()
      .subscribe((res) => (this.entries = res));
  }

  onUpdateUi(event) {
    if (event.status === 'add') {
      let job = event.jobs.filter((x) => x.id == event.entry.jobId)[0];
      event.entry.job = job;
      let department = event.departments.filter(
        (x) => x.id == event.entry.departmentId
      )[0];
      event.entry.department = department;
      this.entries.push(event.entry);
    }else if(event.status === 'edit'){
      let job = event.jobs.filter((x) => x.id == event.entry.jobId)[0];
      event.entry.job = job;
      let department = event.departments.filter(
        (x) => x.id == event.entry.departmentId
      )[0];
      event.entry.department = department;

     this.entries = this.entries.map(obj => {
      // console.log(obj.id)
        if (obj.id == event.entry.id) {
          return event.entry; // Using spread operator
          // Alternatively: return Object.assign({}, obj, { name: 'Updated Bob' });
        }
        return obj;
      }
      ).slice();
      console.log(this.entries)
    }
  }

  search() {}

  logout() {
    localStorage.removeItem('token');
    this.authService.setAuthenticated(false);
    this.router.navigate(['/login']);
    this.authService.loggedInSubject.next(false);
  }

  downloadExcelSheet() {
    var filename = 'Roles.xlsx';
    /* pass here the table id */
    let element1 = document.getElementById('excel');
    const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element1);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'Roles');

    /* save to file */
    XLSX.writeFile(wb, filename);
  }
}
