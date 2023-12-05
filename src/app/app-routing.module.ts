import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { loginGuard } from './gaurd/login.guard';
import { deactivateGuard } from './gaurd/deactivate.guard';
import { ProfileComponent } from './profile/profile.component';
import { ForgotComponent } from './forgot/forgot.component';
import { FolderComponent } from './folder/folder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent,
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'forgot_password', component: ForgotComponent }
  // {path:'/**/',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
