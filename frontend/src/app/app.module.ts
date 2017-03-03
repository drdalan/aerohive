import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { EmailsettingsComponent } from './pages/emailsettings/emailsettings.component';
import { NetworksettingsComponent } from './pages/networksettings/networksettings.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { MonitorComponent } from './pages/monitor/monitor.component';
import { ClientComponent } from './pages/client/client.component';
import { LoginComponent } from './pages/login/login.component';

//service
import { MycustomService } from './service/mycustom.service';
import { EmailComponent } from './pages/email/email.component';
import { UsersComponent } from './pages/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SettingsComponent,
    EmailsettingsComponent,
    LogoutComponent,
    MonitorComponent,
    ClientComponent,
    LoginComponent,
    EmailComponent,
    UsersComponent,
    NetworksettingsComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [MycustomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
