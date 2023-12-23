
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormGroup} from '@angular/forms';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit{
  dynamicFormGroup: FormGroup;
  fields;
  form;
  @Input() buttonName: string;
  @Input() model: any;
  @Input() class: string;
  @Output() formValuesEmitter = new EventEmitter<any>(); // Event Emitter to send Data
  
  @Input() isReviewing:boolean;
  @Input() isInlineInput:boolean;

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formService.buildForm(this.model);
    this.dynamicFormGroup = this.form.formgroup;
    this.fields = this.form.fields;
  }

  onSubmitForm() {
    if (this.dynamicFormGroup.valid) {
      
    this.formValuesEmitter.emit(this.dynamicFormGroup.value);
      // Form is valid, proceed with form submission logic
      console.log('Form submitted!');
    } else {
      // Form is invalid, handle invalid form (e.g., display error messages)
      console.log(this.dynamicFormGroup)
      console.log('Form is invalid. Please check the fields.');
      // You can also mark all fields as touched to display validation errors
      this.dynamicFormGroup.markAllAsTouched();
    }
  }
}
