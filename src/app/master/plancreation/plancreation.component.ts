
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'
@Component({
  selector: "app-plancreation",
  templateUrl: "./plancreation.component.html",
  styleUrls: ["./plancreation.component.scss"]
})
export class PlancreationComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  catageryhasError: boolean;
  public isShown: boolean = false;
  model: any = {};
  btitle: string = "Add";
  isValid: boolean;
  //catagerys=['Room','Hall'];
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
  catagerys: any;
  categories: any[];
  emailFormArray: Array<any> = [];
  
 mode: string;
 Branch:string;
 filterdata:any;
 IsExistdata:boolean;
  @ViewChild("f", { static: false }) form: any;
  constructor(
    private _masterformservice: MasterformService,
    private _ipservice: IpserviceService,
    private toastyService: ToastyService
  ) { 
    this.Branch= localStorage.getItem("BranchCode");
  }

  ngOnInit() {
    this.resetForm()
    this.btitle = "Add Item";
    this.mode = "(New)";
    this.data = this._masterformservice.getallplanopr(this.Branch);

    this._masterformservice.getplan().subscribe(res => {
      this.catagerys = res;
    });


    this._masterformservice.getothertax(this.Branch).subscribe((data: any) => {
      data.forEach(obj => (obj.selected = false));
      this.categories = data;
      console.log(this.categories);
    });
    
  }
  // getothertaxEdit
  onChange(ids: number, isChecked: boolean) {
    if (isChecked) {
      this.emailFormArray.push(ids);
    } else {
      let index = this.emailFormArray.indexOf(ids);
      this.emailFormArray.splice(index, 1);
    }
  }


  Showhide() {
    this.emailFormArray = [];
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
    this._masterformservice.getothertax(this.Branch).subscribe((data: any) => {
      data.forEach(obj => (obj.selected = false));
      this.categories = data;
      console.log(this.categories);
    });
  }

  resetForm(form?: NgForm) {
    this.emailFormArray = [];
    this.model = {
      Id: 0,
      PlanName: null,
      PlanId:'-1',
      TaxId: null,
      PlanAmount: null,
      BranchCode: localStorage.getItem("BranchCode"),
      IpAdd: localStorage.getItem("LOCAL_IP"),
      CreatedBy: localStorage.getItem("id")
    };
    //delete
    this.model.BranchCode = "CW_1001";
    this.model.CreatedBy = "4";
  }

  openMyModalData(event) {
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id = response[event]["Id"];
      this.model.PlanId = response[event]["PlanId"];
      //this.model.TaxId = response[event]["TaxId"];
      this.model.PlanAmount = response[event]["PlanAmount"];
      this.model.BranchCode = response[event]["BranchCode"];
      this.model.IpAdd = response[event]["IpAdd"];
      this.model.ModifyBy = response[event]["CreatedBy"];
      console.log(this.model.PlanId)
      this.mode = "(Edit)"+  this.model.PlanId;
      this.emailFormArray=[];
      this._masterformservice.getothertaxEdit(this.Branch, this.model.PlanId).subscribe((data: any) => {
        data.forEach(obj => {
          if (obj.ischecked == true) {
            console.log(obj);
            this.emailFormArray.push(obj.Id);
          }
          this.categories = data;
        });
      });
    });
  }


  onSuvbmit() {

    console.log(this.emailFormArray);
    console.log(this.form.value);
    console.log(this.model);
    var sdata = JSON.stringify(this.emailFormArray);
    var newstr = sdata.replace('[', '');
    var newstr1 = newstr.replace(']', '');
    console.log('Email' + newstr1);
    if (this.form.valid) {
      console.log("Form Submitted!");
      this.model = {
        Id: this.form.value.Id,
        PlanId: this.form.value.PlanId,
        PlanAmount: this.form.value.PlanAmount,
        BranchCode: localStorage.getItem("BranchCode"),
        IpAdd: localStorage.getItem("LOCAL_IP"),
        CreatedBy: localStorage.getItem("id"),
        selectedTax: newstr1,
      }
      console.log('moe')
      console.log(this.model);
      this._masterformservice.saveplancreation(this.model).subscribe(data => {
        if (data) {
          this.form.reset();
        }
        this.isShown = false;
        this.ngOnInit();
      })
    }
  }

  onSubmit(form?: NgForm) {


    form.value.BranchCode = localStorage.getItem("BranchCode");
    form.value.CreatedBy = localStorage.getItem("id");
    form.value.ModifyBy = localStorage.getItem("id");
    form.value.IpAdd = localStorage.getItem("LOCAL_IP");

    form.value.SelectedTax = this.emailFormArray;
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "RevenuName already Exist ", "warning");
      return;
    }

    this._masterformservice.Saverevenu(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "RevenuName Data Saved Sucessfully",
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
            "RevenuName Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "RevenuName Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          Id: "0"
        });
        this.isShown = true;
      }
    });
    this.data = this._masterformservice.getrevenudata(this.Branch);
  
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
      TaxId: data.TaxId,
      PlanAmount: data.PlanAmount
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
