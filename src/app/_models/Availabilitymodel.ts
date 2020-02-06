export class Availabilitymodel
{
    Date:Date;
    Rooms:RoomsAvailableModel[];

}
export class RoomsAvailableModel
{
    RoomType:string;
    Rooms:number;
}