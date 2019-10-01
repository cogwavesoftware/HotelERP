export interface Branchmodel
{
     
     HotelId : number;
     
     PurchaseId : number;
     
     BranchName : string;
     
     BranchCode : string;
     
     HotelMobile : string;
     
     HotelEmailId : string;
     
     HotelPassword : string;
     
     City : string;
     
     State : string;
     
     Nation : string;
     
     StateCode : number;
     
     HotelAddress : string;
     
     ManagerMobileNo : string;
     
     ManagerEmail : string;
     
     PoliceEmail : string;
     
     GSTNO : string;
     
     TaxNo : string;
     
     LicenceNo : string;
     
     PanNo : string;
     
     TrDate : Date;
     
     IsActive : boolean;
     
     LicenceType : string;
     
   productlist:productlist[]
  }


export interface productlist
{   
         Id : number;
         
         ProductName : string;
         
         ProductDescription : string;
         
         Price : number;
         
         IsActive : boolean;
    
}
    