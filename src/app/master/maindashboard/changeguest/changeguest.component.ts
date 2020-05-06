import { error } from 'util';
import { OperationService } from 'src/app/_services/operation.service';
import { ConfirmationDialogService } from './../../../_services/confirmation-dialog.service';
import { MasterformService } from './../../../_services/masterform.service';
import { Component, OnInit, ViewChild, ElementRef, DoCheck, Input } from '@angular/core';
import { Observable, Observer, empty, fromEvent, pipe, } from "rxjs";
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'
import { ToastData, ToastOptions, ToastyService } from "ng2-toasty";
@Component({
  selector: 'app-changeguest',
  templateUrl: './changeguest.component.html',
  styleUrls: ['./changeguest.component.scss']
})
export class ChangeguestComponent implements OnInit {
  model:any;
  guest:any;
  Branch:string;
  @Input ('RoomNo') RoomNo:string
  theme = "bootstrap";
  type = "default";
  position = 'top-right';
  @ViewChild('searchTermguest',{static:false}) searchTermguest:ElementRef
  constructor(private _masterservice:MasterformService,private _oprservice:OperationService,
    private toastyService: ToastyService,
    private confirmationDialogService:ConfirmationDialogService) {
  this.Branch=localStorage.getItem('BranchCode');}
  ngOnInit() {

    this._masterservice.GetGuestDetails(this.Branch).subscribe(res=>{
      this.guest=res;
    });

      
  }
  ShowAllData()
  {
     this._masterservice.GetGuestDetails(this.Branch).subscribe(res=>{
       this.guest=res;
     });
  }
ProcessData(GuestCode:string)
{
  this.confirmationDialogService.confirm('Please confirm ..', 'Do you really want to Change Guest ... ?')
  .then((confirmed) => {
    console.log('User confirmed:', confirmed)
    if (confirmed === true) {
     alert(this.RoomNo)
      this._oprservice.ChangeGuestData(this.Branch,this.RoomNo,GuestCode).subscribe(res=>{
          if(res==true)
          {
            this.addToast(
              "Cogwave Software Technologies Pvt Ltd..",
              "Congratulations Data Saved Sucessfully",
              "success"
            );
          }
          else
          {
            this.addToast("Cogwave Software", "Sorry Data Not Saved Sucessfully ", "error");
          }
      },
      error=>{
        console.log(error.message)
        console.log('error.message')
         this.addToast("Cogwave Software", error.message, "error");
      },
      ()=>{
          this.closeMyModalPin(event);
      });
      
    }//confoirmtrue end
    else {
      return;
    }
  })
  .catch(() => {
    alert('cach')
    console.log('e.g., by using ESC, clicking the cross icon, or clicking outside the dialog')
  });

  
}
  SearchGuestData(event:Event)
  {   
    console.log(event);
    fromEvent(this.searchTermguest.nativeElement, 'keyup')
    .pipe(
      filter(text => this.searchTermguest.nativeElement.value.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
     
       //tap(x=>console.log('from tap' + x)),
      switchMap(id => {
        //console.log(id)
        console.log('guestmap')
        return this._masterservice.GuetDataSearch(this.Branch, this.searchTermguest.nativeElement.value);
      })
    ).subscribe(res => {
      this.guest = res
      console.log('res')
      console.log(res)
    });
  }

  closeMyModalPin(event){ 
   
    var openModals = document.querySelectorAll(".md-show");
    for(let i = 0; i < openModals.length; i++) {
      openModals[i].classList.remove("md-show"); 
    } 
    var maindashboard = document.querySelectorAll(".maindashboard"); 
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
