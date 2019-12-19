import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Floormodel } from "./../../_models/floormodel";
import { Observable } from "rxjs";
import { FloormasterService } from "./../../_services/floormaster.service";
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";

@Component({
  selector: "app-floorcreation",
  templateUrl: "./floorcreation.component.html",
  styleUrls: ["./floorcreation.component.scss"]
})
export class FloorcreationComponent implements OnInit {
  public data: Observable<any>;

  public isEdit: boolean = false;
  public filterdatax: any;

  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  findnamef1: string;
  findnamef2: string;
  @Input("modalDefault") modalDefault: any;
  isValid: boolean;
  public isShown: boolean = false;
  dtat: string;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = "bootstrap";
  type = "default";
  closeOther = false;
  btitle: string = "Add Floor";
  model: any = {};
  IsExistdata: boolean = false;
  mode: string;
  Branch:string;
  @ViewChild("f", { static: false }) public form: any;
  constructor(
    public _floorservice: FloormasterService,
    private datePipe: DatePipe,
    private toastyService: ToastyService) {
      this.Branch = localStorage.getItem("BranchCode");
    }

  ngOnInit() {
    this.resetForm();


    // this.model.BranchCode=localStorage.getItem('BranchCode');
    // this.model.IpAdd=localStorage.getItem('LOCAL_IP');
    // this.model.CreatedBy=localStorage.getItem('id');

    // var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    // console.log(ddMMyyyy); //output - 14-02-2019

    // var MMddyyyy = this.datePipe.transform(new Date(), "MM-dd-yyyy");
    // console.log(MMddyyyy); //output - 14-02-2019

    // var short = this.datePipe.transform(new Date(), "M/d/yy");
    // console.log(short); //output - 2/14/19

    // var medium = this.datePipe.transform(new Date(), "MMM d, y, h:mm:ss a");
    // console.log(medium); //output - Feb 14, 2019, 3:45:06 PM

    this.btitle = "Add Item";
    this.mode = "(List)";
    this.data = this._floorservice.GetfloorData();


    this._floorservice.GetfloorData().subscribe((data: any) => {
      this.filterdatax = data;
      console.log(this.filterdatax);
    });
  }

  onSubmit(form?: NgForm) {
    // form.controls.BranchCode.setValue(localStorage.getItem('BranchCode'));
    // form.controls.CreatedBy.setValue(localStorage.getItem('id'));

    // form.controls.IpAddress.setValue(localStorage.getItem('LOCAL_IP'));

    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = localStorage.getItem("id")
    form.value.ModifyBy = localStorage.getItem("id")
    form.value.IpAddress = localStorage.getItem("LOCAL_IP")

    if (form.value.FloorCode == "") {
      form.controls.FloorCode.setValue(0);
    }

    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "FloorName already Exist ", "warning");
      return;
    }

    this._floorservice.SavefloorData(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.FloorCode == "0") {
          this.addToast(
            "Cogwave Software",
            "Floor Data Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            BranchCode: localStorage.getItem("BranchCode"),
            FloorCode: "0"
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "Floor Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "Floor Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          FloorCode: "0"
        });
        this.isShown = true;
      }
    });

    this.data = this._floorservice.GetfloorData();

    this._floorservice.GetfloorData().subscribe((data: any) => {
      this.filterdatax = data;
      console.log(this.filterdatax);
    });
  }

  CallKeytype1() {
    if (
      !this.filterdatax.some(
        item => item.FloorName == this.form.value.FloorName
      )
    ) {
      //this.categories.push(newCategory);
    }
  }

  CallKeytype() {
    let datas = this.filterdatax.find(
      ob => ob.FloorName == this.form.value.FloorName
    );
    if (datas == undefined) {
      this.IsExistdata = false;
    } else {
      this.IsExistdata = true;
    }
  }

  resetForm() {
    this.model = {
      RNo: null,
      FloorCode: "",
      FloorName: "",
      MaxRoom: null,
      Alloted: null,
      Unalloted: null,
      IsActive: true,
      ModifyedDate: null,
      CreatedDate: null,
      BranchCode: localStorage.getItem("BranchCode"),
      CreatedBy: localStorage.getItem("id"),
      ModifyBy: localStorage.getItem("id"),
      IpAddress: localStorage.getItem("LOCAL_IP")
    };
  }

  Showhide() {
    this.resetForm();
    if (this.btitle == "Hide Form") {
      this.isShown = false;
      this.btitle = "Add Item";
      this.mode = "(List)";
    } else {
      this.resetForm();
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
  openMyModalData(event) {
    this.isEdit = true;
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.FloorName = response[event]["FloorName"];
      this.model.FloorCode = response[event]["FloorCode"];
      this.model.MaxRoom = response[event]["MaxRoom"];
      this.mode = "(Edit)"+  this.model.FloorName;
      this.model.IsActive = response[event]["IsActive"];
    });
  }

  openMyModal(event, data) {
    this.model = {
      FloorCode: data.FloorCode,
      FloorName: data.FloorName,
      MaxRoom: data.MaxRoom,
      Alloted: data.Alloted,
      Unalloted: data.Unalloted,
      IsActive: data.IsActive,
      BranchCode: data.BranchCode
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
