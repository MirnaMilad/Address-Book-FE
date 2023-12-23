import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicLabelComponent } from './components/dynamic-form/components/dynamic-label/dynamic-label.component';
import { DynamicFieldComponent } from './components/dynamic-form/components/dynamic-field/dynamic-field.component';
import { DynamicSelectComponent } from './components/dynamic-form/components/dynamic-field/components/dynamic-select/dynamic-select.component';
import { DynamicInputComponent } from './components/dynamic-form/components/dynamic-field/components/dynamic-input/dynamic-input.component';
import { DynamicAttachmentComponent } from './components/dynamic-form/components/dynamic-field/components/dynamic-attachment/dynamic-attachment.component';
import { DynamicErrorComponent } from './components/dynamic-form/components/dynamic-error/dynamic-error.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicLabelComponent,
    DynamicFieldComponent,
    DynamicSelectComponent,
    DynamicInputComponent,
    DynamicAttachmentComponent,
    DynamicErrorComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    DynamicFormComponent
  ]
})
export class SharedModule { }
