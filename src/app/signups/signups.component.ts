import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthenticationService,UserService } from '../_services';

import {CustomValidators} from 'ng2-validation';
import {ToastrService} from 'ngx-toastr'

import { loginMaster } from './../_models/loginMaster';
import { HttpErrorResponse } from '@angular/common/http';

import { SuperAdmin } from './../_models/SuperAdmin';
@Component({
  selector: 'app-signups',
  templateUrl: './signups.component.html',
  styleUrls: ['./signups.component.scss']
})
export class SignupsComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted:boolean;
  superadmin:SuperAdmin;
  error:string;
  mobileno:string;
  body = document.getElementsByTagName('body')[0];
  DisplayText ="Get OTP";
  isDisabled = "true";  
  OTP:number;
  

  constructor(  private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router, private authenticationService: AuthenticationService) { }
 
 

  ngOnInit() 
  {  
    this.body.classList.add("loginsignupbg");    
  }


  ngOnDestroy()
  {
    this.body.classList.remove("loginsignupbg");
  }


  OnSubmit(username: string ,password:string)
     {  
       alert ("submit")
        this.submitted = true;
        this.loading = true;
        this.authenticationService.gosuperadminlogin(username, password)   
            .subscribe(data =>                 
                {
                   this.authenticationService.GetsuperAdminloginDetails()
                   .subscribe(data=>{
                     this.superadmin=data;
                    console.log(data.Id)
                    this.mobileno=data.MobileNo
                    localStorage.setItem('id',data.Id.toString());
                    this.authenticationService.OneTimpOTPForSuperAdmin(this.mobileno).subscribe(res => {
                      this.OTP=Number(res);  
                    })
                  
                   })                   
                    //this.router.navigate(['/dashboard']);
                },
                error => {
                   console.log("error");
                    this.error = error;
                    this.loading = false;
                });
    }


    @ViewChild("otppassword",{static: false}) nameField: ElementRef;
 
    toggle(otp) : void
    {   
     
      if ( this.DisplayText =="Get OTP")
      {
        this.OnSubmit("SuperAdmin","SuperAdmin")  
        this.DisplayText = "Login";
        this.isDisabled = "false";
        this.nameField.nativeElement.focus();
      } 
      else
      {
       this.CheckOTP(otp);
      }
 
    }

    
    CheckOTP(Userotp:number)
    {
      if(Userotp==this.OTP)
        {               
         this.router.navigate(['/dashboard']);
        }
        error => {
         console.log("error");
          this.error = error;
          this.loading = false;
      }; 
    }

}
