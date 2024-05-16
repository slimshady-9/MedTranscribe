import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientComponent } from './components/patient/patient.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashyComponent } from './dashy/dashy.component';
import { AuthGuard } from './guards/auth.guard'
import { SinglePatientDetailsComponent } from './components/single-patient-details/single-patient-details.component';
import { AudioRecordingComponent } from './components/audio-recording/audio-recording.component';

const routes: Routes = [
  {path:'' , component:DashyComponent},
  {path:'login', component:LoginPageComponent},
  {path:'dashboard', component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'patients' , component:PatientComponent, canActivate:[AuthGuard]},
  {path:'patient/:id',component:SinglePatientDetailsComponent, canActivate:[AuthGuard]}

  //  { path: '', component: DashyComponent },
  // // { path: 'login', component: LoginPageComponent },
  // { path: 'dashboard', component: DashboardComponent},
  // { path: 'patients', component: PatientComponent },
  // { path: 'patient/:id', component: SinglePatientDetailsComponent },
  // { path: 'audio', component: AudioRecordingComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
