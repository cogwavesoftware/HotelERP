import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    