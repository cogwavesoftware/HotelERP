import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs/observable";
export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  formId?:number;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  MainId?: number;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}
  
//  const MENUITEMS = 
  
//  [{"label":"HMS Software","main":[{"MainId":1,"state":"Control Panel","short_label":"Co","main_state":"Control Panel","target":false,"name":"Control Panel","type":"sub","icon":"icon-home","children":[{"formId":1,"state":"User Creation","target":false,"name":"User Creation","type":"link","children":[]},{"formId":2,"state":"User Rights","target":false,"name":"User Rights","type":"link","children":[]},{"formId":3,"state":"Database Backup","target":false,"name":"Database Backup","type":"link","children":[]},{"formId":4,"state":"Tax Rule Creation","target":false,"name":"Tax Rule Creation","type":"link","children":[]},{"formId":5,"state":"Tax Rule Setup","target":false,"name":"Tax Rule Setup","type":"link","children":[]},{"formId":6,"state":"Power System Setup","target":false,"name":"Power System Setup","type":"link","children":[]},{"formId":7,"state":"Tool Setup","target":false,"name":"Tool Setup","type":"link","children":[]}]},{"MainId":2,"state":"Master","short_label":"Ma","main_state":"Master","target":false,"name":"Master","type":"sub","icon":"icon-layout-cta-right","children":[{"formId":8,"state":"Floor Creation","target":false,"name":"Floor Creation","type":"link","children":[]},{"formId":9,"state":"RoomType Creation","target":false,"name":"RoomType Creation","type":"link","children":[]},{"formId":10,"state":"Room Organiser","target":false,"name":"Room Organiser","type":"link","children":[]},{"formId":11,"state":"Guest Creation","target":false,"name":"Guest Creation","type":"link","children":[]},{"formId":12,"state":"Company Creation","target":false,"name":"Company Creation","type":"link","children":[]},{"formId":13,"state":"Plan Creation","target":false,"name":"Plan Creation","type":"link","children":[]},{"formId":14,"state":"Credit Card Creation","target":false,"name":"Credit Card Creation","type":"link","children":[]},{"formId":15,"state":"Bank Name Creation","target":false,"name":"Bank Name Creation","type":"link","children":[]},{"formId":16,"state":"Welet Creation","target":false,"name":"Welet Creation","type":"link","children":[]},{"formId":17,"state":"Tax","target":false,"name":"Tax","type":"sub","children":[{"state":"TaxMaster","target":true,"name":"TaxMaster"},{"state":"Tax Description","target":true,"name":"Tax Description"}]}]},{"MainId":3,"state":"Operation","short_label":"Op","main_state":"Operation","target":false,"name":"Operation","type":"sub","icon":"icon-view-grid","children":[]},{"MainId":4,"state":"Checkin","short_label":"Ch","main_state":"Checkin","target":false,"name":"Checkin","type":"sub","icon":"icon-layout-grid2-alt","children":[]},{"MainId":5,"state":"Reservation","short_label":"Re","main_state":"Reservation","target":false,"name":"Reservation","type":"sub","icon":"icon-reload rotate-refresh","children":[]},{"MainId":6,"state":"Dashboard","short_label":"Da","main_state":"Dashboard","target":false,"name":"Dashboard","type":"sub","icon":"icon-crown","children":[]},{"MainId":7,"state":"NightAduit","short_label":"NI","main_state":"NightAduit","target":false,"name":"NightAduit","type":"sub","icon":"icon-layers","children":[]},{"MainId":8,"state":"Search","short_label":"Se","main_state":"Search","target":false,"name":"Search","type":"sub","icon":"icon-pencil-alt","children":[]}]},{"label":"House Keeping","main":[]},{"label":"Maintance","main":[]},{"label":"Sales Module","main":[]},{"label":"Maketing Module","main":[]},{"label":"Customer Module","main":[]}];

@Injectable()
export class MenuItems { 
  
  private products = {}; 
  
  constructor(private http:HttpClient){}
  
//   getAll(): Menu[] 
//   {
  
//  //return MENUITEMS;
//   }

  
  getmenu() 
  {
 
    let id = localStorage.getItem('id');  
    let IsRole = localStorage.getItem('IsRole');

    
    if(IsRole=="Admin")
    {
      return this.http.get(environment.apiURL + '/api/common/HMSAccount/GetMenu');
    }
    else
    {
      
      return this.http.get(environment.apiURL + '/api/common/HMSAccount/GetMenuById?id=' + id);
    }
   
  }
  
}
