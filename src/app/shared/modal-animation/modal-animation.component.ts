import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-modal-animation',
  templateUrl: './modal-animation.component.html',
  styleUrls: ['./modal-animation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalAnimationComponent implements OnInit {

  @Input() modalClass: string;
  @Input() contentClass: string;
  @Input() modalID: string;
  @Input() backDrop = false;

  constructor() { }

  ngOnInit() {

  }

  close(event) {
   // alert( event);
    if(event == 'Post' || event == 'Advance' || event == 'Shifft' || event == 'Discount' || event == 'ExtraBed' || event == 'Changepax' || event == 'Grace' || event == 'Amend' || event == 'ChangeCompany' || event == 'linkunlink' || event == 'linkunlink1' || event == 'HouseGuest' || event == 'ChangePlan' || event == 'ChangeGuest' || event == 'Instruction' || event == 'FoodCoupon'  || event == 'PaxonBill' || event == 'WakeUp' || event == 'Compliment' || event == 'vacantdetails' || event == 'Blockdetails' || event == 'Management' || event == 'Rate'  || event == 'RoomHistory' || event == 'GuestHistory' || event == 'ExpressCheckin'  || event == 'GroupBlockForm' || event == 'GroupRelease'  || event == 'GuestHistory'   ){
      document.querySelector('#' + event).classList.add('md-show');
    }
    else{
      document.querySelector('#' + event).classList.remove('md-show');
    }
    
    //document.querySelector('#' + event).classList.add('md-show');
  }
}
