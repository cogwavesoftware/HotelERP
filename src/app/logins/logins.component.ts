import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services';

import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {
body =  document.getElementsByTagName('body')[0];
  loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    isShow=false;
    isDisabled = true;
    displayText ="Get OTP";
   
  public config: any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private toastser:ToastrService ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      // alert(this.returnUrl)

      this.body.classList.add("loginsignupbg");
    }
    ngOnDestroy(){
      this.body.classList.remove("loginsignupbg");
    }
    openMyModal(event) {
        document.querySelector('#' + event).classList.add('md-show');
      }    
      closeMyModal(event) {
        ((event.target.parentElement).parentElement).classList.remove('md-show');
      }
    
           
    // convenience getter for easy access to form fields
    get f() 
    { 
        return this.loginForm.controls;
    }

    Doclick()
    {

    this.toastser.success('Super done',"d");
    console.log('Super done');
    }

    toggle(){
        this.displayText="Login";
        this.isDisabled = false;
    }
    onSubmit()
     {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) 
        {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }


    
}
