import { Component, OnInit,ViewChild } from '@angular/core';
import { TreeviewItem, TreeviewConfig } from '../../shared/service/lib';
import { TreeviewItemService } from '../../shared/service/treeview-item.service';
import { Observable } from "rxjs"; 
import { MasterformService } from "./../../_services/masterform.service";
import { NgForm } from "@angular/forms";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: 'app-userrights',
  templateUrl: './userrights.component.html',
  styleUrls: ['./userrights.component.scss'],
  providers: [
    TreeviewItemService //tree service
]
})
export class UserrightsComponent implements OnInit {
     /* tree property */
     dropdownEnabled = true;
     items: TreeviewItem[];
     
     public itemss: any;
     values: number[];
     config = TreeviewConfig.create({
         hasAllCheckBox: false,
         hasFilter: true,
         hasCollapseExpand: true,
         decoupleChildFromParent: false,
         maxHeight: 500 
     });
   /* tree property end */


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
   @ViewChild("f", { static: false }) form: any;
   Userrole:string;
   Branch: string;
   ipAddress: string;
   mode: string;
   filterdata: any;
   IsExistdata: boolean;
   prulist:any=[];
   SelectedValue:string;
  constructor(private service: TreeviewItemService,
    private _masterformservice: MasterformService, private toastyService: ToastyService) {
      this.Branch=localStorage.getItem("BranchCode");
     }

  ngOnInit() {
    
    
    this.mode = "(List)";
    this.resetForm();
    this.btitle = "Add Item";
    this.Userrole = localStorage.getItem("IsRole")
    
    

 
    if (this.Userrole === "Admin") {
      this.data = this._masterformservice.GetAlluserDetails(this.Branch)
      this._masterformservice.GetAlluserDetails(this.Branch).subscribe(res => {
        this.filterdata = res;
        console.log(this.filterdata)
      })

    }

    
  }

  resetForm(form?: NgForm) {
    this.model.productId='-1';
    this.model.BranchCode=localStorage.getItem("BranchCode");
    this.model.CreatedBy=localStorage.getItem("id");
    this.model.ModifyBy=localStorage.getItem("id");
    this.model.IpAdd=localStorage.getItem("LOCAL_IP");
  }


  GetUserData(Id:any)
  {
    
    if(Id !="-1")
    {
      this.SelectedValue="";
      this.items=[];
      this.itemss = this._masterformservice.GetUserRights(this.model.UserId,Id).subscribe(res=>{
        //this.items=JSON.parse(res);
         const itCategoryd= JSON.parse(res);
         console.log('itCategoryd');
         console.log(itCategoryd)
        // this.items = new TreeviewItem[itCategoryd];
         const itCategorydccc = new TreeviewItem(itCategoryd)
         this.items= [itCategorydccc];
         
       }); //tree  
   
    }
  }

  onSubmit(form? :NgForm)
  {
    this.model.BranchCode=localStorage.getItem("BranchCode");
    this.model.CreatedBy=localStorage.getItem("id");
    this.model.ModifyBy=localStorage.getItem("id");
    this.model.IpAdd=localStorage.getItem("LOCAL_IP");
    
   // var sdata = JSON.stringify(this.SelectedValue);
    var StringData1 = this.SelectedValue.replace('[', '');
    var SelectedValues1 = StringData1.replace(']', '');

    this.model.SelectedValues=SelectedValues1;

    console.log(this.model)
    
    this._masterformservice.SaveuserRight(this.model).subscribe(data => {
      if (data == true) {
      
          this.addToast(
            "Cogwave Software",
            "UserRights Data Saved Sucessfully",
            "success"
          );
          this.isShown = true;}
         
       else {
        this.addToast("Cogwave Software", "UserRights Data Not Saved", "error");
        this.isShown = true;
      }
    });
    
  }

  openMyModalData(event) {
   
    console.log(event)

    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.UserId = response[event]["UserId"];
      this.model.UserName = response[event]["UserName"];
      this.model.IsRole = response[event]["IsRole"];
      this.mode = "(Edit)" + this.model.UserName;
      this._masterformservice.GetUserproduct(this.Branch, this.model.UserId).subscribe((data: any) => {
        this.prulist = data;
        console.log('this.prulist');
        console.log(this.prulist);
      });

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


  /* tree property */
  onFilterChange(value: string) {
    //console.log('filter:', value);
  }
  onSelectedChange(value:string){
    
  
    
    this.SelectedValue=JSON.stringify(value)
    console.log( this.SelectedValue)
  }
/* end tree property */


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
