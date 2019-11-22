
import { Directive, Input ,HostListener} from '@angular/core';

import { ValidationErrors, Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";


@Directive({
    selector: `[appConfirm]`
  })
  export class ConfirmValidatorDirective {
    @Input() appConfirm = () => {};
    @Input() confirmMessage = 'Are you sure you want to do this?';
  
    @HostListener('click', ['$event'])
    confirmFirst() {
      const confirmed = window.confirm(this.confirmMessage);
  
      if(confirmed) {
        this.appConfirm();
      }
    }
  }