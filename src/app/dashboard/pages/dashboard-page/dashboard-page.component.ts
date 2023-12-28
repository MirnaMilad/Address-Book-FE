import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { GenericApiService } from '../../services/generic-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  items: any;
  statusSubscription$: Subscription;
  tableStatus: string;
  searchCriteria: string;
  constructor(
    private router: Router,
    private genericApiService: GenericApiService
  ) {
    this.statusSubscription$ = this.genericApiService.status.subscribe(
      (res) => {
        this.tableStatus = res;
        this.searchCriteria = null;
      }
    );
  }

  search() {
    this.genericApiService
      .search(this.tableStatus, this.searchCriteria)
      .subscribe((res) => {
        this.items = res;
        this.searchCriteria = null;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
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
