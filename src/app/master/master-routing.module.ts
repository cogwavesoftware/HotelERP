
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Master',
      status: false
    },
    children: [
      {
        path: 'floor',
        loadChildren: './floorcreation/floorcreation.module#FloorcreationModule'
      },
      {
        path: 'bank',
        loadChildren: './bankname/bankname.module#BanknameModule'
      },
      {
         path: 'creditcard',
         loadChildren: './creditcard/creditcard.module#CreditcardModule'
       },

      {
        path: 'RoomType',
        loadChildren: './roomtypecreation/roomtypecreation.module#RoomtypecreationModule'
      },

      {
        path: 'RoomNo',
        loadChildren: './roomorganizer/roomorganizer.module#RoomorganizerModule'
      },

      {
        path: 'reference',
        loadChildren: './booking-reference/booking-reference.module#BookingReferenceModule'
      },
      {
        path: 'companycreate',
        loadChildren: './companycreation/companycreation.module#CompanycreationModule'
      },

     {
       path: 'financial',
         loadChildren: './financial/financial.module#FinancialModule'
       },

      {
        path: 'gridtest',
        loadChildren: './gridtest/gridtest.module#GridtestModule'
      },

      {
        path: 'guest',
        loadChildren: './guestcreation/guestcreation.module#GuestcreationModule'
      },

      {
        path: 'item',
        loadChildren: './itemmaster/itemmaster.module#ItemmasterModule'
      },
      
      {
        path: 'ledger',
        loadChildren: './ledgercreation/ledgercreation.module#LedgercreationModule'
      },

      {
        path: 'othertax',
        loadChildren: './other-tax/other-tax.module#OtherTaxModule'
      },

      {
        path: 'plan',
        loadChildren: './plancreation/plancreation.module#PlancreationModule'
      },

      {
        path: 'revenu',
        loadChildren: './revenu/revenu.module#RevenuModule'
      },

      {
        path: 'roomboy',
        loadChildren: './roomboy/roomboy.module#RoomboyModule'
      },
      {
        path: 'visit',
        loadChildren: './visitpurpose/visitpurpose.module#VisitpurposeModule'
      },
      {
        path: 'planmaster',
         loadChildren: './planmaster/planmaster.module#PlanmasterModule'
       },

       {
        path: 'walet',
         loadChildren: './walet/walet.module#WaletModule'
       },
       {
         path: 'tax',
         loadChildren: './tax/tax.module#TaxModule'
       },
       {
        path: 'address',
        loadChildren: './address/address.module#AddressModule'
      },
      {
        path: 'addressbook',
        loadChildren: './addressbook/addressbook.module#AddressbookModule'
      },
     
      {
        path: 'roomcheckin/:RoomNo',
        loadChildren: './checkin/checkin.module#CheckinModule'
      },
      {
        path: 'resevation/:ResNo',
        loadChildren: './resevation/resevation.module#ResevationModule'
      },
      {
        path: 'reservationlist',
        loadChildren: './reservationlist/reservationlist.module#ReservationlistModule'
      },
      {
        path: 'arivallist',
        loadChildren: './todayarivallist/todayarivallist.module#TodayarivallistModule'
      },
      {
        path: 'reschk/:ResNo',
        loadChildren: './rescheckin/rescheckin.module#RescheckinModule'
      },
      {
        path: 'monthchart',
        loadChildren: './monthchart/monthchart.module#MonthchartModule'
      },

    ]
  }
];



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }

