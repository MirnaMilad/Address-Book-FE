import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.css'],
})
export class DynamicInputComponent {
  @Input() formName: FormGroup;
  @Input() field;

  ngOnInit() {
  }

}
