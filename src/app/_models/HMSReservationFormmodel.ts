
export class HMSReservationFormmodel{
    BranchCode:string;
    ReservNo:string;
    Advance:number;
    Instructions:string;
    ChangeId:string;
    IsAmend:boolean;
    Logger:string;
    IsConfirmed:boolean;
    IsCompany:boolean;
    CheckInDate:string;
    CheckOutDate:string;
    ArrivalTime:string;
    DepartureTime:string;
    NoDays:number;
    booking:HMSReservationBookingmodel[];
    BookedRoomCodelist:string;
    TypeBook:string;
   
}




export class HMSReservationBookingmodel{

    IsSelect:boolean;
    RoomCode:string;
    Available:number;
    Required:number;
    Pax:number;
    Child:number;
    Male:number;
    Female:number;
    PlanName:string;
    Food:number;
    Tariff:number;
    Tax:number;
    Grand:number;
    Net:number;
    Distype:string;
    Disvalue:number;
    Id:number;
    Dirty:boolean;
   
}