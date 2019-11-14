import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: "app-other-tax",
  templateUrl: "./other-tax.component.html",
  styleUrls: ["./other-tax.component.scss"]
})
export class OtherTaxComponent implements OnInit {
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
  @ViewChild("f", { static: false }) form: any;

  mode: string;
  Branch: string;
  filterdata: any;
  IsExistdata: boolean;
  constructor(
    private _masterformservice: MasterformService,
    private toastyService: ToastyService,
    private _ipservice: IpserviceService
  ) {
    this.Branch = localStorage.getItem("BranchCode");
  }

  ngOnInit() {
    this.btitle = "Add Item";
    this.mode = "(List)";
    if (!this.Branch) {
      this.data = this._masterformservice.getothertaxAll("CW_1001");
    } else {
      this.data = this._masterformservice.getothertaxAll(this.Branch);
    }

    this._masterformservice.getothertaxAll(this.Branch).subscribe(dat => {
      this.filterdata = dat;
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
      TaxCode: null,
      TaxName: null,
      TaxPer: null,
      IsActive:true
    };
  }

  openMyModalData(event) {
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id = response[event]["Id"];
      this.model.TaxCode = response[event]["TaxCode"];
      this.model.TaxName = response[event]["TaxName"];
      this.model.TaxPer = response[event]["TaxPer"];
      this.model.IsActive = response[event]["IsActive"];
      this.mode = "(Edit)" + this.model.TaxName;
    });
  }

  onSubmit(form?: NgForm) {
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
      this.addToast("Cogwave Software", "FloorName already Exist ", "warning");
      return;
    }

    this._masterformservice.Saveothertax(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "OtherTax Data Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            BranchCode: localStorage.getItem("BranchCode"),
            Id: "0"
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "OtherTax Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "OtherTax Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          Id: "0"
        });
        this.isShown = true;
      }
    });

    this.data = this._masterformservice.getothertaxAll(this.Branch);

    this._masterformservice
      .getothertaxAll(this.Branch)
      .subscribe((data: any) => {
        this.filterdata = data;
        console.log(this.filterdata);
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
      TaxCode: data.TaxCode,
      TaxName: data.TaxName,
      TaxPer: data.TaxPer
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
