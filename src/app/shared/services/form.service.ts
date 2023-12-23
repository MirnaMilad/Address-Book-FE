import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  buildForm(model) {
    let formgroup: FormGroup;
    const formGroupFields = this.getFormControlsFields(model);
    // Creating the form Builer
    formgroup = new FormGroup(formGroupFields.formGroupFields);
    let fields = formGroupFields.fields;
    return { formgroup, fields };
  }

  getFormControlsFields(model) {
    const formGroupFields = {};
    let fields = [];
    for (const field of Object.keys(model)) {
      const fieldProps = model[field];
      const validators = this.addValidator(fieldProps.rules); // To Add validators to each field
      this.createFormControl(
        fieldProps,
        field,
        formGroupFields,
        validators,
        fields
      );
    }
    return { formGroupFields, fields };
  }

  createFormControl(fieldProps, field, formGroupFields, validators, fields) {
    fields.push({ ...fieldProps, fieldName: field }); // To Add field Name (key in model) in the fields
    formGroupFields[field] = new FormControl(fieldProps.value, validators); // To Create (new FormControl) to each key of the Object and put it in formGroupFields
  }

  private addValidator(rules) {
    // if it has no validators it will send empty array in  validators
    if (!rules) {
      return [];
    }
    // if it has rules it will add it as a validator
    const validators = Object.keys(rules).map((rule) => {
      switch (rule) {
        case 'required':
          return Validators.required;
        case 'email':
          return Validators.email;
        case 'phoneNumber':
          return phoneNumberValidator();
        case 'password':
          return passwordPatternValidator();
        //add more cases for the future.
      }
      return null;
    });
    return validators;
  }
}
// Custom validator function for phone number
export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Regular expression for a valid phone number
    const phoneNumberPattern = /^\d{10}$/;

    // Check if the control's value matches the pattern
    if (control.value && !phoneNumberPattern.test(control.value)) {
      return { phoneNumber: true }; // Validation failed
    }

    return null; // Validation passed
  };
}
// Custom validator function for Password
export function passwordPatternValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value;

    if (!password) {
      return null; // No validation error if the password is empty
    }

    // Define your password pattern here
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      return { password: true }; // Validation error if the pattern is not met
    }

    return null; // No validation error
  };
}
