
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
  body =  document.getElementsByTagName('body')[0];
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    mobile:string;
    returnUrl: string;
    loginMaster:loginMaster;
    error = '';
    isShow=false;
<<<<<<< HEAD
    isDisabled = true;
    displayText ="Get OTP";
   
  public config: any;
=======
    public roles =[];
    isLoginError:boolean;
    isOTPEntered:boolean;
    OTP:number;
>>>>>>> ca3c5d1aa1a62f09e6b976f1d088b548ba2ace79
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,private toastser:ToastrService
        ) {}

    ngOnInit() { 
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
    openMyModal(event)
     {
        document.querySelector('#' + event).classList.add('md-show');
<<<<<<< HEAD
      }    
      closeMyModal(event) {
        ((event.target.parentElement).parentElement).classList.remove('md-show');
      }
    
           
    // convenience getter for easy access to form fields
    get f() 
    { 
        return this.loginForm.controls;
    }
=======
      }  
      
      
      closeMyModal(event,mobile)
       { 
       
        console.log(mobile);
        ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
>>>>>>> ca3c5d1aa1a62f09e6b976f1d088b548ba2ace79

        this.loading = true;
        this.authenticationService.gologin(mobile, "cogwaveotp")
        .subscribe(data =>                 
          {

           if(!data)
           {      
             this.mobile=mobile;    
            this.authenticationService.GenerateonetimeOTP(mobile).subscribe(data => {
                this.OTP=data;
            })
            // this.authenticationService.GetloginuserDetailsbyMobileno(mobile)
            // .subscribe(data=>{
            //   this.loginMaster=data;
            //  console.log(data.UserId)   
            //  localStorage.setItem('id',data.UserId.toString());
            //  localStorage.setItem('BranchCode',data.BranchCode.toString());
            // })             
           //  this.router.navigate(['/dashboard/default']);
           }            
          },
          error => {
             console.log("error");
              this.error = error;
              this.loading = false;
          });   

<<<<<<< HEAD
    toggle(){
        this.displayText="Login";
        this.isDisabled = false;
    }
    onSubmit()
     {
        this.submitted = true;
=======
       }
>>>>>>> ca3c5d1aa1a62f09e6b976f1d088b548ba2ace79


       CheckOTP(Userotp:number)
       {
         if(Userotp==this.OTP)
           {
             
            this.authenticationService.GetloginuserDetailsbyMobileno(this.mobile)
            .subscribe(data=>{
              this.loginMaster=data;
             console.log(data.UserId)   
             localStorage.setItem('id',data.UserId.toString());
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