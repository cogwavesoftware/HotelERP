import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef,Inject, PLATFORM_ID, } from "@angular/core";
 

@Component({
  selector: 'app-setcompliment',
  templateUrl: './setcompliment.component.html',
  styleUrls: ['./setcompliment.component.scss']
})
export class SetcomplimentComponent implements OnInit {
  rows = [];
  columns = []
  selected = [];
  isSelected=false;
  complementisSelected = false;
  blockisSelected = false;
  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
   }

  ngOnInit() {    
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);
    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
  onSelect({ selected }) {
   // this.isSelected=!this.isSelected; 

    this.selected.splice(0, this.selected.length);

    this.selected.push(...selected);

    console.log(selected); 
  }

  complementcheck(event){
    alert("complet");
    console.log(event.target.value);

    //if(this.complementisSelected == true){
      this.complementisSelected = true;
      this.blockisSelected=false; 
    //}
    
  }
  blockcheck(event){
    alert("block");
    console.log(event.target.value);
    //if(this.blockisSelected == true){
      this.blockisSelected = true;
      this.complementisSelected=false; 
   // }

  }
  onCheckboxChangeFn(event){
   
  }
  onActivate(event) {
     
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];

  }

  remove() {
    this.selected = [];
  }

}
