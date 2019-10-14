import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

@Directive({
  selector: '[appCustomdirective]'
})
export class CustomdirectiveDirective {

  constructor() { }

}

@Directive({
  selector: '[appJuriValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: JuriValidatorDirective, multi: true }
  ]
})
export class JuriValidatorDirective implements Validator{

  validator: ValidatorFn;
  
  constructor() {
    this.validator = this.validateJuriNameFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }

  validateJuriNameFactory() : ValidatorFn {
    return (c: AbstractControl) => {
      
      //implement check algo
      let isValid = c.value == 'Juri'; //c.value refers to $event.target.value
      
      //end implementation return isValid flag
      
      if(isValid) {
        return null;
      } else {
        return {
          juriName: {
            valid: false
          }
        };
      }
  
    }
  }

}


@Directive({
  selector: '[appAgeValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: AgeValidatorDirective, multi: true }
  ]
})
export class AgeValidatorDirective implements Validator{

  validator: ValidatorFn;
  
  constructor() {
    this.validator = this.validateAge();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }

  validateAge() : ValidatorFn {
    return (c: AbstractControl) => {
      
      //implement check algo
      let isValid = false;

      const first_leapday_ref = (31+29+365*2) * 1000 * 60 * 60 * 24;

      let dateString = new Date().toLocaleDateString();
      let currentDate = Date.parse(dateString);
      let selectDate = Date.parse(c.value); //c.value refers to $event.target.value

      let numLeapDaysCurrent = Math.floor((currentDate-first_leapday_ref)/(1000 * 60 * 60 * 24 * 1461));
      let numLeapDaysSelect = Math.floor((selectDate-first_leapday_ref)/(1000 * 60 * 60 * 24 * 1461));

      let LeapDaysDelMs = (numLeapDaysCurrent - numLeapDaysSelect)*(1000 * 60 * 60 * 24);

      if(Math.floor((currentDate - selectDate - LeapDaysDelMs) / (1000 * 60 * 60 * 24 * 365))>=18){
        isValid = true;
      }

      //end implementation return isValid flag
      
      if(isValid) {
        return null;
      } else {
        return {
          agePass: {
            valid: false
          }
        };
      }
  
    }
  }

}
