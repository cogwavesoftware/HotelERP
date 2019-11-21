
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MasterformService } from "./../../_services/masterform.service";
import { Observable } from "rxjs";
import { IpserviceService } from "src/app/_services/ipservice.service";

@Component({
  selector: 'app-gridtest',
  templateUrl: './gridtest.component.html',
  styleUrls: ['./gridtest.component.scss']
})
export class GridtestComponent implements OnInit {
  Distype = ['Percentage', 'Amount'];
  model: any = {}
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roles: any = [];
  prulist: any[];
  distypeicHasError: boolean = false;

  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  catageryhasError: boolean;
  public isShown: boolean = false;

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
  catagerys: any;
  categories: any[];
  public imagePath;
  imgURL: any;
  public message: string;
  mode: string;
  Branch: string;
  filterdata: any;
  IsExistdata: boolean;
  constructor(private _masterformservice: MasterformService, private _ipservice: IpserviceService) {
    this.model.discounttype = "default";
    this.Branch = localStorage.getItem("BranchCode");
  }

  ngOnInit() {

    this.resetForm();
    this._masterformservice.getAllRoles().subscribe(
      (data: any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;
      }
    );

    this._masterformservice.getclientproduct(this.Branch).subscribe((data: any) => {
      data.forEach(obj => (obj.selected = false));
      this.prulist = data;
      console.log(this.prulist);
    });


    let isroles = localStorage.getItem("IsRole")
    if (isroles === "Admin") {
      this.data = this._masterformservice.GetAlluserDetails(this.Branch)
      this._masterformservice.GetAlluserDetails(this.Branch).subscribe(res => {
        this.filterdata = res;
        console.log(this.filterdata)
      })


    }

  }

  preview(files) {
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  resetForm(form?: NgForm) {
    this.model = {
      UserId: 0,
      UserName: null,
      FirstName: null,
      LastName: null,
      MobileNo: null,
      DOB: null,
      EmailId: null,
      password: '55',
      ConformPassword: null,
      Address: null,
      GracePeroid: null,
      discounttype: null,
      DiscountAmount: null,
      IsActive: null,
      BranchCode: localStorage.getItem("BranchCode"),
      IpAdd: localStorage.getItem("LOCAL_IP"),
      CreatedBy: localStorage.getItem("id")
    };
    if (this.roles)
      this.roles.map(x => x.selected = false);
    this.model.discounttype = "default";
    if (this.prulist)
      this.prulist.map(x => x.selected = false);
  }



  onSubmit(form: NgForm) {
    var x = this.roles.filter(x => x.selected).map(y => y.Id);
    console.log(x);
    var f = this.prulist.filter(x => x.selected).map(y => y.Id);
    console.log(form);
    console.log(form.value);

    this.model = {
      UserId: form.value.UserId,
      UserName: form.value.UserName,
      FirstName: form.value.FirstName,
      LastName: form.value.LastName,
      MobileNo: form.value.MobileNo,
      DOB: form.value.DOB,
      EmailId: form.value.EmailId,
      password: form.value.password,
      ConformPassword: form.value.ConformPassword,

      Address: form.value.Address,
      GracePeroid: form.value.GracePeroid,
      Discount: form.value.Discount,
      DiscountAmount: form.value.DiscountAmount,
      IsActive: form.value.IsActive,
      IsRole: x,
      product: f,
      BranchCode: localStorage.getItem("BranchCode"),
      IpAdd: localStorage.getItem("LOCAL_IP"),
      CreatedBy: localStorage.getItem("id"),
      ModifyBy: localStorage.getItem("id"),

    }
    console.log(this.model)

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
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {


      this.model.UserId = response[event]["UserId"];
      this.model.UserName = response[event]["UserName"];
      this.model.FirstName = response[event]["FirstName"];
      this.mode = "(Edit)" + this.model.UserName;
      this.model.IsActive = response[event]["IsActive"];
      this.model.LastName = response[event]["LastName"];
      this.model.MobileNo = response[event]["MobileNo"];
      this.model.DOB = response[event]["DOB"];
      this.model.EmailId = response[event]["EmailId"];
      this.model.password = response[event]["Password"];
      this.model.Address = response[event]["Address"];
      this.model.GracePeroid = response[event]["GracePeroid"];
      this.model.Discount = response[event]["Discount"];
      this.model.DiscountAmount = response[event]["DiscountAmount"];
      this.model.ConformPassword = response[event]["ConformPassword"];

      this._masterformservice.GetUserProductEdit(this.Branch, this.model.UserId).subscribe((data: any) => {
        this.categories = data;
        console.log(this.categories)
        data.forEach(obj => {
          if (obj.ischecked == true) {
              obj.selected = true;
          }
          else {
            obj.selected = false;
          }
          
        });
      });
      
    });
  }

  openMyModal(event, data) {
    this.model = {
      UserId: data.UserId,
      UserName: data.UserName,
      Discount: data.Discount,
      GracePeroid: data.GracePeroid,
      DiscountAmount: data.DiscountAmount,
      FirstName: data.FirstName,
      BranchCode: data.BranchCode
    };
    document.querySelector("#" + event).classList.add("md-show");
  }




  validatediscount(value) {
    if (value === "default") {
      this.distypeicHasError = true;
    } else {
      this.distypeicHasError = false;
    }
  }

  updateSelectedRoles(index) {
    this.roles.map(x => x.selected = false);
    this.roles[index].selected = !this.roles[index].selected;
  }

  updateProduct(index) {

    this.prulist[index].selected = !this.prulist[index].selected;
  }
}
