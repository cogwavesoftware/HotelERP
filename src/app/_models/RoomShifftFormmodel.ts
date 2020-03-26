export class RoomShifftFormmodel
{
    Id:number;
    CRoomNo:string;
    CRoomCode:string;
    GuestName:string;
    SRoomNo:string;
    SRoomCode:string;
    Tariff:number;
    Tax:number
    NetAmount:number
    Reason:string;
    Mode:string;
    BranchCode:string;
    IpAdd:string;
    CreatedBy:number; 
    RoomNos?:VacantRoom[];
}


export interface VacantRoom {
    RoomNos: string;
  }

