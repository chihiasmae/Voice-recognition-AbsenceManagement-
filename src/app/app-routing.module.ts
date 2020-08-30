import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AbsenceComponent } from './absence/absence.component';
import { RecordComponent } from './record/record.component';
import { EmploiComponent } from './emploi/emploi.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StudentsComponent } from './students/students.component';
import { AppComponent } from './app.component';
import { StudentComponent } from './student/student.component';
import { FromEmploiComponent } from './from-emploi/from-emploi.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  { path: 'login', component: LoginComponent },
  { path: 'absence', component: AbsenceComponent},
  { path: 'record', component: RecordComponent },
  { path: 'emploi', component: EmploiComponent },
  { path: 'sidebar', component: SidebarComponent },
  { path: 'student', component: StudentsComponent },
  { path: 'app', component: AppComponent },
  { path: 'etud', component: StudentComponent },
  { path: 'fromEmploi', component: FromEmploiComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
