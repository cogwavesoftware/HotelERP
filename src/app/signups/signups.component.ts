import { Component, OnInit } from '@angular/core';
import { DataTableBodyCellComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-signups',
  templateUrl: './signups.component.html',
  styleUrls: ['./signups.component.scss']
})
export class SignupsComponent implements OnInit {
   body = document.getElementsByTagName('body')[0];
  constructor() { }
 
  ngOnInit() {
    
    this.body.classList.add("loginsignupbg");    
  }
  ngOnDestroy(){
    this.body.classList.remove("loginsignupbg");
  }
}
