import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validItemValidator(validItems: any[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = validItems.some(item => item.id === control.value?.id);
    return isValid ? null : { 'invalidItem': { value: control.value } };
  };

}