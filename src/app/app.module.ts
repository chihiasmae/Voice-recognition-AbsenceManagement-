import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AbsenceComponent } from './absence/absence.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MatSnackBarModule } from "@angular/material";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecordComponent } from './record/record.component';
import { EmploiComponent } from './emploi/emploi.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StudentsComponent } from './students/students.component';
import {  LOCALE_ID } from '@angular/core';
import { registerLocaleData, DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {MatPaginatorModule} from '@angular/material/paginator';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {  MatSortModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { AuthenticationService } from './services/authentication.service';
import { StudentComponent } from './student/student.component';
import { FromEmploiComponent } from './from-emploi/from-emploi.component';


registerLocaleData(localeFr);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AbsenceComponent,
    ScheduleComponent,
    RecordComponent,
    EmploiComponent,
    SidebarComponent,
    StudentsComponent,
    JwPaginationComponent,
    StudentComponent,
    FromEmploiComponent

  ],
  imports: [
    PerfectScrollbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
  FromEmploiComponent,

  ],
  providers: [ {provide: LOCALE_ID, useValue: "fr-CA" } ,
   DatePipe,
   AuthenticationService]

 
})
export class AppModule { }
