
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";

import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'

@Component({
  selector: 'app-revenu',
  templateUrl: './revenu.component.html',
  styleUrls: ['./revenu.component.scss']
})
export class RevenuComponent implements OnInit {
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
  @ViewChild("f", { static: false }) form: any;  
  mode: string;
  Branch:string;
  filterdata:any;
  IsExistdata:boolean;
  constructor(
    private _masterformservice: MasterformService,
    private _ipservice: IpserviceService,
    private toastyService: ToastyService
  ) { this.Branch= localStorage.getItem("BranchCode");
}

  ngOnInit() {
    this.mode = "(List)";
    this.btitle = "Add Item";
   this.data = this._masterformservice.getrevenudata(this.Branch);

   this._masterformservice.getrevenudata(this.Branch).subscribe(data=>{
     this.filterdata=data;
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

  validateplan(value) {
    if (value === "default") {
      this.catageryhasError = true;
    } else {
      this.catageryhasError = false;
    }
  }

  getIP() {
    this._ipservice.getIpAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress);
    });
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
    this._masterformservice.getothertax("CW_1001").subscribe((data: any) => {
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
      TaxId: null,
      PlanAmount: null,
      IsActive:true
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
      this.model.RevName = response[event]["RevName"];
      //this.model.TaxId = response[event]["TaxId"];
      this.model.HSNCode = response[event]["HSNCode"];
      this.model.IsActive = response[event]["IsActive"];
      this.model.BranchCode = response[event]["BranchCode"];
      this.model.IpAdd = response[event]["IpAdd"];
      this.model.ModifyBy = response[event]["CreatedBy"];

      this.mode = "(Edit)"+  this.model.RevName;
      console.log( this.model.Id)
      this._masterformservice.getaxEditforRevenu("CW_1001", this.model.Id).subscribe((data: any) => {
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


  onSuddbmit(form?: NgForm) {

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
        RevName: this.form.value.RevName,
        HSNCode: this.form.value.HSNCode,
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
          this.emailFormArray = [];
          this.isShown = true;
          this.data = this._masterformservice.getrevenudata(this.Branch);
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
          this.emailFormArray = [];
          this.data = this._masterformservice.getrevenudata(this.Branch);
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

    setTimeout(() => {
     
    }, 0);
    
  
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
      RevName: data.RevName,
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
