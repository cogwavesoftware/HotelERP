
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MasterformService } from "./../../_services/masterform.service";
import { Observable } from "rxjs";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { TreeviewItem, TreeviewConfig } from '../../shared/service/lib';
import { TreeviewItemService } from '../../shared/service/treeview-item.service';

@Component({
  selector: 'app-gridtest',
  templateUrl: './gridtest.component.html',
  styleUrls: ['./gridtest.component.scss'],
  providers: [
    TreeviewItemService //tree service
]
})
export class GridtestComponent implements OnInit {
  Distype = ['Percentage', 'Amount'];
  model: any = {}
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roles:any=[];
  prulist:any[];
  distypeicHasError:boolean=false;

  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  catageryhasError: boolean;
  public isShown: boolean = false;

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

   /* tree property */
  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 500
  });
/* tree property end */

  constructor(private service: TreeviewItemService,private _masterformservice: MasterformService,private _ipservice: IpserviceService) {
    this.model.discounttype = "default";
  }

  ngOnInit() {
    this.items = this.service.getBooks(); //tree

  this.resetForm();
    this._masterformservice.getAllRoles().subscribe(
      (data: any) => {
        data.forEach(obj => obj.selected = false);
        this.roles = data;
      }
    );

   this._masterformservice.getclientproduct("CW_1001").subscribe((data: any) => {
      data.forEach(obj => (obj.selected = false));
      this.prulist = data;
      console.log(this.prulist);
    });


  }

/* tree property */
  onFilterChange(value: string) {
    //console.log('filter:', value);
  }
  onSelectedChange(value:string){
    console.log('change filter:', value);
    console.log("json value" + JSON.stringify(value));
    console.log("json parse" + JSON.parse(JSON.stringify(value)));
  }
/* end tree property */

  resetForm(form?: NgForm) {
    this.model = {
      UserId: 0,
      UserName: null,
      FirstName: null,
      LastName: null,
      MobileNo: null,
      DOB: null,
      EmailId: null,
      password: null,
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
    if(this.prulist)
    this.prulist.map(x=>x.selected==false);
  }

  Showhide() {
    this.resetForm();
    if (this.btitle == "Hide Form") {
      this.isShown = false;
      this.btitle = "Add Item";
    } else {
      this.isShown = true;
      this.btitle = "Hide Form";
    }
   
  }

  onSubmit(form: NgForm) {
    var x = this.roles.filter(x => x.selected).map(y => y.Id);
    console.log(x);
    var f=this.prulist.filter(x=>x.selected).map(y=>y.Id); 
    console.log(form);
    console.log(form.value);

    this.model = { 
      UserId:form.value.UserId,
      UserName:form.value.UserName,
      FirstName:form.value.FirstName,
      LastName:form.value.LastName,
      MobileNo:form.value.MobileNo,
      DOB:form.value.DOB,
      EmailId:form.value.EmailId,
      password:form.value.password,
      ConformPassword:form.value.ConformPassword,
      Address:form.value.Address,
      GracePeroid:form.value.GracePeroid,
      discounttype:form.value.discounttype,
      DiscountAmount:form.value.DiscountAmount,
      IsActive:form.value.IsActive,
      IsRole:x,
      product:f,
      BranchCode : localStorage.getItem("BranchCode"),
      IpAdd : localStorage.getItem("LOCAL_IP"),
      CreatedBy: localStorage.getItem("id"),
      ModifyBy:localStorage.getItem("id"),
      
    }
    console.log(this.model)
  
  }
  validatediscount(value) {
    if (value === "default") {
      this.distypeicHasError = true;
    } else {
      this.distypeicHasError = false;
    }
  }

  updateSelectedRoles(index)
   {
     this.roles.map(x => x.selected = false);
    this.roles[index].selected = !this.roles[index].selected;
  }

  updateProduct(index)
   {
     
    this.prulist[index].selected = !this.prulist[index].selected;
  }
}
