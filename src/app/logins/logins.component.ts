import { mergeMap } from 'rxjs/operators';
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { AuthenticationService, UserService } from "../_services";
import { CustomValidators } from "ng2-validation";
import { loginMaster } from "./../_models/loginMaster";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";

@Component({
  selector: "app-logins",
  templateUrl: "./logins.component.html",
  styleUrls: ["./logins.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginsComponent implements OnInit {
  // body =  document.getElementsByTagName('body')[0];
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  mobile: string;
  returnUrl: string;
  loginMaster: loginMaster;
  error = "";
  isShow = false;
  public roles = [];
  isLoginError: boolean;
  isOTPEntered: boolean;
  OTP: number;
  displayText = "Get OTP";
  isDisabled = "true";
  isrole: string;
  isId: string;
  
  Message: string;
  position = 'top-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastyService: ToastyService) {}

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    // alert(this.returnUrl)
    // this.body.classList.add("loginsignupbg");
  }

  ngOnDestroy() {
    // this.body.classList.remove("loginsignupbg");
  }

  openMyModal(event) {
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModal(event, mobile) {
    event.target.parentElement.parentElement.classList.remove("md-show");
  }

  CheckOTP(Userotp: number) {
    if (Userotp == this.OTP)
    {
      this.authenticationService
        .GetloginuserDetailsbyMobileno(this.mobile)
        .subscribe(data => {
          this.loginMaster = data;
          console.log(data.UserId);
          localStorage.setItem("id", data.UserId.toString());
          localStorage.setItem("IsRole", data.IsRole.toString());
          localStorage.setItem("BranchCode", data.BranchCode.toString());
          this.addToast("Cogwave Software", "Login Sucessfully", "success");
          // this.router.navigate(['/dashboard/default']);
           this.router.navigate(["/Master/dashboard"]);
        },error => {        
          this.error = error;
          this.error=error.message;  
          this.addToast("Cogwave Software😃", this.error + "👊", "error");
          this.loading = false;
        });
         
    }
    else
    {
      this.addToast("Cogwave Software😃", "Please Check OTP" + "👊", "error");
      this.loading = false;
    }
    
  }

  //    error => {
  //     this.error = true;
  //     this.errorText=error.message;
  //  };

  addToast(title, Message, theme) {
    debugger;
    this.toastyService.clearAll();
    const toastOptions: ToastOptions = {
      title: title,
      msg: Message,
      showClose: false,
      timeout: 5000,
      theme: theme,
      onAdd: (toast: ToastData) => {
        //console.log('Toast ' + toast.id + ' has been added!');
        // this.router.navigate(['/dashboard/default']);
      },
      onRemove: (toast: ToastData) => {
        /* removed */
        //console.log(ToastData);
        // console.log('Toast ' + toast.id + ' has been removed!');
      }
    };

    switch (theme) 
    {
     
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
          debugger
        this.toastyService.success(toastOptions);
        break;
      case "wait":
        this.toastyService.wait(toastOptions);
        break;
      case "error":
        this.toastyService.error(toastOptions);
        break;
      case "warning":
        this.toastyService.warning(toastOptions);
        break;
    }
  }



  OnSubmit(username: string, password: string) {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.loginForm.invalid)
    // {
    //     return;
    // }
    
    this.loading = true;
    this.authenticationService.gologin(username, password).subscribe(
      data => {
        this.authenticationService
          .GetloginuserDetails(username)
          .subscribe(data => {
            this.loginMaster = data;
            
            //this.authenticationService.setUserName(data.UserName)
            localStorage.setItem("id", data.UserId.toString());
            localStorage.setItem("IsRole", data.IsRole.toString());
            localStorage.setItem("BranchCode", data.BranchCode.toString());
            sessionStorage.setItem("UserName", data.UserName);    
            this.addToast("Cogwave Software", "Login Sucessfully", "success");
            this.router.navigate(["/Master/dashboard"]);

          });
      },
      error => {
        console.log(error)
       //let currenterror = JSON.stringify(error);
       // console.log(currenterror);
         //  alert(currenterror);
       // console.log(this.error);
        this.addToast("Cogwave Software😃", error + "👊", "error");       
        this.loading = false;
      }
    );
  }
  //      setTimeout(()=>{
  //       //this.messageSuccess = false;
  //  }, 3000);

  toggle(mobile, otp) 
  {
    if (this.displayText == "Get OTP") {
      this.displayText = "Login";
      this.isDisabled = "false";
      this.loading = true;
      this.authenticationService.gologin(mobile, "cogwaveotp").subscribe(
        data => {
          console.log(data.access_token);
          if (data.access_token != null)
           {
            this.mobile = mobile;
            this.authenticationService
              .GenerateonetimeOTP(mobile)
              .subscribe(data => {
                this.OTP = Number(data);
                console.log(this.OTP);
              },
                error=>{
                  this.loading = false;
                  this.error=error;
                  this.addToast("Cogwave Software",  this.error + "👊", "warning");
                });
          }
        },
        error => {
          console.log("error");
          this.error = error;
          this.loading = false;
          this.addToast("Cogwave Software",  this.error + "👊", "error")
        }
      );
    } else {
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
