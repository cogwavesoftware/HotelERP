
export class BookingRegister_Read_spParams {
    FromDate?: Date;
    ToDate?: Date;
    StatusId?: number;
    NoOfbookings?: number;
    ModifiedBy?: number;
    BookingTypeId?: number;
}


export class tblBookingMaster {
    bkM_Id?: number;
    bkM_No: string;
    bkM_BookingDateTime: Date;
    bkM_BookingRoomsCount?: number;
    bkM_ReferenceName: string;
    bkM_Purpose: string;
    bkM_BookingVia: string;
    bkM_BookingStatus?: number;
    bkM_StatusDateTime: Date;
    bkM_chMId?: number;
    bkM_ChannelManagerBookingNo: string;
    bkM_WaitingNo?: number;
    bkM_Agent: string;
    bkM_PMSCMS: string;
    bkM_Comments: string;
    bkM_Type?: number;
    bkM_gstMId?: number;
    bkM_Adult?: number;
    bkM_Child?: number;
    bkM_UserIDCreation?: number;
    bkM_IPAddressCreation: string;
    bkM_DateTimeCreation: Date;
    bkM_UserIDModification?: number;
    bkM_IPAddressModification: string;
    bkM_DateTimeModification: Date;
    bkM_BranchID?: number;
    bkM_ReservationFrom: Date;
    bkM_ReservationTo: Date;
}

