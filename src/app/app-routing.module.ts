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
        loadChildren: './commonpage/commonpage.module#CommonpageModule'
      },

      {
        path: 'commonpage',
        loadChildren: './commonpage/commonpage.module#CommonpageModule'
      },
      {
        path: 'login/basic-login',
        loadChildren: './theme/auth/login/login.module#LoginModule'
      },
      {
        path:'logins',
        loadChildren:'./logins/logins.module#LoginsModule'
      },
      {
        path:'signups',
        loadChildren:'./signups/signups.module#SignupsModule'
      },
     
       {
         path: 'maintenance/error',
        loadChildren: './theme/maintenance/error/error.module#ErrorModule'
      },
    
      {
        path: 'maintenance/offline-ui',
        loadChildren: './theme/maintenance/offline-ui/offline-ui.module#OfflineUiModule'
      }
     
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
       {
         path: 'dashboard',
         loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
       },
       {
        path: 'default',
        loadChildren: './theme/dashboard/default/default.module#DefaultModule'
      },
      {
        path: 'company',
        loadChildren: './super-admin/company/company.module#CompanyModule'
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
        loadChildren: './super-admin/company/company.module#CompanyModule'
      },
      {
        path: 'branch',
        loadChildren: './super-admin/branch/branch.module#BranchModule'
      },
      {
        path: 'tool',
        loadChildren: './super-admin/softwaresetup/softwaresetup.module#SoftwaresetupModule'
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
        loadChildren: './master/floorcreation/floorcreation.module#FloorcreationModule'
      },

      {
        path: 'RoomType',
        loadChildren: './master/roomtypecreation/roomtypecreation.module#RoomtypecreationModule'
      },

      {
        path: 'RoomNo',
        loadChildren: './master/roomorganizer/roomorganizer.module#RoomorganizerModule'
      },
      {
        path: 'bank',
        loadChildren: './master/bankname/bankname.module#BanknameModule'
      },
       {
        path: 'creditcard',
         loadChildren: './master/creditcard/creditcard.module#CreditcardModule'
       },

       {
        path: 'reference',
        loadChildren: './master/booking-reference/booking-reference.module#BookingReferenceModule'
      },
      {
        path: 'companycreate',
        loadChildren: './master/companycreation/companycreation.module#CompanycreationModule'
      },


      {
        path: 'gridtest',
        loadChildren: './master/gridtest/gridtest.module#GridtestModule'
      },

      {
        path: 'guest',
        loadChildren: './master/guestcreation/guestcreation.module#GuestcreationModule'
      },

      {
        path: 'item',
        loadChildren: './master/itemmaster/itemmaster.module#ItemmasterModule'
      },
      
      {
        path: 'ledger',
        loadChildren: './master/ledgercreation/ledgercreation.module#LedgercreationModule'
      },

      {
        path: 'othertax',
        loadChildren: './master/other-tax/other-tax.module#OtherTaxModule'
      },

      {
        path: 'plan',
        loadChildren: './master/plancreation/plancreation.module#PlancreationModule'
      },

      {
        path: 'revenu',
        loadChildren: './master/revenu/revenu.module#RevenuModule'
      },

      {
        path: 'roomboy',
        loadChildren: './master/roomboy/roomboy.module#RoomboyModule'
      },
      {
        path: 'visit',
        loadChildren: './master/visitpurpose/visitpurpose.module#VisitpurposeModule'
      },
      {
        path: 'walet',
         loadChildren: './master/walet/walet.module#WaletModule'
       },

       {
        path: 'planmaster',
         loadChildren: './master/planmaster/planmaster.module#PlanmasterModule'
       },

       {
        path: 'tax',
         loadChildren: './master/tax/tax.module#TaxModule'
       },
       {
        path: 'address',
         loadChildren: './master/address/address.module#AddressModule'
       },
       {
        path: 'addressbook',
         loadChildren: './master/addressbook/addressbook.module#AddressbookModule'
       },
      
       {
        path:'financial',
        loadChildren: './master/financialmaster/financialmaster.module#FinancialmasterModule'
       },
       {
        path:'roomcheckin',
        loadChildren: './master/checkin/checkin.module#CheckinModule'
       },
       {
        path:'dashboard',
        loadChildren: './master/maindashboard/maindashboard.module#MaindashboardModule'
       },
       {
        path:'reservation',
        loadChildren: './master/reservation/reservation.module#ReservationModule'
       },
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
         loadChildren: './controlpanel/usercreation/usercreation.module#UsercreationModule'
       },

       {
        path: 'taxrule',
        loadChildren: './controlpanel/taxrule/taxrule.module#TaxruleModule'
      },

      {
        path:'financial',
        loadChildren: './controlpanel/financialmasters/financialmasters.module#FinancialmastersModule'
       },

       {
        path:'userrights',
        loadChildren: './controlpanel/userrights/userrights.module#UserrightsModule'
       },
    ]
  },


];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
