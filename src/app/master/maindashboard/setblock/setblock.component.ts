import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setblock',
  templateUrl: './setblock.component.html',
  styleUrls: ['./setblock.component.scss']
})
export class SetblockComponent implements OnInit {
  rows = [];
  columns = []
  selected = [];
  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
   }
   fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/setblock.json`); 
    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    console.log(selected); 
  }

  onActivate(event) {}

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }
  ngOnInit() {
  }

  

}
