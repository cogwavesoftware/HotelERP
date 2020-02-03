import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: "app-booking-reference",
  templateUrl: "./booking-reference.component.html",
  styleUrls: ["./booking-reference.component.scss"]
})
export class BookingReferenceComponent implements OnInit {
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
  filterdata: any;
  IsExistdata: boolean;
  @ViewChild("f", { static: false }) form: any;

  constructor(
    private _masterformservice: MasterformService, private _ipservice: IpserviceService, private toastyService: ToastyService
  ) {
    this.Branch = localStorage.getItem("BranchCode");
  }

  ngOnInit() {
    this.resetForm();
    this.btitle = "Add Item";
    this.mode = "(List)";

    if (!this.Branch) {
      this.data = this._masterformservice.getreferencedetail("CW_1001");
    } else {
      this.data = this._masterformservice.getreferencedetail(this.Branch);
    }
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
      RefName: null,
      RefEmail: null,
      RefMobileNo: null,
      RefAdress: null,
      RefDob: null,
      RefPoints: null,
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
      this.model.RefName = response[event]["RefName"];
      this.model.RefEmail = response[event]["RefEmail"];
      this.model.RefMobileNo = response[event]["RefMobileNo"];
      this.model.RefAdress = response[event]["RefAdress"];
      this.model.RefDob = response[event]["RefDob"];
      this.model.RefPoints = response[event]["RefPoints"];
      this.model.IsActive = response[event]["IsActive"];
      this.model.BranchCode = response[event]["BranchCode"];
      this.model.IpAdd = response[event]["IpAdd"];
      this.model.ModifyBy = response[event]["ModifyBy"];

      this.mode = "(Edit)" + this.model.RefName;
    });
  }

  onSubmit(form?: NgForm) {
    // form.controls.BranchCode.setValue(localStorage.getItem('BranchCode'));
    // form.controls.CreatedBy.setValue(localStorage.getItem('id'));

    // form.controls.IpAddress.setValue(localStorage.getItem('LOCAL_IP'));

    form.value.BranchCode = localStorage.getItem("BranchCode");
    form.value.CreatedBy = localStorage.getItem("id");
    form.value.ModifyBy = localStorage.getItem("id");
    form.value.IpAdd = localStorage.getItem("LOCAL_IP");

    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "Referance already Exist ", "warning");
      return;
    }

    this._masterformservice.SaveReferance(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Referance Data Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            BranchCode: localStorage.getItem("BranchCode"),
            Id: "0"
          });
          this.isShown = true;
          this.data = this._masterformservice.getreferencedetail(this.Branch);
        } else {
          this.addToast(
            "Cogwave Software",
            "Referance Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
          this.data = this._masterformservice.getreferencedetail(this.Branch);
        }
      } else {
        this.addToast("Cogwave Software", "Referance Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          Id: "0"
        });
        this.isShown = true;
      }
    });

  
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

  Closeform() {
    this.isShown = false;
    this.btitle = "Add Item";
    this.resetForm();
    this.mode = "(List)";
  }

  openMyModal(event, data) {
    this.model = {
      Id: data.Id,
      RefName: data.RefName,
      RefEmail: data.RefEmail,
      RefMobileNo: data.RefMobileNo,
      RefDob: data.RefDob,
      RefPoints: data.RefPoints,
      IsActive: data.IsActive,
      RefAdress: data.RefAdress
    };
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }
}

//   fullUpdate() {
//     this.form.setValue({firstName: 'Partial', password: 'monkey'});
// }

// partialUpdate() {
//     this.model.patchValue({RefName: 'Partial'});
// }

// this.form.valueChanges
//     .map((value) => {
//         value.RefName = value.RefName.toUpperCase();
//         return value;

//     })
//     .filter((value) => this.form.valid)
//     .subscribe((value) => {
//        console.log("Model Driven Form valid value: vm = ",
//                    JSON.stringify(value));
//     });
