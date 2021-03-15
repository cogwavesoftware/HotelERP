 import {
  HostListener, Component, OnDestroy, OnInit, Renderer2, ViewEncapsulation,ViewChild, ElementRef, SimpleChanges, OnChanges 
} from "@angular/core"; 
import { Observable, Observer, empty, fromEvent } from "rxjs";
import { NgForm } from "@angular/forms";
import { AgGridAngular } from 'ag-grid-angular'; 
import { FormBuilder, FormGroup, FormArray, FormControl,ValidatorFn,Validators} from "@angular/forms";
import { animate, style, transition, trigger } from "@angular/animations";
import { MasterformService } from "src/app/_services/masterform.service";
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatePipe } from "@angular/common"; 
import { BankService } from 'src/app/_services/bank.service';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam'; 
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { IpserviceService } from 'src/app/_services/ipservice.service';
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-guestinformation',
  templateUrl: './guestinformation.component.html',
  styleUrls: ['./guestinformation.component.scss']
})
export class GuestinformationComponent implements OnInit {
  Process: string;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private gridApi;
  private gridColumnApi;
  private defaultColDef;
  private groupDefaultExpanded;
  private columnDefs;
  private columnTypes;
  private rowData: any;
  private rowSelection: any;
  title = 'app';
  public data: Observable<any>;
  model: any = {};
  form: FormGroup;
  datePickerConfig: Partial<BsDatepickerConfig>;
  timepicker: Partial<TimepickerConfig>;
  planlist = [];
  minDate: Date; 
  myTime = new Date();
  back = false;
  maxDate = new Date();
  Id$: Observable<string>; 
  valid: boolean = true;
  private selectedRows = [];
  public snapshotshow = false;
  SnapshotbuttonDisabled: boolean;
  camarabuttonDisabled: boolean;
  public showWebcam = false;
  public allowCameraSwitch = true; 
  public multipleWebcamsAvailable = false;
  public Guestphotopathurl: string;
  public GuestDoucmentFrontpathurl: string = "0";
  public GuestDoucmentBackpathurl: string = "0";
  public OnCamera: string = "OnCamera"
  public Iscamaraon: boolean = false;

  // toggle webcam on/off
   public deviceId: string;
  error: string;
  base64TrimmedURL: any;
  base64DefaultURL: any;
  generatedImage: any;

  previewUrl: any = null;
  previewUrl2: any = null;
  previewUrl3: any = null;
  GuetIdFront0: any = null;
  GuetImg0; GuetImg1; GuetImg2; GuetImg3: any = null;
  GuetIdFront1; GuetIdFront2; GuetIdFront3: any = null;
  GuetIdBack0; GuetIdBack1; GuetIdBack2; GuetIdBack3: any = null;
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  isValid(event: boolean): void {
    this.valid = event;
  }
  constructor(private datePipe: DatePipe, private fb: FormBuilder, private renderer: Renderer2,
    public formBuilder: FormBuilder, private _bankservice: BankService, private http: HttpClient,
    private _masterservice: MasterformService,private _masterformservice: MasterformService,private _ipservice: IpserviceService  ) {
      this.minDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 1);

