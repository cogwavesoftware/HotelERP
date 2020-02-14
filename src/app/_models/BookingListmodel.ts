

export interface BookingListmodel {
    GuestName: string;
    BookingNo: string;
    ArrivalDate: string;
    ArrivalTime: string;
    DepartureDate: string;
    DepartureTime: string;
    Status:string;
    BillAmount:number;
    CompanyName:string;
    ReservationType:string;
    AdvancePaidAmount?:number;
  }