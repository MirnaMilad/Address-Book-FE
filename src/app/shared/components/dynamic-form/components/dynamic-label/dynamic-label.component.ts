import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-label',
  templateUrl: './dynamic-label.component.html',
  styleUrls: ['./dynamic-label.component.css']
})
export class DynamicLabelComponent {
  @Input() formName: FormGroup;
  @Input() field: any;
  @Input() isSubModel:boolean
  @Input() checkerForm:boolean

  ngOnInit() {
  }
}
