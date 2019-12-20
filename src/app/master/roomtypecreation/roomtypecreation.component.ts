import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { RoomtypeService } from "src/app/_services/roomtype.service";
import { Observable } from "rxjs";
import { DatePipe } from "@angular/common";
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: "app-roomtypecreation",
  templateUrl: "./roomtypecreation.component.html",
  styleUrls: ["./roomtypecreation.component.scss"]
})
export class RoomtypecreationComponent implements OnInit {
  public filterData: any;
  public data: Observable<any>;
  public rowsOnPage = 10;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  topicHasError = true;
  Roomtyeps = ["Ac", "NonAc"];
  catagerys = ["Room", "Hall"];
  catageryhasError = true;
  btitle: string = "Add";
  public DOB: string;
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
  private mode: string;
  private IsExistdata: boolean;
  public Branch:string;
  constructor(
    private _roomtypeservice: RoomtypeService,
    private datePipe: DatePipe,
    private toastyService: ToastyService) {
      this.Branch = localStorage.getItem("BranchCode");
  }

  ngOnInit() {

    this.model.topic = "default";
    this.model.catagery = "default";
    this.btitle = "Add Item";
    this.data = this._roomtypeservice.GetRoomType(this.Branch );

    this._roomtypeservice.GetRoomType(this.Branch ).subscribe((data: any) => {
      this.filterData = data;
    });

    this.mode = "(List)";
  }

  CallKeytype() {
    let datas = this.filterData.find(ob => ob.RoomCode == this.model.RoomCode);
    if (datas == undefined) {
      this.IsExistdata = false;
    } else {
      this.IsExistdata = true;
    }
  }

