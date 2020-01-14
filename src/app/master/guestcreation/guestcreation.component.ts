import { Component, OnInit,ViewChild,SimpleChanges } from '@angular/core'; 

import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';
import { MasterformService } from './../../_services/masterform.service';
import { IpserviceService } from 'src/app/_services/ipservice.service'; 
import { ToastData,ToastOptions,ToastyService } from 'ng2-toasty'
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DatePipe } from "@angular/common";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-guestcreation',
  templateUrl: './guestcreation.component.html',
  styleUrls: ['./guestcreation.component.scss']
})
export class GuestcreationComponent implements OnInit {
  public data: Observable<any>;
  public data1: Observable<any>;
  public roomsdetail:Observable<any>;
  public rowsOnPage = 12;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  model: any = {};
  model1:any ={};
  model2:any={};
  btitle: string = "Add";
  isValid: boolean;
  IsExistdata:boolean
  dtat: string;
  title: string;
  msg: string;
  imagePath:File;
  imagePath1:string;
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
  error:string;
  genderhasError:boolean;  
  gendertypes=[];
  GuestTitle=[];
  GuestTdproof=[];
  @ViewChild("f", { static: false }) form: any;
   GuestPhotpath:string;
   GuestIdFrontpath:string;
   GuestIdBackpath:string;
  fileData: File = null;
  fileDataIdfront: File = null;
  fileDataIdBack: File = null;

  previewUrl:any = null;
  previewUrl2:any = null;
  previewUrl3:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  showloader: boolean;
  isShowLinksPop:boolean;
  roomname:any;
  floorname:any;
  constructor(private _masterformservice: MasterformService,private http: HttpClient,
    private _ipservice: IpserviceService,private toastyService: ToastyService, private datePipe: DatePipe,
     ) { this.Branch= localStorage.getItem("BranchCode");

     
     setTimeout(()=>{
      
       this.data1 = this._masterformservice.GetPinAddress();
       this.roomsdetail = this._masterformservice.GetSwardDetail(this.Branch);
          console.log(this.data);
       
     },1);
     
     

    }
   
  ngOnInit() {
    
    setTimeout(()=>{    
      
      this.data1 = this._masterformservice.GetPinAddress();
         
      this.roomsdetail = this._masterformservice.displayRooms();

      //this.data1 = this._masterformservice.GetPinAddress();
     
    },1);
    
    console.log(JSON.stringify("pinvalue"+ this.data1));
    this.resetForm();
    this.btitle = "Add Item";
    this.mode = "(List)";
    // this.isroomc="CW_1001_36296769926386front.png";
    this.isroomc="CW_1001_148857913375854GuestPhoto.png";
    
    this.imagePath1=environment.GuestimagePath+"/"+this.isroomc;
    console.log("image name with path"+ this.imagePath1);

   

    this._masterformservice.Getmiscellaneous('Gender').subscribe(data=>{
      this.gendertypes=data;
    })
    this._masterformservice.Getmiscellaneous('Title').subscribe(data=>{
      this.GuestTitle=data;
    })

    this._masterformservice.Getmiscellaneous('IdProff').subscribe(data=>{
      this.GuestTdproof=data;
    })

    if (!this.Branch) {
      this.data = this._masterformservice.GetGuestDetails("CW_1001");
    } else {
      this.data = this._masterformservice.GetGuestDetails(this.Branch);
    }
  
    // this._masterformservice.GetBankdetails(this.Branch).subscribe((data: any) => {
    //   this.filterdata = data;
    // });
  }

