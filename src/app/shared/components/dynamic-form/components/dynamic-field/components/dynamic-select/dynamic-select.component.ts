import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.css'],
})
export class DynamicSelectComponent {
  @Input() formName: FormGroup;
  @Input() field;

  constructor() {
  }
}