      this.form = this.formBuilder.group({
        guestname: ["", [Validators.required]],
        checkindate: [new Date(), [Validators.required]],  
        arrdate: [new Date(), [Validators.required]],
        arrtime: [this.myTime, [Validators.required]], 
        checkinno: ["", [Validators.required]], 
        planid: ["", [Validators.required]],
        companyname: ["", [Validators.required]],
        gstno: ["", [Validators.required]],
        bid: ["", [Validators.required]] ,
        linkcompany: ["", [Validators.required]] ,
        roomno: ["", [Validators.required]] ,
        othercheckindate: [new Date(), [Validators.required]],  
        othercheckoutdate: [new Date(), [Validators.required]],
        othercheckintime: [this.myTime, [Validators.required]], 
        othercheckouttime: [this.myTime, [Validators.required]], 
        othernofdays: ["", [Validators.required]] ,


        otherRefName: ["", [Validators.required]] ,
        otherTitle: ["", [Validators.required]] ,
        otherguestname : ["", [Validators.required]] ,
        othergender: ["", [Validators.required]] ,
        othermobile: ["", [Validators.required]] ,
        otheremail: ["", [Validators.required]] ,
        otherpincode: ["", [Validators.required]] ,
        otherArea: ["", [Validators.required]] ,
        othercity: ["", [Validators.required]] ,
        otherstate: ["", [Validators.required]] ,
        otherstateCode: ["", [Validators.required]] ,
        othernation: ["", [Validators.required]] ,
        otherBookingid: ["", [Validators.required]] ,        
        othercompany: ["", [Validators.required]] ,
        othergstno: ["", [Validators.required]] ,            
        otheraddress1: ["", [Validators.required]] ,
        otheraddress2: ["", [Validators.required]] ,
        otheraddress3: ["", [Validators.required]] ,
        otherforiegnguest: ["", [Validators.required]] ,
        othersource: ["", [Validators.required]] ,
        otherArrivalfrom: ["", [Validators.required]] ,
        otherconvenience: ["", [Validators.required]] ,
        otherarivalmode: ["", [Validators.required]] ,
        otherProceeding: ["", [Validators.required]] ,
        othervisit: ["", [Validators.required]] ,
        otherVehicle: ["", [Validators.required]] ,
        otherBags: ["", [Validators.required]] ,
        othernews: ["", [Validators.required]] ,
        otherBilling: ["", [Validators.required]] ,
        othercometoknow: ["", [Validators.required]] ,
        otherDOB: ["", [Validators.required]] ,
        otherDOA: ["", [Validators.required]] ,
        otheridproof: ["", [Validators.required]] ,
        otheridproofno: ["", [Validators.required]] ,
        othergraceperiod: ["", [Validators.required]] ,
        bankAccountForms: this.formBuilder.array([]),
        GuestPhotoPath: ["", [Validators.required]],
        GuestIdFront: ["", [Validators.required]],
        GuestIdBack: ["", [Validators.required]],

      });
      this.columnDefs = [
        { headerName: 'Days', field: 'RNO', sortable: true, filter: true },
        { headerName: 'Sampletex1', field: 'Tarriff', sortable: true, filter: true, editable: false },
        { headerName: 'Sampletex2', field: 'Operation1', sortable: true, filter: true, editable: false },
        { headerName: 'Sampletex3', field: 'Type1', sortable: true, filter: true, editable: false },
        { headerName: 'Sampletex4', field: 'Operation2', sortable: true, filter: true, editable: false },
        { headerName: 'Sampletex5', field: 'Type2', sortable: true, filter: true, editable: false } 
      ]; 
    }

  ngOnInit() {
    this.previewUrl = environment.GuestimagePath + '/imagenot1.png';
    this.previewUrl2 = environment.GuestimagePath + '/imagenot1.png';
    this.previewUrl3 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdFront0 = environment.GuestimagePath + '/imagenot1.png';
    this.GuetIdBack0 = environment.GuestimagePath + '/imagenot1.png';
  }
  onGridReady(params) {
    this.rowData = this._masterformservice.GetAllTaxRule();
    console.log(params); 
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    console.log(this.gridColumnApi)
    params.api.sizeColumnsToFit();
  //   setTimeout(()=>{
  //     let SelIds=this.RulId;
  //     this.gridApi.forEachNodeAfterFilter(function(node) {  
  //       node.setSelected(node.data.RNO ===SelIds); 
  //     });
  //  }, 1000);
     
    
  }

  onRowClicked(event){
    console.log("jai");
    console.log(event.data); 
  }

  public SwitchOnCamara() {
    this.SnapshotbuttonDisabled = false;
    this.camarabuttonDisabled = true;

    if (this.showWebcam) {
      this.snapshotshow = true;
    }
    else {
      this.snapshotshow = false;
    }
    this.showWebcam = !this.showWebcam;
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
    this._masterservice.SavaImsData(formData)
      .subscribe(res => {
        console.log(imageName);
        this.Guestphotopathurl = imageName;

        console.log(res);

      },
        error => {
          // alert('e')
          console.log(error);
        },
        () => {

        });
  }



  getImageSecGuest(url, index) {
    this.Process = "Please Wait"
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
    this.Process = "Upload Procee 10%"
    this._masterservice.SavaImsData(formData)
      .subscribe(res => {
        this.Process = "Upload Procee 50%"
      },
        error => {
          // alert('e')
          console.log(error);
          this.Process = "Upload Image Failed Due to Slow Network"
        },
        () => {
          // this.bankAccountForms.controls[index].patchValue({
          //   GuestImage: imageName
          // })
          this.Process = "Upload Compleated"
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

  UplodaImageData(index) {
    debugger;
    this.Process = "Wait Image Uploading..."
    const formData = new FormData();
    let Idfront = "";
    let Idback = "";
    // if (this.fileDataIdfrontSecGuest != null) {

    //   var timerandom1 = this.datePipe.transform(new Date(), "ddMMyymmss");
    //   var Rans1 = +timerandom1 * Math.floor(Math.random() * (99999 - 10000)) + 10000;
    //   Idfront = 'CW_1001' + '_' + Rans1.toString() + "Front" + '.png'
    //   formData.append('GuestIdFront', this.fileDataIdfrontSecGuest, Idfront);
    // }


    // if (this.fileDataIdBackSecGuest != null) {

    //   var timerandom = this.datePipe.transform(new Date(), "ddMMyymmss");
    //   var Rans = +timerandom * Math.floor(Math.random() * (99999 - 10000)) + 10000;
    //   Idback = 'CW_1001' + '_' + Rans.toString() + "Back" + '.png'
    //   formData.append('GuestIdBack', this.fileDataIdBackSecGuest, Idback);
    // }

    this._masterservice.SavaImsData(formData)
      .subscribe(res => {
        this.Process = "Wait Image Uploading 50%..."

      },
        error => {
          this.Process = "Upload Failed Please Try again"
        },
        () => {
          debugger;
          // this.bankAccountForms.controls[index].patchValue({
          //   GuestIdFronturl: Idfront,
          //   GuestIdBackurl: Idback
          // });
          this.Process = "Image Uploaded Successfully"
        });


  }

}
