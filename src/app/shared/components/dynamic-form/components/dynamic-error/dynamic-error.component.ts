import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-dynamic-error',
  templateUrl: './dynamic-error.component.html',
  styleUrls: ['./dynamic-error.component.css']
})
export class DynamicErrorComponent implements OnInit{
  @Input() formName: FormGroup;
  @Input() fieldName: string;
  @Input() fieldLabel: string;
  constructor(private formgroupDirective: FormGroupDirective) {}

  ngOnInit() {
    this.formName = this.formgroupDirective.control;
  }
}
