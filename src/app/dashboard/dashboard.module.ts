import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonWithModalComponent } from './components/button-with-modal/button-with-modal.component';


@NgModule({
  declarations: [
    DashboardPageComponent,
    ButtonWithModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers:[
  ]
})
export class DashboardModule { }
