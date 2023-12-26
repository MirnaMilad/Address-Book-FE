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
export class DashboardPageComponent {

  constructor(
    private router: Router,
  ) {
  }
  search() {}

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
