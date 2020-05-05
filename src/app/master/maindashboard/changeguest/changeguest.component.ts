import { OperationService } from 'src/app/_services/operation.service';
import { ConfirmationDialogService } from './../../../_services/confirmation-dialog.service';
import { MasterformService } from './../../../_services/masterform.service';
import { Component, OnInit, ViewChild, ElementRef, DoCheck, Input } from '@angular/core';
import { Observable, Observer, empty, fromEvent, pipe, } from "rxjs";
import { filter, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators'

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
  @ViewChild('searchTermguest',{static:false}) searchTermguest:ElementRef
  constructor(private _masterservice:MasterformService,private _oprservice:OperationService,
    private confirmationDialogService:ConfirmationDialogService) {
  this.Branch=localStorage.getItem('BranchCode');}
  ngOnInit() {

    this._masterservice.GetGuestDetails(this.Branch).subscribe(res=>{
      this.guest=res;
    });

    this.model={
      BranchCode:0,
      CreatedBy:1,
      RoomNo:0,
      RoomCode:0,
    }    
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

      this._oprservice.ChangeGuestData(this.Branch,this.RoomNo,GuestCode).subscribe(res=>{
          if(res==true)
          {

          }
      })
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
  }

}
