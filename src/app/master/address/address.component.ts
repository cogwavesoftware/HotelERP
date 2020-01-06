import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"]
})
export class AddressComponent implements OnInit {
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
    private _masterformservice: MasterformService,
    private _ipservice: IpserviceService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.btitle = "Add Item";
    this.mode = "(List)";
    this.data = this._masterformservice.GetPinAddress();
    console.log("test" +this.data);
  }
  getIP() {
    this._ipservice.getIpAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress);
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

  Closeform() {
    this.isShown = false;
    this.btitle = "Add Item";
    this.resetForm();
    this.mode = "(List)";
  }
  resetForm(form?: NgForm) {
    this.model = {
      Id: 0,
      City: null,
      Pincode: null,
      State: null,
      AreaData: null
    };
  }

  visitRangle() {
    console.log('Visiting rangle');
    location.href = 'https://rangle.io';
  }
  openMyModalData(event) {
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      console.log("aea datasis "+ response[event]["AreaData"]);
      this.model.Id = response[event]["Id"];
      this.model.AreaData = response[event]["AreaData"];
      this.model.City = response[event]["City"];
      this.model.Pincode = response[event]["Pincode"];
      this.model.State = response[event]["State"];
      this.mode = "(Edit)" + this.model.AreaData;
    });
  }

  onSubmit(form?: NgForm) {
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "Pincode already Exist ", "warning");
      return;
    }

    this._masterformservice.SavePinCode(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Pincode Data Saved Sucessfully",
            "success"
          );
          form.reset({
            Id: "0"
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "Pincode Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "Pincode Data Not Saved", "error");
        form.reset({
          Id: "0"
        });
        this.isShown = true;
      }
    });

    this.data = this._masterformservice.GetPinAddress();
    this._masterformservice.GetPinAddress().subscribe((data: any) => {
      this.filterdata = data;
      console.log(this.filterdata);
    });
  }

  openMyModal(event, data) {
    this.model = {
      Id: data.Id,
      City: data.City,
      Pincode: data.Pincode,
      State: data.State,
      AreaData:data.AreaData
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
