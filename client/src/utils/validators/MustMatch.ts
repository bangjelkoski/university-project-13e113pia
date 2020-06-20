import { FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

export function MustMatch(controlName: string, matchingControlName: string) {
  const mustMatchValidation: ValidatorFn = (
    formGroup: FormGroup
  ): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };

  return mustMatchValidation;
}

export function MustNotMatch(controlName: string, matchingControlName: string) {
  const mustNotMatchValidation: ValidatorFn = (
    formGroup: FormGroup
  ): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustNotMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value === matchingControl.value) {
      matchingControl.setErrors({ mustNotMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };

  return mustNotMatchValidation;
}
