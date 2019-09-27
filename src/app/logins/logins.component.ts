
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';

import { AuthenticationService,UserService } from '../_services';

import {CustomValidators} from 'ng2-validation';
import {ToastrService} from 'ngx-toastr'

import { loginMaster } from './../_models/loginMaster';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-logins',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.scss']
})
export class LoginsComponent implements OnInit {
  // body =  document.getElementsByTagName('body')[0];
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    mobile:string;
    returnUrl: string;
    loginMaster:loginMaster;
    error = '';
    isShow=false;
    public roles =[];
    isLoginError:boolean;
    isOTPEntered:boolean;
    OTP:number;
    displayText="Get OTP";
    isDisabled ="true";
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private toastser:ToastrService
        ) {
          console.log("constr")
        }

    ngOnInit() { 
      console.log("ngonit")
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      // alert(this.returnUrl)

      // this.body.classList.add("loginsignupbg");
    }

    ngOnDestroy(){
      // this.body.classList.remove("loginsignupbg");
    }
    openMyModal(event)
     {
       
        document.querySelector('#' + event).classList.add('md-show');
      }  
      
      
      closeMyModal(event,mobile)
       { 
       
        
        ((event.target.parentElement).parentElement).classList.remove('md-show');


       }


       CheckOTP(Userotp:number)
       {
         if(Userotp==this.OTP)
           {
             
            this.authenticationService.GetloginuserDetailsbyMobileno(this.mobile)
            .subscribe(data=>{
              this.loginMaster=data;
             console.log(data.UserId)   
             localStorage.setItem('id',data.UserId.toString());
             localStorage.setItem('IsRole',data.IsRole.toString());
             localStorage.setItem('BranchCode',data.BranchCode.toString());
             
            })        
            this.router.navigate(['/dashboard/default']);
           }
           error => {
            console.log("error");
             this.error = error;
             this.loading = false;
         }; 
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
                  localStorage.setItem('id',data.UserId.toString());  
                  localStorage.setItem('IsRole',data.IsRole.toString());
                  localStorage.setItem('BranchCode',data.BranchCode.toString());
                   })
                   console.log("Before")
                   console.log(data.IsRole)
                   console.log("after")
                    this.router.navigate(['/dashboard/default']);
                },
                error => {
                   console.log("error");
                    this.error = error;
                    this.loading = false;
                });
    }


    toggle(mobile,otp)
    {
      if(this.displayText=="Get OTP")
      {
        
        this.displayText="Login";
        this.isDisabled ="false";
        this.loading = true;
        this.authenticationService.gologin(mobile, "cogwaveotp")
        .subscribe(data =>                 
          {
            console.log(data.access_token)
           if(data.access_token !=null)
           {      
             this.mobile=mobile;    
            this.authenticationService.GenerateonetimeOTP(mobile).subscribe(data => {
                this.OTP= Number(data);
               
                console.log( this.OTP)
            })
   
           }            
          },
          error => {
             console.log("error");
              this.error = error;
              this.loading = false;
          });
      }
      else
      {
        this.CheckOTP(otp);
      }
       
    }
}
























// OnSubmift(userName,password)
// {

//    this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
//      console.log(data);
//     localStorage.setItem('userToken',data.access_token);
//     localStorage.setItem('userRoles',data.role);
//   //  this.router.navigate(['/home']);
//     this.router.navigate([this.returnUrl]);
//   },
//   (err : HttpErrorResponse)=>{
//     this.isLoginError = true;
//   });
// }




// convenience getter for easy access to form fields
    // get f() 
    // { 
    //     return this.loginForm.controls;
    // }

    // OnSubmit(username: string ,password:string)
    //  {  
    //     this.submitted = true;
    //     // stop here if form is invalid
    //     // if (this.loginForm.invalid) 
    //     // {
    //     //     return;
    //     // }
    //     this.loading = true;
    //     this.authenticationService.gologin(username, password)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.error = error;
    //                 this.loading = false;
    //             });
    // }

    // getdetailgs()
    // {
    //   this.authenticationService.getUserDetails("Francis","123").subscribe(data:any) =>
    //     {
    //       debugger;
    //       if (data !== null) 
    //       {
    //         alert("inside")
    //         console.log(data);
    //       }          
    //     }
    //   ); 
    // }


    // getdetails() {
       
    //   this.authenticationService.getUserDetails()
    //   .subscribe(data =>
    //    console.log(data)
    //   );
    // }
    // getbranch()
    // {
        
    //   this.authenticationService.getplans()
    //   .subscribe(data =>
    //     {
    //       alert("plan")
    //       console.log(data)
    //     }
        
    //   );
    // }