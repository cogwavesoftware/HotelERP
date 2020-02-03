import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface Floor{
    RNo:number;
    FloorCode:string;
    FloorName:string;
    MaxRoom:number;
    Alloted:number;
    Unalloted:number;
    IsActive:boolean;
    BranchCode:string;
    CreatedBy:number;
    ModifyBy:number;
    CreatedDate:Date;
    ModifyedDate:Date;
    IpAddress:string;
}

export interface Room{

    RNo:number;
    RoomNo:string;
    RoomCode:string;
    RoomDesc:string;
    PAX:number;
    EPAX:number;
    Prioritys:string;
    FloorCode:string;
    FloorName:string;
    Status:string;
    IsRoom:string;
    CheckInNo:string;
    GroupCode:string;
    BranchCode:string;
    CreatedBy:number;
    CreatedDate:Date;
    ModifyBy:number;
    ModifyedDate:Date;
    IpAddress:string;
}

export interface DashBoard{
   
    Vacant:number;
    Occupied:number;
    Dirty:number;
    Blocked:number;
    Un_Settel:number;
    Management:number;
    Occ:number;
    TodayCheckin:number;
    TodayCheckout:number;
    Floor: Floor[];
    Room: Room[];
}