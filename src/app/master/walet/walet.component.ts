import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: "app-walet",
  templateUrl: "./walet.component.html",
  styleUrls: ["./walet.component.scss"]
})
export class WaletComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  btitle: string = "Add";

  isValid: boolean;
  position = 'top-right';
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

  Branch: string;
  ipAddress: string;
  mode: string;
  filterdata: any;
  IsExistdata: boolean;
  constructor(
    private _masterformservice: MasterformService,
    private toastyService: ToastyService
  ) {
    this.Branch = localStorage.getItem("BranchCode");
  }

  ngOnInit() {
    this.mode = "(List)";
    this.resetForm();
    this.btitle = "Add Item";
    this.data = this._masterformservice.getwalet();
    this._masterformservice.getwalet().subscribe((data: any) => {
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
      WaletName: null,
      IsActive: true
    };
  }

  openMyModalData(event) {
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id = response[event]["Id"];
      this.model.WaletName = response[event]["WaletName"];
      this.model.IsActive = response[event]["IsActive"];
      this.mode = "(Edit)" + this.model.WaletName;
    });
  }

  onSubmit(form?: NgForm) {

    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "Walet already Exist ", "warning");
      return;
    }

    this._masterformservice.SaveWalet(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Walet Data Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            
            Id: "0"
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "Walet Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "Walet Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          Id: "0"
        });
        this.isShown = true;
      }
    });

    setTimeout(()=>{
           
      this.data = this._masterformservice.getwalet();
          }, 0);
   
    console.log(this.data)
    this._masterformservice.getwalet().subscribe((data: any) => {
      this.filterdata = data;
      console.log( this.filterdata)
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
      WaletName: data.WaletName,
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
