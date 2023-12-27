import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonWithModalComponent } from './components/button-with-modal/button-with-modal.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardPageComponent,
    ButtonWithModalComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers:[
  ]
})
export class DashboardModule { }
