
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
       // loadChildren: './floorcreation/floorcreation.module#FloorcreationModule'
        loadChildren: () => import('./floorcreation/floorcreation.module').then(m=>m.FloorcreationModule)
      },
      {
        path: 'bank',
       // loadChildren: './bankname/bankname.module#BanknameModule'
        loadChildren: () => import('./bankname/bankname.module').then(m=>m.BanknameModule)
      },
      {
         path: 'creditcard',
       //  loadChildren: './creditcard/creditcard.module#CreditcardModule'
         loadChildren: () => import('./creditcard/creditcard.module').then(m=>m.CreditcardModule)
       },

      {
        path: 'RoomType',
       // loadChildren: './roomtypecreation/roomtypecreation.module#RoomtypecreationModule'
        loadChildren: () => import('./roomtypecreation/roomtypecreation.module').then(m=>m.RoomtypecreationModule)
      },

      {
        path: 'RoomNo',
      //  loadChildren: './roomorganizer/roomorganizer.module#RoomorganizerModule'
        loadChildren: () => import('./roomorganizer/roomorganizer.module').then(m=>m.RoomorganizerModule)
      },

      {
        path: 'reference',
       // loadChildren: './booking-reference/booking-reference.module#BookingReferenceModule'
        loadChildren: () => import('./booking-reference/booking-reference.module').then(m=>m.BookingReferenceModule)
      },
      {
        path: 'companycreate',
       // loadChildren: './companycreation/companycreation.module#CompanycreationModule'
        loadChildren: () => import('./companycreation/companycreation.module').then(m=>m.CompanycreationModule)
      },

     {
       path: 'financial',
        // loadChildren: './financial/financial.module#FinancialModule'
         loadChildren: () => import('./financialmaster/financialmaster.module').then(m=>m.FinancialmasterModule)
       },

      {
        path: 'gridtest',
      //  loadChildren: './gridtest/gridtest.module#GridtestModule'
        loadChildren: () => import('./gridtest/gridtest.module').then(m=>m.GridtestModule)
      },

      {
        path: 'guest',
      //  loadChildren: './guestcreation/guestcreation.module#GuestcreationModule'
        loadChildren: () => import('./guestcreation/guestcreation.module').then(m=>m.GuestcreationModule)
      },

      {
        path: 'item',
       // loadChildren: './itemmaster/itemmaster.module#ItemmasterModule'
        loadChildren: () => import('./itemmaster/itemmaster.module').then(m=>m.ItemmasterModule)
      },
      
      {
        path: 'ledger',
       // loadChildren: './ledgercreation/ledgercreation.module#LedgercreationModule'
        loadChildren: () => import('./ledgercreation/ledgercreation.module').then(m=>m.LedgercreationModule)
      },

      {
        path: 'othertax',
      //  loadChildren: './other-tax/other-tax.module#OtherTaxModule'
        loadChildren: () => import('./other-tax/other-tax.module').then(m=>m.OtherTaxModule)
      },

      {
        path: 'plan',
       // loadChildren: './plancreation/plancreation.module#PlancreationModule'
        loadChildren: () => import('./plancreation/plancreation.module').then(m=>m.PlancreationModule)
      },

      {
        path: 'revenu',
       // loadChildren: './revenu/revenu.module#RevenuModule'
        loadChildren: () => import('./revenu/revenu.module').then(m=>m.RevenuModule)
      },

      {
        path: 'roomboy',
       // loadChildren: './roomboy/roomboy.module#RoomboyModule'
        loadChildren: () => import('./roomboy/roomboy.module').then(m=>m.RoomboyModule)
      },
      {
        path: 'visit',
       // loadChildren: './visitpurpose/visitpurpose.module#VisitpurposeModule'
        loadChildren: () => import('./visitpurpose/visitpurpose.module').then(m=>m.VisitpurposeModule)
      },
      {
        path: 'planmaster',
       //  loadChildren: './planmaster/planmaster.module#PlanmasterModule'
         loadChildren: () => import('./planmaster/planmaster.module').then(m=>m.PlanmasterModule)
       },

       {
        path: 'walet',
       //  loadChildren: './walet/walet.module#WaletModule'
         loadChildren: () => import('./walet/walet.module').then(m=>m.WaletModule)
       },
       {
         path: 'tax',
        // loadChildren: './tax/tax.module#TaxModule'
         loadChildren: () => import('./tax/tax.module').then(m=>m.TaxModule)
       },
       {
        path: 'address',
      //  loadChildren: './address/address.module#AddressModule'
        loadChildren: () => import('./address/address.module').then(m=>m.AddressModule)
      },
      {
        path: 'addressbook',
       // loadChildren: './addressbook/addressbook.module#AddressbookModule'
        loadChildren: () => import('./addressbook/addressbook.module').then(m=>m.AddressbookModule)
      },
     
      {
        path: 'roomcheckin/:RoomNo',
       // loadChildren: './checkin/checkin.module#CheckinModule'
        loadChildren: () => import('./checkin/checkin.module').then(m=>m.CheckinModule)
      },
      {
        path: 'resevation/:ResNo',
      //  loadChildren: './resevation/resevation.module#ResevationModule'
        loadChildren: () => import('./reservation/reservation.module').then(m=>m.ReservationModule)
      },
      {
        path: 'reservationlist',
       // loadChildren: './reservationlist/reservationlist.module#ReservationlistModule'
        loadChildren: () => import('./reservationlist/reservationlist.module').then(m=>m.ReservationlistModule)
      },
      {
        path: 'arivallist',
      //  loadChildren: './todayarivallist/todayarivallist.module#TodayarivallistModule'
        loadChildren: () => import('./todayarivallist/todayarivallist.module').then(m=>m.TodayarivallistModule)
      },
      {
        path: 'reschk/:ResNo',
       // loadChildren: './rescheckin/rescheckin.module#RescheckinModule'
        loadChildren: () => import('./rescheckin/rescheckin.module').then(m=>m.RescheckinModule)
      },
      {
        path: 'monthchart',
       // loadChildren: './monthchart/monthchart.module#MonthchartModule'
        loadChildren: () => import('./monthchart/monthchart.module').then(m=>m.MonthchartModule)
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