  changestatus( items ){ 
    console.log(items);

}
 
onSubmit() {
  debugger;
  this.form.BranchCode = localStorage.getItem("BranchCode");
  this.form.CreatedBy = localStorage.getItem("id");
  this.form.ModifyBy = localStorage.getItem("id");
  this.form.IpAdd = localStorage.getItem("LOCAL_IP");
  console.log(this.form.value);
  this.GuestPhotpath="0";
  this.GuestIdFrontpath="0";
  this.GuestIdBackpath="0";
  const formData = new FormData();
  var timerandom = this.datePipe.transform(new Date(), "ddMMyymmss");
  var Rans=+timerandom *  Math.floor(Math.random() * (99999 - 10000)) + 10000;
  var Guest=this.Branch +'_'+ Rans.toString()+"GuestPhoto" + '.png'
  console.log(Guest)

  var timerandom1 = this.datePipe.transform(new Date(), "ddMMyymmss");
  var Rans1=+timerandom1 *  Math.floor(Math.random() * (99999 - 10000)) + 10000;
  var Idfront=this.Branch +'_'+ Rans1.toString()+"front" + '.png'
  console.log(Idfront)

  var timerandom = this.datePipe.transform(new Date(), "ddMMyymmss");
  var Rans=+timerandom *  Math.floor(Math.random() * (99999 - 10000)) + 10000;
  var Idback=this.Branch +'_'+ Rans.toString()+"GuestPhoto" + '.png'
  console.log(Idback)

  if(this.fileData!=null)
  {
    formData.append('GuestPohto', this.fileData, Guest);
  }
   
  if(this.fileDataIdfront!=null)
  {
    formData.append('GuestIdFront', this.fileDataIdfront, Idfront);
  }

  if(this.fileDataIdBack!=null)
  {
    formData.append('GuestIdBack', this.fileDataIdBack, Idback);
  }

    debugger;
  
  this._masterformservice.SavaImsData(formData)
    .subscribe(res => {
      console.log('res');
     this.form.GuestPhotoPath=Guest;
     this.form.GuestIdFront=Idfront;
     this.form.GuestIdBack=Idback;
    },
    error => {    
      alert('e')    
      this.error = error;
      this.error=error.message;  
      this.addToast("Cogwave Software😃", this.error + "👊", "error");
    }); 
 
 console.log(this.form.value);
return;

  if (this.form.valid)
    {
      console.log(this.form.value);
      console.log("Form Submitted!"); 
      this._masterformservice.SaveGuestData(this.form.value).subscribe(data => {
        if (data == true) {
          if (this.form.value.GuestCode == "0") {
            this.addToast(
              "Cogwave Software",
              "Guest Data Saved Sucessfully",
              "success"
            );
            this.form.reset({
              
              BranchCode: localStorage.getItem("BranchCode"),
              GuestCode: "0",
              GuestTittle: 'select',
              Gender: 'select',
              GdProof:'select',
            });
            this.isShown = true;
          } else {
            this.addToast(
              "Cogwave Software",
              "Guest Data Updated Sucessfully",
              "success"
            );
            this.form.reset();
            this.mode = "(List)";
            this.isShown = false;
            this.btitle = "Add Item";
          }
        } else {
          this.addToast("Cogwave Software", "Guest Data Not Saved", "error");
          this.form.reset({ 
            BranchCode: localStorage.getItem("BranchCode"),
            GuestCode: "0",
            GuestTittle: 'select',
            Gender: 'select',
            GdProof:'select',
          });
          this.isShown = true;
        }
      });
      this.data = this._masterformservice.GetGuestDetails(this.Branch);
    }
    else
    {
    
        this.addToast("Cogwave Software", "invalid Data", "warning");
        return;
    }
    


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
      GuestCode: 0,
      GuestTittle: 'select',
      Gender: 'select',
      GdProof:'select',
      GuestName: null,
      GuestAddress: null,
      City: null,
      State: null,
      Nation: null,
      MobileNo: null,
      Email: null,
      GSTNO: null,
      PINCode: null,
     
      IdNo:null
      // GDOB: null,
      // GDOA: true
    };
  }

  openMyModalData(event) {
   
    this.btitle = "Hide Form";
    this.isShown = true;
    this.data.subscribe(response => {
      this.model.Id = response[event]["Id"];
      this.model.GuestTittle = response[event]["GuestTittle"];
      this.model.Gender = response[event]["Gender"];
      this.model.GuestName = response[event]["GuestName"];
      this.model.GuestAddress = response[event]["GuestAddress"];
      this.model.City = response[event]["City"];
      this.model.State = response[event]["State"];
      this.model.Nation = response[event]["Nation"];
      this.model.MobileNo = response[event]["MobileNo"];
      this.model.Email = response[event]["Email"];
      this.model.GSTNO = response[event]["GSTNO"];
      this.model.PINCode = response[event]["PINCode"];
      // this.model.GDOB = response[event]["GDOB"];
      // this.model.GDOA = response[event]["GDOA"];
      this.model.ModifyBy = response[event]["ModifyBy"];
      this.model.GdProof = response[event]["GdProof"];
      this.model.IdNo = response[event]["IdNo"];
      // this.model.previewUrl = this.previewUrl ;
      this.previewUrl = this.imagePath1;
      this.mode = "(Edit)"+  this.model.GuestName;
    });
  }
  openMyPincodeModalData(event,evt){
    console.log("calling");
   // this.model.State  = "sakthi";
    // this._ipservice.getIpAddress().subscribe((res: any) => {
    //   this.ipAddress = res.ip;
    //   console.log(this.ipAddress);
    // });
    // this._masterformservice.GetPinAddress().subscribe((res:any)=>{
    //     this.model.GuestAddress = res[event]["AreaData"];
    //     this.model.City = res[event]["City"];
    //     this.model.PINCode = res[event]["Pincode"];
    //     this.model.State = res[event]["State"];
    //     this.model.Nation = res[event]["Nation"];
    //     console.log(this.model.State);
    // })
    this.showloader = true;
    setTimeout(()=>{
      this.data1.subscribe(response =>{     
        this.showloader = false;
        this.model.GuestAddress = response[event]["AreaData"];
          this.model.City = response[event]["City"];
          this.model.PINCode = response[event]["Pincode"];
          this.model.State = response[event]["State"];
          this.model.Nation = response[event]["Nation"];
          console.log(this.model.State);
          this.customclose();
       })
    },1000);
   

  }
  customclose(){   
  document.querySelector(".md-modal").classList.add("customclosepopup");
   document.querySelector(".md-modal").classList.remove("md-show");
   document.querySelector(".md-modal").classList.remove("customclosepopup");
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
      GuestTittle: data.GuestTittle,
      Gender: data.Gender,
      GuestName: data.GuestName,
      GuestAddress: data.GuestAddress,
      City: data.City,
      State: data.State,
      Nation: data.Nation,
      MobileNo: data.MobileNo,
      Email: data.Email,
      GSTNO: data.GSTNO,
      PINCode: data.PINCode,
      GdProof :data.GdProof,
      IdNo : data.IdNo
    
      // GDOB: data.GDOB,
      // GDOA: data.GDOA      
    };
    document.querySelector("#" + event).classList.add("md-show");
  }
  openMyModalPincode(event, data){

    this.model1 = {      
      Id: data.Id,
      City: data.City,
      Pincode: data.Pincode,
      State: data.State,
      AreaData:data.AreaData
    };
    
    document.querySelector("#" + event).classList.add("md-show");
  }
  openRoomsPopup(event, roomname ) {
      this.model2 = {       
          roomname: roomname,        
      };
    console.log("roomname"+ roomname  );
    document.querySelector("#" + event).classList.add("md-show");
  }
  closeMyModal(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }
  validategender(value) {
    if (value === 'default') {
      this.genderhasError = true;
    } else {
      this.genderhasError = false;
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
  fileProgress(fileInput: any) {
    debugger;
    this.fileData = <File>fileInput.target.files[0];
    this.preview1();
}

preview1() {
  
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}


fileProgressIdfFront(fileInput: any) {
  this.fileDataIdfront = <File>fileInput.target.files[0];
  this.preview2();
}
preview2() {
  
  var mimeType = this.fileDataIdfront.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileDataIdfront); 
  reader.onload = (_event) => { 
    this.previewUrl2 = reader.result; 
  }
}

fileProgressIdfback(fileInput: any) {
  debugger;
  this.fileDataIdBack = <File>fileInput.target.files[0];
  this.preview3();
}


preview3() {
 
  var mimeType = this.fileDataIdBack.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileDataIdBack); 
  reader.onload = (_event) => { 
    this.previewUrl3 = reader.result; 
  }
}

}
