import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
 
export class CrmContact {
  id: number;
  name: any;
  gender: string;
  company: string; 
}

@Component({
  selector: 'app-setcompliment',
  templateUrl: './setcompliment.component.html',
  styleUrls: ['./setcompliment.component.scss']
})
export class SetcomplimentComponent implements OnInit {
  public rows: Observable<CrmContact>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  // rows = [];
  selected = [];

  

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    this.rows = this.httpClient.get<CrmContact>(`assets/data/crm-contact.json`);
    console.log(this.rows);
  }

}
