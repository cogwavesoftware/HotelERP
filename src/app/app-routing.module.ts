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
           path:'commonpage/logins',
           loadChildren:'./commonpage/logins/logins.module#LoginsModule'
      },
      
      {
        path:'commonpage/signups',
        loadChildren:'./commonpage/signups/signups.module#SignupsModule'
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