  onSubmit(form?: NgForm) {
    if (form.value.catagery == "Hall") {
      form.value.IsRoom = false;
    } else {
      form.value.IsRoom = true;
    }
    if (form.value.topic == "AC") {
      form.value.IsAcRoom = true;
    } else {
      form.value.IsAcRoom = false;
    }
    form.value.BranchCode = localStorage.getItem("BranchCode");
    form.value.CreatedBy = localStorage.getItem("id");
    form.value.ModifyBy = localStorage.getItem("id");
    form.value.IpAddress = localStorage.getItem("LOCAL_IP");

    if (form.value.RNO == 0) {
      form.controls.RNO.value(0);
    }

    if (form.invalid) {
      console.log(form.value);
      this.addToast("Cogwave Software", "invalid Data", "warning");
      return;
    }
    if (this.IsExistdata === true) {
      this.addToast("Cogwave Software", "RoomType already Exist ", "warning");
      return;
    }

    this._roomtypeservice.SaveRoomType(form.value).subscribe(data => {
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
            ChannelRoomCode: "CHNL0001",
            Seventh: 0,
            Eighth: 0,
            Nineth: 0,
            Tenth: 0,
            Defaultpax: 2,
            Fivth: 0,
            Sixth: 0,
            ExtraChild: 0
          });
          this.model.topic = "default";
          this.model.catagery = "default";
          this.isShown = true;
          this.data = this._roomtypeservice.GetRoomType(this.Branch );
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
          this.data = this._roomtypeservice.GetRoomType(this.Branch );
        }
      } else {
        this.addToast("Cogwave Software", "RoomType Data Not Saved", "error");
        form.reset({
          IsActive: "true",
          BranchCode: localStorage.getItem("BranchCode"),
          RNo: "0",
          ChannelRoomCode: "CHNL0001",
          Seventh: 0,
          Eighth: 0,
          Nineth: 0,
          Tenth: 0,
          Defaultpax: 2,
          Fivth: 0,
          Sixth: 0,
          ExtraChild: 0
        });
        this.isShown = true;
        this.model.topic = "default";
        this.model.catagery = "default";
      }
    });

   
    this._roomtypeservice.GetRoomType(this.Branch ).subscribe((data: any) => {
      this.filterData = data;
      console.log(this.filterData);
    });
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

  resetForm(form?: NgForm) {
    this.model = {
      RNo: 0,
      RoomCode: "",
      RoomName: null,
      TotalRooms: null,
      IsAcRoom: null,
      ChannelRoomCode: "CHNL0001",
      IsRoom: null,
      SingleRate: null,
      DoubleRate: null,
      TribleRate: null,
      QuadRate: null,
      Fivth: 0,
      Sixth: 0,
      ExtraAdult: null,
      ExtraChild: 0,
      IsActive: true,
      Seventh: 0,
      Eighth: 0,
      Nineth: 0,
      Tenth: 0,
      Defaultpax: 2,
      Defaultrate: null
    };
  }

  //   resetForm(form?: NgForm){
  //     this.model = {
  //      RNo: 0,
  //      RoomCode: 'NON AC',
  //      RoomName: 'NON AC',
  //      TotalRooms :10,
  //      isroomt:'AC',
  //      ChannelRoomCode :'CHNL0001',
  //      IsRoom : 1,
  //      SingleRate :1000,
  //      DoubleRate : 1200,
  //      TribleRate : 1400,
  //      QuadRate : 1600,
  //      Fivth : 0,
  //      Sixth :0,
  //      ExtraAdult : 200,
  //      ExtraChild : 0,
  //      IsActive : true,
  //      Seventh : 0,
  //      Eighth :0,
  //      Nineth : 0,
  //      Tenth : 0,
  //      Defaultpax : 2,
  //      Defaultrate : 0,
  //      topic:"NonAc"
  //    };
  //  }

  openMyModalData(event) {
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.RNo = response[event]["RNo"];
      this.model.RoomCode = response[event]["RoomCode"];
      this.model.RoomName = response[event]["RoomName"];
      this.model.TotalRooms = response[event]["TotalRooms"];
      this.model.ChannelRoomCode = response[event]["ChannelRoomCode"];
      this.model.SingleRate = response[event]["SingleRate"];
      this.model.DoubleRate = response[event]["DoubleRate"];
      this.model.TribleRate = response[event]["TribleRate"];
      this.model.QuadRate = response[event]["QuadRate"];
      this.model.Fivth = response[event]["Fivth"];
      this.model.Sixth = response[event]["Sixth"];
      this.model.ExtraAdult = response[event]["ExtraAdult"];
      this.model.ExtraChild = response[event]["ExtraChild"];
      this.model.IsActive = response[event]["IsActive"];
      this.model.Seventh = response[event]["Seventh"];
      this.model.Eighth = response[event]["Eighth"];
      this.model.Nineth = response[event]["Nineth"];
      this.model.Tenth = response[event]["Tenth"];
      this.model.Defaultpax = response[event]["Defaultpax"];
      this.model.Defaultrate = response[event]["Defaultrate"];
      this.model.IsAcRoom = response[event]["IsAcRoom"];
      this.model.IsRoom = response[event]["IsRoom"];
      this.isroomt = response[event]["IsAcRoom"];
      this.isroomc = response[event]["IsRoom"];
      this.mode = "(Edit) " + this.model.RoomCode;
      if ((this.isroomt = "true")) {
        this.model.topic = "Ac";
      } else {
        this.model.topic = "NonAc";
      }
      if ((this.isroomc = "true")) {
        this.model.catagery = "Room";
      } else {
        this.model.catagery = "Hall";
      }
    });
  }

  Closeform() {
    this.isShown = false;
    this.btitle = "Add Item";
    this.resetForm();
    this.model.topic = "default";
    this.model.catagery = "default";
  }

  openMyModal(event, data) {
    this.model = {
      RoomCode: data.RoomCode,
      SingleRate: data.SingleRate,
      DoubleRate: data.DoubleRate,
      TribleRate: data.TribleRate,
      QuadRate: data.QuadRate,
      Fivth: data.Fivth,
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
    this.model.topic = "default";
    this.model.catagery = "default";
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
