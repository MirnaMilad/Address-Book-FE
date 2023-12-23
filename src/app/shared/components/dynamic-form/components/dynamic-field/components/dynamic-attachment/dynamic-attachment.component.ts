import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-attachment',
  templateUrl: './dynamic-attachment.component.html',
  styleUrls: ['./dynamic-attachment.component.css'],
})
export class DynamicAttachmentComponent {
  @Input() formName: FormGroup;
  @Input() field;
  numberOfFiles: number = 0;
  
  // handleCategoryBanner(files) {
  //   this.numberOfFiles = files.length;
  //   let data = new FormData();
  //   let fileItem = files[0];
  //   data.append(files[0].name, fileItem);
  // }

  onFileChange(files, inputElementId) {
    if (files[0]) {
      const formControlName = inputElementId; // Set the form control name dynamically
      const formControlValue = files[0]; // File to set in the form control
      this.formName.patchValue({
        [formControlName]: formControlValue
      });
    }
  }
}
