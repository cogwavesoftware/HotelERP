import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { AuthenticationService,UserService } from '../_services';

import {CustomValidators} from 'ng2-validation';
import {ToastrService} from 'ngx-toastr'

import { loginMaster } from './../_models/loginMaster';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signups',
  templateUrl: './signups.component.html',
  styleUrls: ['./signups.component.scss']
})
export class SignupsComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted:boolean;
  loginMaster:loginMaster;
  error:string;
  body = document.getElementsByTagName('body')[0];
  DisplayText =" Get OTP";
  isDisabled = "true";  

  

  constructor(  private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router, private authenticationService: AuthenticationService) { }
 
 

  ngOnInit() {  
    this.body.classList.add("loginsignupbg");    
  }


  ngOnDestroy(){
    this.body.classList.remove("loginsignupbg");
  }


  OnSubmit(username: string ,password:string)
     {  
     
        this.submitted = true;
        // stop here if form is invalid
        // if (this.loginForm.invalid) 
        // {
        //     return;
        // }
        this.loading = true;
        this.authenticationService.gologin(username, password)   
            .subscribe(data =>                 
                {
                   this.authenticationService.GetloginuserDetails(username)
                   .subscribe(data=>{
                     this.loginMaster=data;
                    console.log(data.UserId)
                  localStorage.setItem('id',data.UserId.toString());
                  localStorage.setItem('BranchCode',data.BranchCode.toString());
                   })
                   
                    this.router.navigate(['/dashboard/default']);
                },
                error => {
                   console.log("error");
                    this.error = error;
                    this.loading = false;
                });
    }


    @ViewChild("otppassword",{static: false}) nameField: ElementRef;

    toggle() : void{      
      this.DisplayText = "Login";
      this.isDisabled = "false";
      this.nameField.nativeElement.focus();
       
    }

}
