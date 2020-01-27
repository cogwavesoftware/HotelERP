
import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";
import { Observable, Observer, empty } from "rxjs";
import { NgForm } from "@angular/forms";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { animate, style, transition, trigger } from "@angular/animations";
import { RoomtypeService } from "./../../_services/roomtype.service";
import { MasterformService } from "src/app/_services/masterform.service";
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { AddressService } from './../../_services/address.service';
import { environment } from 'src/environments/environment';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common";
import { BankService } from 'src/app/_services/bank.service';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'
export interface Checkinss {
  RoomCode: string;
  RoomNo: string;
  Pax: number;
  PlanName: string;
  Food: number;
  Tariff: number;
  Tax: number;
  Grand: number;
  ChangeId: string;
  BranchCode: string;
}

@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.scss"],
  animations: [
    trigger("fadeInOutTranslate", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("400ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ transform: "translate(0)" }),
        animate("400ms ease-in-out", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CheckinComponent implements OnInit, OnDestroy {
  //web camara data 

  public snapshotshow = false;
  public OnCamera: string = "OnCamera"
  public Iscamaraon: boolean = false;
  // toggle webcam on/off
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  
  base64TrimmedURL: any;
  base64DefaultURL: any;
  generatedImage: any;
  guest: any;
  picodelist: any;
  referencelist: any;
  companylist:any;
  //public videoOptions: MediaTrackConstraints = {
  // width: {ideal: 1024},
  // height: {ideal: 576}
  //};

  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  //web camara data end 

  NodaysChanged: number = 0;
  form: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  timepicker: Partial<TimepickerConfig>;
  planlist = [];
  public data: Observable<any>

  //forms: FormArray = this.formBuilder.array([]);
  model: any = {};
  //simpleOption: Array<IOption> = this.selectOptionService.getCharacters();
  selectedOption = "3";
  isDisabled = true;
 
  selectedCharacter = "3";
  timeLeft = 5;
  roomtype = [];
  private dataSub: Subscription = null;
  checkinform: any;
  public navRight: string;
  paymentmode: string[] = ["Online", "Credit Card", "Cash"];
  public noofdays: number[] = [];
  foriegnguest: string[] = ["Yes", "No"];
  discounttypes = ["Amount", "%"];
  genderitems: any;
  gender: any;
  pincode: any;
  isSingleCheckin: boolean = true;
  Formcheckin: Checkinss;
  maxDate = new Date();
  myTime = new Date();
  ismeridian: boolean = false;
  minDate: Date;
  valid: boolean = true;
  IsShowloader: boolean = false;
  public rowsOnPage = 12;
  public filterQuery = "";
  public sortBy = "";
  public sortOrder = "desc";
  public isShown: boolean = false;
  referanceName:string;
  isValid(event: boolean): void {
    this.valid = event;
  }
  gendertypes = [];
  GuestTitle = [];
  GuestTdproof = [];
  arrivalmode = [];
  sourcemode = [];
  Arrivalfrom = [];
  purposeofvisit = [];
  newspaper = [];
  billinginstruction = [];
  howuknow = [];
  Nationlist = [];
  Titlelist = [];

  previewUrl: any = null;
  previewUrl2: any = null;
  previewUrl3: any = null;
  filterguest: any[];
  filterpin: any[];
  fileDataIdfront: File = null;
  fileDataIdBack: File = null;

  private _searchTerm: string;
  @ViewChild('searchTerm', { static: false }) searchTerm: ElementRef;
  @ViewChild('searchTermref', { static: false }) searchTermref: ElementRef;
  @ViewChild('searchTermguest', { static: false }) searchTermguest: ElementRef;
  @ViewChild('searchTermcompany', { static: false }) searchTermcompany: ElementRef;
  public Guestphotopathurl: string;
  public GuestDoucmentFrontpathurl: string;
  public GuestDoucmentBackpathurl: string;


  //   return this._searchTerm;
  // }

  // set searchTerm(value: string) {
  //  alert(value)

  //  fromEvent(this.input.nativeElement,'keyup').pipe(
  //     filter(text=>value.length>2),
  //     debounceTime(1000),
  //     distinctUntilChanged(),
  //     switchMap(id => {
  //             console.log(id);
  //             console.log('Francis');
  //             return this._masterformservice.GetPinAddress();
  //          })
  //          ).subscribe(res => this.picodelist = res);

  //  this._searchTerm = value;
  //  this.guest = this.filtereguestdata(value);

  // }


  // get searchpinTerm(): string {
  //   return this._searchTerm;
  // }

  // set searchpinTerm(value: string) {
  //   this._searchTerm = value;
  //   this.picodelist = this.filterePincode(value);
  // }

  // filtereguestdata(searchString: string) {
  //   this.guest = this.filterguest;
  //   return this.guest.filter(function (item) {
  //     return JSON.stringify(item).toLowerCase().indexOf(searchString.toLowerCase()) !== -1
  //   });

  // }


  // filterePincode(searchString: string) {
  //   this.picodelist = this.filterpin;
  //   // return this.guest.filter(res =>
  //   //   res.GuestName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  //   return this.picodelist.filter(function (item) {
  //     return JSON.stringify(item).toLowerCase().indexOf(searchString.toLowerCase()) !== -1
  //   });

  // }


  constructor(private datePipe: DatePipe, public _masterformservice: MasterformService,
    public router: Router,
    public formBuilder: FormBuilder,private _bankservice:BankService,
    private route: ActivatedRoute,
    private roomservice: RoomtypeService,
    private _masterservice: MasterformService, public _addressservice: AddressService
   ) {

      this._bankservice.changeMessage("collapsed")
    this.IsShowloader = false;
    //this.data = this._masterservice.GetPindata();
    // this.data = this._masterservice.GetPinAddress();
    //this.data1 = this._masterservice.GetGuestDetails("CW_1001");
    //this.data2 = this._masterformservice.GetRoomcomany('CW_1001');
    setTimeout(() => {
      this.IsShowloader = false;
    }, 2000)


    // this.datePickerConfig = Object.assign({},
    //   {
    //     containerClass: 'theme-dark-blue',
    //     dateInputFormat: 'DD/MM/YYYY',
    //     adaptivePosition: true,
    //     date:'short'

    //   });

    this.minDate=new Date(); 
    this.maxDate.setDate(this.maxDate.getDate() + 1);

    this.navRight = "nav-off";
    this.timepicker = Object.assign({},
      {
        hourStep: 2,
        minuteStep: 10,
        showMeridian: false,
        // readonlyInput: false,
        mousewheel: true,
        showMinutes: true,
        showSeconds: false,
        // arrowkeys:true
      });

    this.form = this.formBuilder.group({
      companycode: ["0", [Validators.required]],
      referenceid: ["", [Validators.required]],
      source: ["select", [Validators.required]],
      arivalmode: ["Walk-IN", [Validators.required]],
      title: ["Mr", [Validators.required]],
      booking: ["", [Validators.required]],
      convenience: ["", [Validators.required]],
      guestname: ["", [Validators.required]],
      gender: ["Male", [Validators.required]],
      mobile: ["", [Validators.required]],
      email: ["", [Validators.required]],
      foriegnguest: ["No", [Validators.required]],
      address: ["", [Validators.required]],
      pincode: ["", [Validators.required]],
      city: ["", [Validators.required]],
      state: ["", [Validators.required]],
      nation: ["India", [Validators.required]],
      company: ["", [Validators.required]],
      gstno: ["", [Validators.required]],
      other: this.formBuilder.array([this.AddbokingGrid()]),
      checkindate: [new Date(), [Validators.required]],
      checkintime: [this.myTime, [Validators.required]],
      checkouttime: [this.myTime, [Validators.required]],
      nofdays: ["1", [Validators.required]],
      checkoutdate: [this.maxDate, [Validators.required]],
      selmode: ["Cash", [Validators.required]],
      payamount: ["", [Validators.required]],
      paymntdesc: ["", [Validators.required]],
      disctype: ["select", [Validators.required]],
      applycoupen: ["", [Validators.required]],
      discvalue: ["", [Validators.required]],
      graceperiod: ["", [Validators.required]],
      thumbverification: ["", [Validators.required]],
      GuestPhotoPath: ["", [Validators.required]],
      GuestIdFront: ["", [Validators.required]],
      GuestIdBack: ["", [Validators.required]],
      Arrivalfrom: ["", [Validators.required]],
      Proceeding: ["", [Validators.required]],
      Vehicle: ["", [Validators.required]],
      Bags: ["select", [Validators.required]],
      news: ["select", [Validators.required]],
      visit: ["select", [Validators.required]],
      cometoknow: ["select", [Validators.required]],
      Billing: ["select", [Validators.required]],
      DOB: ["", [Validators.required]],
      DOA: ["", [Validators.required]],
      drivername: ["", [Validators.required]],
      drivermobile: ["", [Validators.required]],
      vehicleno: ["", [Validators.required]],
      charge: ["", [Validators.required]],
      idproof: [""],
      idproofno: [""]
    });
  }

  ngOnInit() {
    
    // this._masterservice.GetGuestDetails("CW_1001").subscribe(res => {
    //   this.guest = res;
    //   this.filterguest = res;
    //  // console.log(this.guest)
    // });

    this._masterservice.Getmiscellaneous('Gender').subscribe(data => {
      this.gendertypes = data;
    })

    this._masterservice.GetAllNation().subscribe(data => {
      this.Nationlist = data;
    })

    this._masterservice.Getmiscellaneous('Title').subscribe(data => {
      this.Titlelist = data;
    })

    this._masterservice.Getmiscellaneous('Arrival Mode').subscribe(data => {
      this.arrivalmode = data;
    })
    this._masterservice.Getmiscellaneous('Source').subscribe(data => {
      this.sourcemode = data;
    })

    this._masterservice.Getmiscellaneous('Purpose of Visit').subscribe(data => {
      this.purposeofvisit = data;
    })

    this._masterservice.Getmiscellaneous('News Paper').subscribe(data => {
      this.newspaper = data;
    })

    this._masterservice.Getmiscellaneous('Billing Instruction').subscribe(data => {
      this.billinginstruction = data;
    })

    this._masterservice.Getmiscellaneous('How Do You Know').subscribe(data => {
      this.howuknow = data;
    })

    //'timeing i disabled'
    // WebcamUtil.getAvailableVideoInputs()
    //   .then((mediaDevices: MediaDeviceInfo[]) => {
    //     this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
    //   });


    this._masterservice.getplan().subscribe(res => {
      this.planlist = res as [];
      console.log(this.planlist);
    });

    this.roomservice.GetRoomType("CW_1001").subscribe(data => {
      this.roomtype = data as [];
      console.log(this.roomtype);
    });

    if (this.isSingleCheckin == true) {
      console.log(this.form);
      this._masterservice.GetCheckinDetail("105", "CW_1001").subscribe(data => {
        this.checkinform = data;
        console.log(this.checkinform);
        console.log("this.checkinform");
        this.other.patchValue([
          {
            RoomNo: this.checkinform["checkin"].RoomNo,
            RoomCode: this.checkinform["checkin"].RoomCode,
            Pax: this.checkinform["checkin"].Pax,
            PlanName: this.checkinform["checkin"].PlanName,
            Food: this.checkinform["checkin"].Food,
            Tariff: this.checkinform["checkin"].Tariff,
            Tax: this.checkinform["checkin"].Tax,
            Grand: this.checkinform["checkin"].Grand
          }
        ]);
      });
    }

    this.CreateNoofDays(31)
  }


  ngOnDestroy() {
    this.showWebcam = false;
    this._bankservice.changeMessage("expanded")
  }


  public triggerSnapshot(): void {
    this.trigger.next();
    this.toggleWebcam();
    //this.Iscamaraon = true;
  }

  public SwitchOnCamara() {
    if (this.showWebcam) {
      this.snapshotshow = true;
    }
    else {
      this.snapshotshow = false;
    }
    this.showWebcam = !this.showWebcam;

  }



  ngAfterViewInit() {
    // server-side search

    fromEvent(this.searchTermguest.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTermguest.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)
          console.log('guestmap')
          return this._masterformservice.GuetDataSearch('CW_1001', this.searchTermguest.nativeElement.value);
        })
      ).subscribe(res => this.guest = res);


    fromEvent(this.searchTerm.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTerm.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)
          console.log('switchMap')
          return this._masterformservice.SearchGuestAddress(this.searchTerm.nativeElement.value);
        })
      ).subscribe(res => this.picodelist = res);


    fromEvent(this.searchTermref.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTermref.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)
         
          return this._masterformservice.SearchReferance('CW_1001', this.searchTermref.nativeElement.value);
        })
      ).subscribe(res => this.referencelist = res);



      fromEvent(this.searchTermcompany.nativeElement, 'keyup')
      .pipe(
        filter(text => this.searchTermcompany.nativeElement.value.length > 2),
        debounceTime(1000),
        distinctUntilChanged(),
        // tap(x=>console.log('from tap' + x)),
        switchMap(id => {
          //console.log(id)
         
          return this._masterformservice.SearchComanyDate('CW_1001', this.searchTermcompany.nativeElement.value);
        })
      ).subscribe(res =>{
        this.companylist = res;
        console.log(this.companylist)
      } );

      
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    this.snapshotshow = true;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.previewUrl = webcamImage.imageAsDataUrl
    this.getImage(webcamImage.imageAsBase64)

  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  getImage(url) {
    debugger;
    // Base64 url of image trimmed one without data:image/png;base64
    this.base64DefaultURL = url;
    // Naming the image
    const date = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    }
    // Replace extension according to your media type
    const imageName = date + '_' + text + '.png';
    // call method that creates a blob from dataUri
    //const imageBlob = this.dataURItoBlob(this.base64DefaultURL);
    const formData = new FormData();
    let imageBlob;
    this.dataURItoBlob(this.base64DefaultURL).subscribe(data => {
      imageBlob = data;
      const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
      formData.append('GuestPohto', imageFile, imageName);
    });
    this._masterformservice.SavaImsData(formData)
      .subscribe(res => {
        console.log(imageName);
        this.Guestphotopathurl = imageName;
        console.log(res);

      },
        error => {
          alert('e')
          console.log(error);
        },
        () => {

        });
  }

  dataURItoBlob(dataURI): Observable<Blob> {
    return Observable.create((observer: Observer<Blob>) => {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/jpeg' });
      observer.next(blob);
      observer.complete();
    });
  }

  CreateNoofDays(number) {
    for (var i = 1; i <= number; i++) {
      this.noofdays.push(i);
    }
  }

  ChangeCheckoutDate(NoOfDays) {
    //this.NodaysChanged = NoOfDays;
    // var ddMMyyyy = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    //var result = this.datePipe.transform(new Date().getDay() + 2, "dd/MM/yyyy");
  
    this.minDate=new Date(); 
    this.maxDate.setDate(this.minDate.getDate() + parseInt(NoOfDays));
    var result = this.datePipe.transform(this.maxDate, "dd/MM/yyyy");
     this.form.patchValue({
      checkoutdate:result
     })
    
  }


  get other(): FormArray {
    return this.form.get("other") as FormArray;
  }

  openMyPincodeModalData(SelectedData: any, event: any) {
    this.form.patchValue({
      pincode: SelectedData.Pincode,
      city: SelectedData.AreaData,
      state: SelectedData.City,
      nation: "India",
    })
  }


  OpencompanymodelsDetail(SelectedData: any, event: any) {
    this.form.patchValue({
      company: SelectedData.CompanyName,
      gstno: SelectedData.GSTNO,
      companycode: SelectedData.CompanyCode
    })
  }


  PatchRefenceDetail(SelectedData: any, event: any)
  {
    this.form.patchValue({
      referenceid: SelectedData.Id
    })
    this.referanceName= SelectedData.RefName
  }

  openMyGuestNameModalData(SelectedData: any, event: any) {
    console.log('SelectedData')
    console.log(SelectedData)
    this.form.patchValue({
      guestname: SelectedData.GuestName,
      title: SelectedData.GuestTittle,
      gender: SelectedData.Gender,
      address: SelectedData.GuestAddress,
      city: SelectedData.City,
      state: SelectedData.State,
      nation: "India",
      mobile: SelectedData.MobileNo,
      email: SelectedData.Email,
      pincode: SelectedData.PINCode,
      gstno: SelectedData.GSTNO,
      DOB: SelectedData.GDOB,
      DOA: SelectedData.GDOA,
    });

    this.snapshotshow = true;
    this.Guestphotopathurl = SelectedData.GuestPhotoPath;
    this.GuestDoucmentFrontpathurl = SelectedData.GuestIdFront;
    this.GuestDoucmentBackpathurl = SelectedData.GuestIdBack;

    this.previewUrl = environment.GuestimagePath + "/" + SelectedData.GuestPhotoPath;
    this.previewUrl2 = environment.GuestimagePath + "/" + SelectedData.GuestIdFront;
    this.previewUrl3 = environment.GuestimagePath + "/" + SelectedData.GuestIdBack;
  }


  openMyModalPincode(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }
  OpenGuestMosel(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }

  OpenReferanceModel(event, data) {
    this.filterQuery = "";
    this.referanceName='';
    this.form.patchValue({
      referenceid: '0'
    })
    document.querySelector("#" + event).classList.add("md-show");
  }



  Opencompanymodel(event, data) {
    this.filterQuery = "";
    document.querySelector("#" + event).classList.add("md-show");
  }


  RoomTypeChanged(index: number, Changed: string) {
    //let dd = this.form.controls[index].get("RoomCode").value;
    this.Formcheckin = {
      RoomCode: this.other.controls[index].get("RoomCode").value,
      RoomNo: this.other.controls[index].get("RoomNo").value,
      Pax: this.other.controls[index].get("Pax").value,
      PlanName: this.other.controls[index].get("PlanName").value,
      Food: this.other.controls[index].get("Food").value,
      Tariff: this.other.controls[index].get("Tariff").value,
      Tax: this.other.controls[index].get("Tax").value,
      Grand: this.other.controls[index].get("Grand").value,
      ChangeId: Changed,
      BranchCode: "CW_1001"
    };

    this._masterservice.GetBookingData(this.Formcheckin).subscribe(data => {
      this.other.controls[index].patchValue({
        RoomNo: data["RoomNo"],
        RoomCode: data["RoomCode"],
        Pax: data["Pax"],
        PlanName: data["PlanName"],
        Food: data["Food"],
        Tariff: data["Tariff"],
        Tax: data["Tax"],
        Grand: data["Grand"]
      });
    });
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

  Submit() {

    const formData = new FormData();
    if (this.GuestDoucmentFrontpathurl.length < 5) {
      if (this.fileDataIdfront != null) {
        var timerandom1 = this.datePipe.transform(new Date(), "ddMMyymmss");
        var Rans1 = +timerandom1 * Math.floor(Math.random() * (99999 - 10000)) + 10000;
        var Idfront = 'CW_1001' + '_' + Rans1.toString() + "front" + '.png'
        formData.append('GuestIdFront', this.fileDataIdfront, Idfront);
      }
    }

    if (this.GuestDoucmentBackpathurl.length < 5) {
      if (this.fileDataIdBack != null) {
        var timerandom = this.datePipe.transform(new Date(), "ddMMyymmss");
        var Rans = +timerandom * Math.floor(Math.random() * (99999 - 10000)) + 10000;
        var Idback = 'CW_1001' + '_' + Rans.toString() + "GuestPhoto" + '.png'
        formData.append('GuestIdBack', this.fileDataIdBack, Idback);
      }
    }

    this._masterformservice.SavaImsData(formData)
      .subscribe(res => {
        console.log('res');
        this.GuestDoucmentFrontpathurl = Idfront;
        this.GuestDoucmentBackpathurl = Idback;
      },
        error => {
          // alert('e')    
          // this.error = error;
          // this.error=error.message;  
          // this.addToast("Cogwave Software😃", this.error + "👊", "error");
        });

    console.log(this.form.value)

  }

  AddbokingGrid(): FormGroup {
    return this.formBuilder.group({
      bankAccountID: ["0"],
      RoomCode: ["0"],
      RoomNo: ["", [Validators.required]],
      Pax: ["2", [Validators.required]],
      PlanName: ["EP", [Validators.required]],
      Food: ["0", [Validators.required]],
      Tariff: ["0", [Validators.required]],
      Tax: ["0", [Validators.required]],
      Grand: [""]
    });
  }







  onDelete(bankAccountID, i) {
    if (i != 0) (<FormArray>this.form.get("other")).removeAt(i);
  }

  AddBokingButtonClick(): void {
    (<FormArray>this.form.get("other")).push(this.AddbokingGrid());
  }






  closeMyModalPin(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove(
      "md-show"
    );
  }

  closeMyModal(event) {
    document.querySelector("#" + event).classList.add("md-close");
    document.querySelector("#" + event).classList.remove("md-show");
  }

}












    // this.form.get('nofdays').valueChanges.subscribe(
    //   data => {   
    //   this.NodaysChanged=data;   
    //   // alert(this.NodaysChanged)
    //   // var result = new Date()
    //   // result.setDate(result.getDate() + this.NodaysChanged);
    //   // alert(result)
    //   var newdate = new Date();
    //   newdate.setDate(newdate.getDate() + this.NodaysChanged);   
    //   var dd = newdate.getDate();
    //   var mm = newdate.getMonth() + 1;
    //   var y = newdate.getFullYear();

    //   var someFormattedDate = dd + '/' + mm + '/' + y;
    //   alert(someFormattedDate)

    //   // this.form.patchValue({
    //   //   pincode: "4",
    //   //   checkoutdate:dd
    //   //   })


    //   }); 