
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { MasterformService } from "./../../_services/masterform.service";
import { IpserviceService } from "src/app/_services/ipservice.service";
@Component({
  selector: 'app-itemmaster',
  templateUrl: './itemmaster.component.html',
  styleUrls: ['./itemmaster.component.scss']
})
export class ItemmasterComponent implements OnInit {
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
  constructor(
    private _masterformservice: MasterformService,
    private _ipservice: IpserviceService
  ) { }

  ngOnInit() {
    this.btitle = "Add Item";
    // this.data = this._masterformservice.GetBankdetails()

    this.model.BranchCode = localStorage.getItem("BranchCode");
    this.model.IpAdd = localStorage.getItem("LOCAL_IP");
    this.model.CreatedBy = localStorage.getItem("id");
    //delete
    this.model.BranchCode = "CW_1001";
    this.model.CreatedBy = "4";

    this.model.catagery = "default";
    this.data = this._masterformservice.getitemmaster(this.model.BranchCode);
    console.log(this.data)
    this._masterformservice.getrevenudata(this.model.BranchCode).subscribe(res => {
      this.catagerys = res;
    });


  

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
    } else {
      this.isShown = true;
      this.btitle = "Hide Form";
    }
   
  }

  resetForm(form?: NgForm) {
    this.emailFormArray = [];
    this.model = {
      Id: 0,
      ItemName: null,
      RevId: null,
      Rate: null,
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
      this.model.ItemName = response[event]["ItemName"];
      this.model.RevId = response[event]["RevId"];
      this.model.Rate = response[event]["Rate"];
     
      
      this.model.BranchCode = response[event]["BranchCode"];
      this.model.IpAdd = response[event]["IpAdd"];
      this.model.ModifyBy = response[event]["CreatedBy"];
    
      
    });
  }


  onSubmit() {

    console.log(this.emailFormArray);
    console.log(this.form.value);
    console.log(this.model);
    
  
    if (this.form.valid)
     {
      console.log("Form Submitted!");
     
    
    //   this._masterformservice.SaveitemMaster(this.model).subscribe(data => {
    //     if (data) {
    //       this.form.reset();
    //     }
    //     this.isShown = false;
    //     this.ngOnInit();
    //   })
     }
  }

  Closeform() {
    this.resetForm();
  }

  openMyModal(event, data) {
    this.model = {
      Id: data.Id,
      ItemName: data.ItemName,
      RevId: data.RevId,
      Rate: data.Rate
    };
    document.querySelector("#" + event).classList.add("md-show");
  }

  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }
}
