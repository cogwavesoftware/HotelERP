import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonpageComponent } from './commonpage/commonpage.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
// import { bookingsComponent } from './bookings/bookings.component';
// import { bookingComponent } from './bookings/booking/booking.component';
import { AuthGuard } from './_guards';
 
const routes: Routes = [
  {
    
    path: '',
    component: AuthComponent,
    children: [

      {
        path: '',
        //loadChildren: './commonpage/commonpage.module#CommonpageModule'
        loadChildren: () => import('./commonpage/commonpage.module').then(m=>m.CommonpageModule)
      },

      {
        path: 'commonpage',
        //loadChildren: './commonpage/commonpage.module#CommonpageModule'
        loadChildren: () => import('./commonpage/commonpage.module').then(m=>m.CommonpageModule)
      },
      // {
      //   path: 'login/basic-login',
      //   loadChildren: './theme/auth/login/login.module#LoginModule'
       
      // },
      {
        path:'logins',
        //loadChildren:'./logins/logins.module#LoginsModule'
        loadChildren: () => import('./logins/logins.module').then(m=>m.LoginsModule)
      },
      {
        path:'signups',
        //loadChildren:'./signups/signups.module#SignupsModule'
        loadChildren: () => import('./signups/signups.module').then(m=>m.SignupsModule)
      },
     
      //  {
      //    path: 'maintenance/error',
      //   loadChildren: './theme/maintenance/error/error.module#ErrorModule'
      //   //loadChildren: () => import('/theme/maintenance/error/error.module').then(m=>m.)
      // },
    
      // {
      //   path: 'maintenance/offline-ui',
      //   loadChildren: './theme/maintenance/offline-ui/offline-ui.module#OfflineUiModule'
      // }
     
    ]
  },
  
  {
    path: 'dashboard',
    component: AdminComponent,canActivate: [AuthGuard] ,
    
    children: [ 
      {
        path: 'dashboard',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },
      //  {
      //    path: 'dashboard',
      //    loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
         
      //  },
      //  {
      //   path: 'default',
      //   loadChildren: './theme/dashboard/default/default.module#DefaultModule'
      // },
      {
        path: 'company',
       // loadChildren: './super-admin/company/company.module#CompanyModule'
       loadChildren: () => import('./super-admin/company/company.module').then(m=>m.CompanyModule)
      }
      
    ]
  },



  {
    path: 'SuperAdmin',
    component: AdminComponent,
    
    children: [ 
      {
        path: 'SuperAdmin',
        redirectTo: 'SuperAdmin/company',
        pathMatch: 'full'
      },
       
      {
        path: 'company',
        loadChildren: () => import('./super-admin/company/company.module').then(m => m.CompanyModule),       
        //loadChildren: './super-admin/company/company.module#CompanyModule'
      },
      {
        path: 'branch',
        //loadChildren: './super-admin/branch/branch.module#BranchModule'
        loadChildren: () => import('./super-admin/branch/branch.module').then(m=>m.BranchModule)
      },
      {
        path: 'tool',
        //loadChildren: './super-admin/softwaresetup/softwaresetup.module#SoftwaresetupModule'
        loadChildren: () => import('./super-admin/softwaresetup/softwaresetup.module').then(m=>m.SoftwaresetupModule)
      },
     
    ]
  },



  {
    path: 'Master',
    component: AdminComponent, 
    children: [ 
      {
        path: 'Master',
        redirectTo: 'Master/floor',
        pathMatch: 'full'
      },  
      {
        path: 'floor',
        //loadChildren: './master/floorcreation/floorcreation.module#FloorcreationModule'
        loadChildren: () => import('./master/floorcreation/floorcreation.module').then(m=>m.FloorcreationModule)
      },
      {
        path: 'RoomType',
        //loadChildren: './master/roomtypecreation/roomtypecreation.module#RoomtypecreationModule'
        loadChildren: () => import('./master/roomtypecreation/roomtypecreation.module').then(m=>m.RoomtypecreationModule)
      },
      {
        path: 'RoomNo',
        //loadChildren: './master/roomorganizer/roomorganizer.module#RoomorganizerModule'
        loadChildren: () => import('./master/roomorganizer/roomorganizer.module').then(m=>m.RoomorganizerModule)
      },
      {
        path: 'bank',
      //  loadChildren: './master/bankname/bankname.module#BanknameModule'
        loadChildren: () => import('./master/bankname/bankname.module').then(m=>m.BanknameModule)
      },
       {
        path: 'creditcard',
         //loadChildren: './master/creditcard/creditcard.module#CreditcardModule'
         loadChildren: () => import('./master/creditcard/creditcard.module').then(m=>m.CreditcardModule)
       },
       {
        path: 'reference',
        //loadChildren: './master/booking-reference/booking-reference.module#BookingReferenceModule'
        loadChildren: () => import('./master/booking-reference/booking-reference.module').then(m=>m.BookingReferenceModule)
      },
      {
        path: 'companycreate',
        //loadChildren: './master/companycreation/companycreation.module#CompanycreationModule'
        loadChildren: () => import('./master/companycreation/companycreation.module').then(m=>m.CompanycreationModule)
      },


      {
        path: 'gridtest',
        //loadChildren: './master/gridtest/gridtest.module#GridtestModule'
        loadChildren: () => import('./master/gridtest/gridtest.module').then(m=>m.GridtestModule)
      },
      
      {
        path: 'guest',
        //loadChildren: './master/guestcreation/guestcreation.module#GuestcreationModule'
        loadChildren: () => import('./master/guestcreation/guestcreation.module').then(m=>m.GuestcreationModule)
      },

      {
        path: 'item',
        //loadChildren: './master/itemmaster/itemmaster.module#ItemmasterModule'
        loadChildren: () => import('./master/itemmaster/itemmaster.module').then(m=>m.ItemmasterModule)
      },
      
      {
        path: 'ledger',
        //loadChildren: './master/ledgercreation/ledgercreation.module#LedgercreationModule'
        loadChildren: () => import('./master/ledgercreation/ledgercreation.module').then(m=>m.LedgercreationModule)
      },

      {
        path: 'othertax',
       // loadChildren: './master/other-tax/other-tax.module#OtherTaxModule'
        loadChildren: () => import('./master/other-tax/other-tax.module').then(m=>m.OtherTaxModule)
      },

      {
        path: 'plan',
       // loadChildren: './master/plancreation/plancreation.module#PlancreationModule'
        loadChildren: () => import('./master/plancreation/plancreation.module').then(m=>m.PlancreationModule)
      },

      {
        path: 'revenu',
        //loadChildren: './master/revenu/revenu.module#RevenuModule'
        loadChildren: () => import('./master/revenu/revenu.module').then(m=>m.RevenuModule)
      },

      {
        path: 'roomboy',
        //loadChildren: './master/roomboy/roomboy.module#RoomboyModule'
        loadChildren: () => import('./master/roomboy/roomboy.module').then(m=>m.RoomboyModule)
      },
      {
        path: 'visit',
      //  loadChildren: './master/visitpurpose/visitpurpose.module#VisitpurposeModule'
        loadChildren: () => import('./master/visitpurpose/visitpurpose.module').then(m=>m.VisitpurposeModule)
      },
      {
        path: 'walet',
        // loadChildren: './master/walet/walet.module#WaletModule'
         loadChildren: () => import('./master/walet/walet.module').then(m=>m.WaletModule)
       },

       {
        path: 'planmaster',
       //  loadChildren: './master/planmaster/planmaster.module#PlanmasterModule'
         loadChildren: () => import('./master/planmaster/planmaster.module').then(m=>m.PlanmasterModule)
       },

       {
        path: 'tax',
         // loadChildren: './master/tax/tax.module#TaxModule'
         loadChildren: () => import('./master/tax/tax.module').then(m=>m.TaxModule)
       },
       {
        path: 'address',
        //  loadChildren: './master/address/address.module#AddressModule'
         loadChildren: () => import('./master/address/address.module').then(m=>m.AddressModule)
       },
       {
        path: 'addressbook',
        //  loadChildren: './master/addressbook/addressbook.module#AddressbookModule'
         loadChildren: () => import('./master/addressbook/addressbook.module').then(m=>m.AddressbookModule)
       },
      
       {
        path:'financial',
        // loadChildren: './master/financialmaster/financialmaster.module#FinancialmasterModule'
        loadChildren: () => import('./master/financialmaster/financialmaster.module').then(m=>m.FinancialmasterModule)
       },
       {
      
        path:'roomcheckin/:RoomNo',
      //   loadChildren: './master/checkin/checkin.module#CheckinModule'
        loadChildren: () => import('./master/checkin/checkin.module').then(m=>m.CheckinModule)
       },
       {
        path:'dashboard',
        // loadChildren: './master/maindashboard/maindashboard.module#MaindashboardModule'
        loadChildren: () => import('./master/maindashboard/maindashboard.module').then(m=>m.MaindashboardModule)
       },
       {
        path:'reservation/:ResNo',
       //  loadChildren: './master/reservation/reservation.module#ReservationModule'
        loadChildren: () => import('./master/reservation/reservation.module').then(m=>m.ReservationModule)
       },

       {
        path: 'reservationlist',
       //  loadChildren: './master/reservationlist/reservationlist.module#ReservationlistModule'
        loadChildren: () => import('./master/reservationlist/reservationlist.module').then(m=>m.ReservationlistModule)
      },
      {
        path: 'arivallist',
        // loadChildren: './master/todayarivallist/todayarivallist.module#TodayarivallistModule'
        loadChildren: () => import('./master/todayarivallist/todayarivallist.module').then(m=>m.TodayarivallistModule)
      },
    
      {
        path: 'reschk/:ResNo',
       //  loadChildren: './master/rescheckin/rescheckin.module#RescheckinModule'
        loadChildren: () => import('./master/rescheckin/rescheckin.module').then(m=>m.RescheckinModule)
      },

      {
        path: 'monthchart',
       //  loadChildren: './master/monthchart/monthchart.module#MonthchartModule'
        loadChildren: () => import('./master/monthchart/monthchart.module').then(m=>m.MonthchartModule)
      },
      {
        path: 'roomadvance',
       //  loadChildren: './master/roomadvance/roomadvance.module#RoomadvanceModule'
        loadChildren: () => import('./master/roomadvance/roomadvance.module').then(m=>m.RoomadvanceModule)
      },    

      
      {
        path:'roomcheckin/editguest', 
        loadChildren: () => import('./master/checkin/editguest/editguest.module').then(m=>m.EditguestModule)
      },
       

      {
        path: 'blockingdetails',
       //  loadChildren: './master/maindashboard/blockingdetails/blockingdetails.module#BlockingdetailsModule'
        loadChildren: () => import('./master/maindashboard/blockingdetails/blockingdetails.module').then(m=>m.BlockingdetailsModule)
      },
      {
        path: 'drivermaster',
      //  loadChildren: './master/bankname/bankname.module#BanknameModule'
        loadChildren: () => import('./master/drivermaster/drivermaster.module').then(m=>m.DrivermasterModule)
      }
      //{
       // path: 'discountportal',
       //  loadChildren: './master/maindashboard/discountportal/discountportal.module#DiscountportalModule'
       //loadChildren: () => import('./master/maindashboard/discountportal/discountportal.module').then(m=>m.DiscountportalModule)
      //},
      //  {
      //  path:'printgrc',
      //   loadChildren: './master/printgrc/printgrc.module#PrintgrcModule'
      //  },
    ]
  },

  {
    path: 'Control Panel',
    component: AdminComponent,
   
    children: [ 
      {
        path: 'Control Panel',
        redirectTo: 'Control Panel/floor',
        pathMatch: 'full'
      },

      {
         path: 'usercreation',
         // loadChildren: './controlpanel/usercreation/usercreation.module#UsercreationModule'
         loadChildren: () => import('./controlpanel/usercreation/usercreation.module').then(m=>m.UsercreationModule)
       },

       {
        path: 'taxrule',
        //loadChildren: './controlpanel/taxrule/taxrule.module#TaxruleModule'
        loadChildren: () => import('./controlpanel/taxrule/taxrule.module').then(m=>m.TaxruleModule)
      },

      {
        path:'financial',
        //loadChildren: './controlpanel/financialmasters/financialmasters.module#FinancialmastersModule'
        loadChildren: () => import('./controlpanel/financialmasters/financialmasters.module').then(m=>m.FinancialmastersModule)
       },

       {
        path:'userrights',
        //loadChildren: './controlpanel/userrights/userrights.module#UserrightsModule'
        loadChildren: () => import('./controlpanel/userrights/userrights.module').then(m=>m.UserrightsModule)

       },
    ]
  },



  {
    path: 'operation',
    component: AdminComponent,
    children: [ 
      {
        path: 'operation',
        redirectTo: 'operation/petty',
        pathMatch: 'full'
      },

      {
         path: 'petty',
         //loadChildren: './hmsoperation/pettycash/pettycash.module#PettycashModule'
        loadChildren: () => import('./hmsoperation/pettycash/pettycash.module').then(m=>m.PettycashModule)
       },
       {
        path: 'driverdetail', 
       loadChildren: () => import('./hmsoperation/driverdetail/driverdetail.module').then(m=>m.DriverdetailModule)
      },
       {
        path: 'linkadvance',        
        loadChildren: () => import('./hmsoperation/linkadvance/linkadvance.module').then(m=>m.LinkadvanceModule)
      },

      {
        path:'transferAdvance',        
        loadChildren: () => import('./hmsoperation/advancetransfer/advancetransfer.module').then(m=>m.AdvancetransferModule)
       },
       {
        path: 'advancemodification', 
        loadChildren: () => import('./hmsoperation/advancemodification/advancemodification.module').then(m=>m.AdvancemodificationModule)
      },
       {
        path:'roomcancel',        
        loadChildren: () => import('./hmsoperation/roomcancel/roomcancel.module').then(m=>m.RoomcancelModule)

       },

       {
        path: 'advanceposting', 
        loadChildren: () => import('./hmsoperation/advanceposting/advanceposting.module').then(m=>m.AdvancepostingModule)
      } 
    ]
  },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
