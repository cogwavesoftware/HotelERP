// import { Component, OnInit,ViewChild } from '@angular/core';
// import { NgForm } from "@angular/forms";
// import { Observable } from 'rxjs';
// import { MasterformService } from './../../_services/masterform.service';
// import { IpserviceService } from 'src/app/_services/ipservice.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: "app-planmaster",
  templateUrl: "./planmaster.component.html",
  styleUrls: ["./planmaster.component.scss"]
})
export class PlanmasterComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  btitle: string = "Add";
  isValid: boolean;

  dtat: string;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = "bootstrap";
  type = "default";
  closeOther = false;
  isroomt: string;
  isroomc: string;
  ipAddress: string;
  mode: string;
  Branch: string;
  IsExistdata: boolean;
  filterdata: any;
  @ViewChild("f", { static: false }) form: any;
  constructor(
    private _masterformservice: MasterformService,
    private _ipservice: IpserviceService,
    private toastyService: ToastyService
  ) {
    this.Branch = localStorage.getItem("BranchCode");
  }
  ngOnInit() {
    this.resetForm();
    this.mode = "(List)";
    this.btitle = "Add Item";
    this.data = this._masterformservice.getplan();

    this._masterformservice.getplan().subscribe((data: any) => {
      this.filterdata = data;
    });
  }

  Showhide() {
    this.resetForm();

    if (this.btitle == "Hide Form") {
      this.isShown = false;
      this.btitle = "Add Item";
      this.mode = "(List)";
    } else {
      this.isShown = true;
      this.btitle = "Hide Form";
      this.mode = "(New)";
    }
  }

  resetForm(form?: NgForm) {
    this.model = {
      Id: 0,
      PlanName: null,
      HSNCode: null,
      PlanDescription: null,
      IsActive: true
    };
  }

  openMyModalData(event) {
    // CreatedBy
    //IpAdd
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id = response[event]["Id"];
      this.model.PlanName = response[event]["PlanName"];
      this.model.HSNCode = response[event]["HSNCode"];
      this.model.PlanDescription = response[event]["PlanDescription"];
      this.model.IsActive = response[event]["IsActive"];
      this.model.IpAdd = response[event]["IpAdd"];
      this.model.ModifyBy = response[event]["ModifyBy"];
      this.mode = "(Edit)" + this.model.PlanName;
    });
  }

  onSubmit(form?: NgForm) {
    // form.controls.BranchCode.setValue(localStorage.getItem('BranchCode'));
    // form.controls.CreatedBy.setValue(localStorage.getItem('id'));

    // form.controls.IpAddress.setValue(localStorage.getItem('LOCAL_IP'));

    this.form.value.CreatedBy = localStorage.getItem("id");
    this.form.value.ModifyBy = localStorage.getItem("id");
    this.form.value.IpAdd = localStorage.getItem("LOCAL_IP");

    if (this.form.invalid) {
      console.log(this.form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "PlanName already Exist ", "warning");
      return;
    }

    this._masterformservice.SavePlanmaster(this.form.value).subscribe(data => {
      if (data == true) {
        if (this.form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Plan Data Saved Sucessfully",
            "success"
          );
          this.form.reset({
            IsActive: "true",

            Id: "0"
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "Plan Data Updated Sucessfully",
            "success"
          );
          this.form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "Plan Data Not Saved", "error");
        this.form.reset({
          IsActive: "true",

          Id: "0"
        });
        this.isShown = true;
      }
    });

    this.data = this._masterformservice.getplan();

    this._masterformservice.getplan().subscribe((data: any) => {
      this.filterdata = data;
    });
  }

  Closeform() {
    this.isShown = false;
    this.btitle = "Add Item";
    this.resetForm();
    this.mode = "(List)";
  }

  openMyModal(event, data) {
    this.model = {
      Id: data.Id,
      PlanName: data.PlanName,
      HSNCode: data.HSNCode,
      PlanDescription: data.PlanDescription,
      IsActive: data.IsActive
    };
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }

  addToast(title, Message, theme) {
    debugger;
    this.toastyService.clearAll();
    const toastOptions: ToastOptions = {
      title: title,
      msg: Message,
      showClose: false,
      timeout: 3000,
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
