import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonpageComponent } from './commonpage/commonpage.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
// import { bookingsComponent } from './bookings/bookings.component';
// import { bookingComponent } from './bookings/booking/booking.component';
import { AuthGuard } from './_guards';
 
const routes: Routes = [

  // {
  //   path:'',
  //   component:CommonpageComponent,
  //   children:[
  //     {
  //       path:'',
  //       redirectTo:'commonpage',
  //       pathMatch: 'full'
  //     },

  //     {
  //       path: 'commonpage',
  //       loadChildren: './commonpage/commonpage.module#CommonpageModule'

       
  //     },
  //   ]
  // },


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
      // {
      //   path: 'auth',
      //   loadChildren: './theme/auth/auth.module#AuthModule'
      // },
       {
         path: 'maintenance/error',
        loadChildren: './theme/maintenance/error/error.module#ErrorModule'
      },
      // {
      //   path: 'maintenance/coming-soon',
      //   loadChildren: './theme/maintenance/coming-soon/coming-soon.module#ComingSoonModule'
      // },
      // {
      //   path: 'email/email-template',
      //   loadChildren: './theme/email/email-template/email-template.module#EmailTemplateModule'
      // },
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
      },
      // {
      //   path: 'navigation',
      //   loadChildren: './theme/navigation/navigation.module#NavigationModule'
      // },
      // {
      //   path: 'widget',
      //   loadChildren: './theme/widget/widget.module#WidgetModule'
      // },
      // {
      //   path: 'basic',
      //   loadChildren: './theme/ui-elements/basic/basic.module#BasicModule'
      // },
      // {
      //   path: 'advance',
      //   loadChildren: './theme/ui-elements/advance/advance.module#AdvanceModule'
      // },
      // {
      //   path: 'animations',
      //   loadChildren: './theme/ui-elements/animation/animation.module#AnimationModule'
      // },
      // {
      //   path: 'forms',
      //   loadChildren: './theme/forms/forms.module#FormsModule'
      // },
      // {
      //   path: 'bootstrap-table',
      //   loadChildren: './theme/table/bootstrap-table/bootstrap-table.module#BootstrapTableModule'
      // },
      // {
      //   path: 'data-table',
      //   loadChildren: './theme/table/data-table/data-table.module#DataTableModule'
      // },
      // {
      //   path: 'user',
      //   loadChildren: './theme/user/user.module#UserModule'
      // },
      // {
      //   path: 'email',
      //   loadChildren: './theme/email/email.module#EmailModule'
      // },
      // {
      //   path: 'crm-contact',
      //   loadChildren: './theme/crm-contact/crm-contact.module#CrmContactModule'
      // },
      // {
      //   path: 'task',
      //   loadChildren: './theme/task/task.module#TaskModule'
      // },
      // {
      //   path: 'editor',
      //   loadChildren: './theme/extension/editor/editor.module#EditorModule'
      // },
      // {
      //   path: 'invoice',
      //   loadChildren: './theme/extension/invoice/invoice.module#InvoiceModule'
      // },
      // {
      //   path: 'file-upload-ui',
      //   loadChildren: './theme/extension/file-upload-ui/file-upload-ui.module#FileUploadUiModule'
      // },
      // {
      //   path: 'calendar',
      //   loadChildren: './theme/extension/event-calendar/event-calendar.module#EventCalendarModule'
      // },
      // {
      //   path: 'charts',
      //   loadChildren: './theme/chart/chart.module#ChartModule'
      // },
      // {
      //   path: 'map',
      //   loadChildren: './theme/map/map.module#MapModule'
      // },
      // {
      //   path: 'bookings', component: bookingsComponent
      // },
      // {
      //   path: 'booking', children: [
      //     { path: '', component: bookingComponent },
      //     { path: 'edit/:id', component: bookingComponent }]
      // },

      // {
      //   path: 'simple-page',
      //   loadChildren: './theme/simple-page/simple-page.module#SimplePageModule'
      // }
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
      // {
      //   path: 'branch',
      //   loadChildren: './super-admin/branch/branch.module#BranchModule'
      // },
      
     
    ]
  },


];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
