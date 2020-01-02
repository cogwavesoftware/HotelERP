import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'
@Component({
  selector: "app-bankname",
  templateUrl: "./bankname.component.html",
  styleUrls: ["./bankname.component.scss"]
})

export class BanknameComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  btitle: string = "Add";
  isValid: boolean;
  IsExistdata:boolean;
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
  ipAddress: string;
  mode: string;
  Branch:string;
  filterdata:any;
  itemss:any;
  public showloader  ="false;";
  @ViewChild("f", { static: false }) form: any;
  constructor(
    private _masterformservice: MasterformService,
    private _ipservice: IpserviceService,
    private toastyService: ToastyService
  ) {
    this.Branch= localStorage.getItem("BranchCode");
  }

  ngOnInit() {




    this.resetForm();
    this.btitle = "Add Item";
    this.mode = "(List)";
    if (!this.Branch) {
      this.data = this._masterformservice.GetBankdetails("CW_1001");
    } else {
      this.data = this._masterformservice.GetBankdetails(this.Branch);
    }
  
    this._masterformservice.GetBankdetails(this.Branch).subscribe((data: any) => {
      this.filterdata = data;
    });
 
    
    this.itemss = this._masterformservice.getBookss().subscribe(res=>{
      console.log(res);
    }); //tree  


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

  resetForm(form?: NgForm) {
    this.model = {
      Id: 0,
      Name: null,
      IFSCCode: null,
      BankBranchName: null,
      City: null,
      BankBranchCode: null,
      MICRCode: null,
      Address: null,
      IsActive: true,
    };
  }


  CallKeytype() {
    let datas = this.filterdata.find(
      ob => ob.Name == this.form.value.Name
    );
    if (datas == undefined) {
      this.IsExistdata = false;
    } else {
      this.IsExistdata = true;
    }
  }


  openMyModalData(event) {
    // CreatedBy
    //IpAdd
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id = response[event]["Id"];
      this.model.Name = response[event]["Name"];
      this.model.IFSCCode = response[event]["IFSCCode"];
      this.model.BankBranchName = response[event]["BankBranchName"];
      this.model.City = response[event]["City"];
      this.model.BankBranchCode = response[event]["BankBranchCode"];
      this.model.MICRCode = response[event]["MICRCode"];
      this.model.Address = response[event]["Address"];
      this.model.IsActive = response[event]["IsActive"];
      this.model.BranchCode = response[event]["BranchCode"];
      this.model.IpAdd = response[event]["IpAdd"];
      this.model.ModifyBy = response[event]["ModifyBy"];
      this.mode = "(Edit)"+  this.model.Name;
    });
  }

  // onSubmit() {
  //   console.log(this.form.value);
  //   console.log(this.form.value.Address);
  //   this.form.value.Address;
  //   if (this.form.valid) {
  //     console.log("Form Submitted!"); 
  //   }
  // }


  onSubmit(form?: NgForm) {
    // form.controls.BranchCode.setValue(localStorage.getItem('BranchCode'));
    // form.controls.CreatedBy.setValue(localStorage.getItem('id'));

    // form.controls.IpAddress.setValue(localStorage.getItem('LOCAL_IP'));

    form.value.BranchCode = localStorage.getItem("BranchCode")
    form.value.CreatedBy = localStorage.getItem("id")
    form.value.ModifyBy = localStorage.getItem("id")
    form.value.IpAdd = localStorage.getItem("LOCAL_IP")

   
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "Invalid Data", "warning");
      return;
    }

    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "BankName already Exist ", "warning");
      return;
    }

    this._masterformservice.SaveBankDetail(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.Id == "0") {
          this.addToast(
            "Cogwave Software",
            "Bank Data Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            BranchCode: localStorage.getItem("BranchCode"),
            Id: "0"
          });
          this.isShown = true;
          this.data = this._masterformservice.GetBankdetails(this.Branch);

        } else {
          this.addToast(
            "Cogwave Software",
            "Bank Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
          this.data = this._masterformservice.GetBankdetails(this.Branch);

        }
      } else {
        this.addToast("Cogwave Software", "Bank Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          Id: "0"
        });
        this.isShown = true;
      }
    });

    
    this._masterformservice.GetBankdetails(this.Branch).subscribe((data: any) => {
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
      Name: data.Name,
      IFSCCode: data.IFSCCode,
      BankBranchName: data.BankBranchName,
      MICRCode: data.MICRCode,
      BankBranchCode: data.BankBranchCode,
      IsActive: data.IsActive,
      Address: data.Address,
      
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
