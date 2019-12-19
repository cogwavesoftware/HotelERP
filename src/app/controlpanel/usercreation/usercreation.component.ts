
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { MasterformService } from "./../../_services/masterform.service";
import { Observable } from "rxjs";
import { IpserviceService } from "src/app/_services/ipservice.service";
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";

@Component({
  selector: 'app-usercreation',
  templateUrl: './usercreation.component.html',
  styleUrls: ['./usercreation.component.scss']
})
export class UsercreationComponent implements OnInit {
  Distype = ['Percentage', 'Amount'];
  model: any = {}
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  roles: any =[];
  prulist: any=[];
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
  Userrole:string;
 
  constructor(private _masterformservice: MasterformService,
     private _ipservice: IpserviceService,  private toastyService: ToastyService) {
    this.model.discounttype = "default";
    this.Branch = localStorage.getItem("BranchCode");
  }

  ngOnInit() {
    this.btitle = "Add Item";
    this.mode = "(List)";
    this.resetForm();
    this.Userrole = localStorage.getItem("IsRole")
    this._masterformservice.getAllRoles().subscribe(
      (data: any) => {
        data.forEach(obj => obj.ischecked =false);
        this.roles = data;
        
      }
    );

    
    // selectChildren(data, $event) {
    //   let parentChecked = data.checked;
    //    this.hierarchicalData.forEach(obj => {
    //       obj.forEach(childObj=> {
    //         value.checked = parentChecked;
    //      })
    //   };
    // }
  
    this._masterformservice.getclientproduct(this.Branch).subscribe((data: any) => {
      data.forEach(obj => obj.selected = true);
      this.prulist = data;
      console.log(this.prulist);
    });

    if (this.Userrole === "Admin") {

      this.data = this._masterformservice.GetAlluserDetails(this.Branch)
      this._masterformservice.GetAlluserDetails(this.Branch).subscribe(res => {
        this.filterdata = res;
        console.log(this.filterdata)
      })}

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
    if (this.prulist)
      this.prulist.map(x => x.selected = false);
  }



  onSubmit(form: NgForm) {


    var x = this.roles.filter(x => x.ischecked).map(y => y.Name);
    console.log(x);

    var f = this.prulist.filter(x => x.selected).map(y => y.Id);
    console.log(form);
    console.log(form.value);
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }

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
    return;
    this._masterformservice.SaveuserCreation(this.model).subscribe(data => {
      if (data == true) {
        if (form.value.UserId == "0") {
          this.addToast(
            "Cogwave Software",
            "User Creation Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            BranchCode: localStorage.getItem("BranchCode"),
            UserId: "0"
          });
          this.isShown = true;
        } else {
          this.addToast(
            "Cogwave Software",
            "User Creation Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
        }
      } else {
        this.addToast("Cogwave Software", "User Creation Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          UserId: "0"
        });
        this.isShown = true;
      }
    });

   
    if (this.Userrole === "Admin") {
      this.data = this._masterformservice.GetAlluserDetails(this.Branch)
      this._masterformservice.GetAlluserDetails(this.Branch).subscribe(res => {
        this.filterdata = res;
        console.log(this.filterdata)
      })}
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
      let UserRoles = response[event]["IsRole"];

    this.roles.map(x => x.ischecked = false);
    this._masterformservice.getAllRoles().subscribe(
      (data: any) => {
        data.forEach(obj => {  
          if(obj.Name==UserRoles)
          {
            obj.ischecked=true;
            let itemIndex = this.roles.findIndex(item => item.Name == UserRoles);
            this.roles[itemIndex].ischecked = true; 
          }
        });

      }
    );
    


      this._masterformservice.GetUserProductEdit(this.Branch, this.model.UserId).subscribe((data: any) => {
        this.prulist = data;
        console.log(this.prulist);
        data.forEach(obj => {
          if(obj.ischecked==true)
          {
           let index=this.prulist.indexOf(obj)
           this.prulist[index].selected = true;
  
          }
          else
          {
            let index1=this.prulist.indexOf(obj)
            this.prulist[index1].selected = false;
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
    
    this.roles.map(x => x.ischecked = false);
    this.roles[index].ischecked = !this.roles[index].ischecked;
  }

  updateProduct(index) {

    this.prulist[index].selected = !this.prulist[index].selected;
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
