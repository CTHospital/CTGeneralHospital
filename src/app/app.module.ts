import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './shared/default/default.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
<<<<<<< HEAD
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
=======
import { LoginregistrationHomepageComponent } from './user/loginregistration-homepage/loginregistration-homepage.component';

>>>>>>> ccaba1498b63d769a0448b97a3af7b1c92110228

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
/*my changes defaultcomponent replace with login component*/
    children: [
     
    /* {
        path: '',
        component: LoginregistrationHomepageComponent,
      },*/
      {
        path: '',
        component: LoginregistrationHomepageComponent
        
      },
     /* {
        path: 'dashboard',
        component: DashboardComponent,
        
      },*/
      {
        path: 'nurse',
        loadChildren: () =>
          import('./nurse/nurse.module').then((m) => m.NurseModule),
      },

      {
        path: 'patient',
        loadChildren: () =>
          import('src/app/patient/patient.module').then((m) => m.PatientModule),
      },
<<<<<<< HEAD

      {
        path: 'scheduling',
        loadChildren: () =>
          import('src/app/scheduling/scheduling.module').then((m) => m.SchedulingModule),
=======
      /*my change*/
      {
        path: 'user',
        loadChildren: () =>
          import('src/app/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'shared',
        loadChildren: () =>
          import('src/app/shared/shared.module').then((m) => m.SharedModule),
>>>>>>> ccaba1498b63d769a0448b97a3af7b1c92110228
      },
    ],
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    ScheduleModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
