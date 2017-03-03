import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EmailsettingsComponent } from './pages/emailsettings/emailsettings.component';
import { NetworksettingsComponent } from './pages/networksettings/networksettings.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { ClientComponent } from './pages/client/client.component';
import { EmailComponent } from './pages/email/email.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
{ path: '', component:  LoginComponent},
{ path: 'login', component:  LoginComponent},
{ path: 'monitor', component: MonitorComponent },
{ path: 'client', component: ClientComponent },
{ path: 'settings', component: SettingsComponent },
{ path: 'emailsettings', component: EmailsettingsComponent },
{ path: 'networksettings', component: NetworksettingsComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'logout', component: LogoutComponent },
{ path: 'email', component:  EmailComponent},
{ path: 'users', component:  UsersComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }