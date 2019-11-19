import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService } from "../_services";
import { CustomValidators } from "ng2-validation";
import { ToastrService } from "ngx-toastr";
import { loginMaster } from "./../_models/loginMaster";
import { HttpErrorResponse } from "@angular/common/http";
import { SuperAdmin } from "./../_models/SuperAdmin";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";

@Component({
  selector: "app-signups",
  templateUrl: "./signups.component.html",
  styleUrls: ["./signups.component.scss"]
})
export class SignupsComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted: boolean;
  superadmin: SuperAdmin;
  error: string;
  mobileno: string;
  DisplayText = "Get OTP";
  isDisabled = "true";
  OTP: number;


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
    private el: ElementRef,private toastyService: ToastyService
  ) {}

  ngOnInit() {}
  ngOnDestroy() {}

  OnSubmit(username: string, password: string) {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.gosuperadminlogin(username, password).subscribe(
      data => {
        this.authenticationService
          .GetsuperAdminloginDetails()
          .subscribe(data => {
            this.superadmin = data;
            console.log(data.Id);
            this.mobileno = data.MobileNo;
            localStorage.setItem("id", data.Id.toString());
            localStorage.setItem("IsRole", "SuperAdmin");
            this.authenticationService
              .OneTimpOTPForSuperAdmin(this.mobileno)
              .subscribe(res => {
                this.OTP = Number(res);
              });
          });
        //this.router.navigate(['/dashboard']);
      },
      error => {
        console.log("error");
        this.error = error;
        this.loading = false;
      }
    );
  }

  ///@ViewChild("otppassword",{static: true}) otppassword: ElementRef;
  @ViewChild("otppassword", { static: true }) otppassword: ElementRef;

  toggle(otp): void {
    if (this.DisplayText == "Get OTP") {
      this.OnSubmit("SuperAdmin", "SuperAdmin");
      this.DisplayText = "Login";
      this.isDisabled = "false";
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        this.otppassword.nativeElement.focus();
      }, 0);
    } else {
      this.CheckOTP(otp);
    }
  }

  CheckOTP(Userotp: number) {
    debugger;
    if (Userotp == this.OTP) {
      this.addToast("Cogwave Software", "Login Sucessfully", "success");
      this.router.navigate(["/SuperAdmin/company"]);
    }
    else
    {
      this.addToast("Cogwave Software", "invalid Otp" + "👊", "error");
    }   
  }

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
      }
    };

    switch (theme) {
      case "default":
        this.toastyService.default(toastOptions);
        break;
      case "info":
        this.toastyService.info(toastOptions);
        break;
      case "success":
        debugger;
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
}
