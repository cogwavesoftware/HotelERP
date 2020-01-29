
import { Component, OnInit } from "@angular/core";
import { MasterformService } from "src/app/_services/masterform.service";
import { Observable } from "rxjs";
import { RoomtypeService } from "src/app/_services/roomtype.service";
import { NgForm } from "@angular/forms";
import { FloormasterService } from './../../_services/floormaster.service';
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
import {NgSelectModule, NgOption} from '@ng-select/ng-select';


@Component({
  selector: "app-roomorganizer",
  templateUrl: "./roomorganizer.component.html",
  styleUrls: ["./roomorganizer.component.scss"]
})

export class RoomorganizerComponent implements OnInit {
//   cities = [
//     {id: 1, name: 'Vilnius'},
//     {id: 2, name: 'Kaunas'},
//     {id: 3, name: 'Pavilnys', disabled: true},
//     {id: 4, name: 'Pabradė'},
//     {id: 5, name: 'Klaipėda'}
// ];
selectedRoomcode: any;
  model: any = {};
  topicHasError = true;
  catagerys = ["Room", "Hall"];
  catageryhasError = true;
  btitle: string = "Add Item";
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  isValid: boolean;
  public isShown: boolean = false;
  dtat: string;
  title: string;
  msg: string;
  returnUrl: string;
  showClose = true;
  theme = "bootstrap";
  type = "default";
  public priority: string = "P";
  public data: Observable<any>;
  private roomtypelist: any;
  public Branch: string;
  mode:string;
  public Floorlist:any;
  private IsExistdata:boolean;
  private filterData:any;
  isroomc: string;
  constructor(private _masterformervice: MasterformService,private _roomtypeservice: RoomtypeService,
    private _floorservice: FloormasterService, private toastyService:ToastyService ) {
    this.Branch = localStorage.getItem("BranchCode");
    this.priority = "P";
  }

  ngOnInit() {
    this.mode="(List)";
    this.data = this._masterformervice.GetAllRoomNo(this.Branch);
    this._masterformervice.GetAllRoomNo(this.Branch ).subscribe((data: any) => {
      this.filterData = data;  
    });

    this._roomtypeservice.GetRoomType(this.Branch).subscribe((data: any) => {
      this.roomtypelist = data;
    });
  
    this._floorservice.GetfloorData().subscribe((data: any) => {
      this.Floorlist = data;
    });
    this.model.catagery = "default";
    this.resetForm();
  }



  onSubmit(form?: NgForm) {

    if (form.value.catagery == "Hall") {
      form.value.IsRoom = false;
    } else {
      form.value.IsRoom = true;
    }
  
    form.value.BranchCode = localStorage.getItem("BranchCode");
    form.value.CreatedBy = localStorage.getItem("id");
    form.value.ModifyBy = localStorage.getItem("id");
    form.value.IpAddress = localStorage.getItem("LOCAL_IP");

    // if (form.value.RNo == 0) {
    //   form.controls.RNo.value(0);
    // }
    console.log(form.value);
  
    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "RoomType already Exist ", "warning");
      return;
    }

    this._masterformervice.SaveRoomDetail(form.value).subscribe(data => {
      if (data == true) {
        if (form.value.RNo == "0") {
          this.addToast(
            "Cogwave Software",
            "RoomType Data Saved Sucessfully",
            "success"
          );
          form.reset({
            IsActive: "true",
            BranchCode: localStorage.getItem("BranchCode"),
            RNo: "0",
            RoomCode: '-1',
            priority: "P",
            FloorName:'select'
          });
          this.model.catagery = "default";
          this.isShown = true;
          this.data = this._masterformervice.GetAllRoomNo(this.Branch);

        } else {
          this.addToast(
            "Cogwave Software",
            "RoomType Data Updated Sucessfully",
            "success"
          );
          form.reset();
          this.mode = "(List)";
          this.isShown = false;
          this.btitle = "Add Item";
          this.data = this._masterformervice.GetAllRoomNo(this.Branch);

        }
      } else {
        this.addToast("Cogwave Software", "RoomType Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          RNo: "0",
          RoomCode: '-1',
          priority: "P",
          FloorName:'select'
        });
        this.isShown = true;
        this.model.catagery = "default";
      }
    });

   
    this._masterformervice.GetAllRoomNo(this.Branch ).subscribe((data: any) => {
      this.filterData = data;  
    });

  }


  resetForm() 
  {
    this.model = {
      RNo: 0,
      RoomCode: '-1',
      RoomNo: null,
      RoomDesc: "g", 
      priority: "P",
      IsRoom: null, 
      IsActive:true,
      FloorName:'select'
    };
  }


  openMyModalData(event) {
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.RNo = response[event]["RNo"];
      this.model.RoomCode = response[event]["RoomCode"];
      this.model.RoomNo = response[event]["RoomNo"];
      this.model.RoomDesc = response[event]["RoomDesc"];
      this.model.priority = response[event]["priority"];
      this.model.IsActive = response[event]["IsActive"];
      this.model.FloorName = response[event]["FloorName"];
      this.mode = "(Edit) " + this.model.RoomNo;
      this.isroomc = response[event]["IsRoom"];
      if (this.isroomc = "true") {
        this.model.catagery = "Room";
      } else {
        this.model.catagery = "Hall";
      }
    
    });
  }

  openMyModal(event, data) {
    this.model = {
      RoomCode: data.RoomCode,
      RoomNo: data.RoomNo,
      RoomDesc: data.RoomDesc,
      priority: data.priority,
      FloorName: data.FloorName,
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

  Showhide() {
    //this.resetForm();
    if (this.btitle == "Hide Form") {
      this.isShown = false;
      this.btitle = "Add Item";
      this.mode="(List)";
    } else {
      this.isShown = true;
      this.btitle = "Hide Form";
      this.mode="(New)";
    }
    
    this.model.catagery = "default";
  }

  validateTopic(value) {
    if (value === "default") {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  validateroom(value) {
    if (value === "default") {
      this.catageryhasError = true;
    } else {
      this.catageryhasError = false;
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
}
