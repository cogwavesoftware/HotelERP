import { error } from 'util';
import { OperationService } from 'src/app/_services/operation.service';
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs"; 
import { IpserviceService } from "src/app/_services/ipservice.service";

import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'
import { MasterformService } from 'src/app/_services/masterform.service';
@Component({
  selector: 'app-setcompliment',
  templateUrl: './setcompliment.component.html',
  styleUrls: ['./setcompliment.component.scss']
})
export class SetcomplimentComponent implements OnInit {
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  model: any = {};   
  Branch:string;
  UserId:string;
  filterdata:any;
  emailFormArray: Array<any> = [];
  @ViewChild("f", { static: false }) form: any; 
  @Input() RoomName: string;
  
  @Input() Room: string;
  @Input() Complist: any;
  categories: any[];
  constructor(private _masterformservice: MasterformService,private _oprservice:OperationService,
    private _ipservice: IpserviceService,
    private toastyService: ToastyService) {
      this.Branch= localStorage.getItem("BranchCode");
      this.UserId= localStorage.getItem("id");
   
      this.model = {

        BranchCode: this.Branch,
        CreatedBy: this.UserId,
        RoomNo: this.Room,
        RoomCode: this.RoomName,
        SelectedId:"0",
        Particular: "B"
      };
   }

  ngOnInit() {    

   

   // this.data = this._masterformservice.getrevenudata(this.Branch);

    this._masterformservice.getrevenudata(this.Branch).subscribe(data=>{
      data.forEach(obj => (obj.selected = false));
      this.filterdata=data;
    });
     
     this._masterformservice.getothertax(this.Branch).subscribe((data: any) => {
      //  data.forEach(obj => (obj.selected = false));
       this.categories = data;
       console.log(this.categories);
     }); 
 
  }
  
  onSubmit(form?: NgForm) {  

    var sdata = JSON.stringify(this.emailFormArray);
    var leftstring = sdata.replace('[', '');
    var rightstr = leftstring.replace(']', '');
    this.model.SelectedId=rightstr;
    this.model.RoomNo=this.Room;
    this.model.RoomCode=this.RoomName;
   
    this._oprservice.SaveCompliment(this.model).subscribe(data => {
      if (data == true) {
        this.addToast(
          "Cogwave Software",
          "Data Saved Sucessfully",
          "success"
        );
      }
      else
      {
        this.addToast("Cogwave Software", "Data Not Saved", "error");
      }
    },
    error=>{
      console.log(error.message)
      console.log('error.message')  
      this.addToast("Cogwave Software", error.message, "error");
    },
    ()=>{
        this.closeMyModalPin(event)
    });
      
  }

  onChange(ids: number, isChecked: boolean) {
    if (isChecked) {
      this.emailFormArray.push(ids);
    } else {
      let index = this.emailFormArray.indexOf(ids);
      this.emailFormArray.splice(index, 1);
    }
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
  closeMyModalPin(event){ 
    this.form.reset();
    this.model = {
      BranchCode: this.Branch,
      CreatedBy: this.UserId,
      RoomNo: this.Room,
      RoomCode: this.RoomName,
      SelectedId:"0",
      Particular: "B"
    };
    this.emailFormArray=[];
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    } 
    var maindashboard = document.querySelectorAll(".maindashboard"); 
  }

}
