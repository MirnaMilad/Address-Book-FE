import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-field',
  templateUrl: './dynamic-field.component.html',
  styleUrls: ['./dynamic-field.component.css'],
})
export class DynamicFieldComponent {
  @Input() formName: FormGroup;
  @Input() field;
  @Input() checkerForm;
  @Input() isReviewing: boolean;
  @Input() isInlineInput: boolean;

  ngOnInit() {}
}
