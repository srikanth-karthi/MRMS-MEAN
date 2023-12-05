
import { NgModule } from '@angular/core';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { ForgotComponent } from './forgot/forgot.component';
import { StorageModule } from '@ngx-pwa/local-storage';
import { FilesComponent } from './files/files.component'; 
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FolderComponent } from './folder/folder.component';
import { NullfilesComponent } from './nullfiles/nullfiles.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    ForgotComponent,
    FilesComponent,
    FolderComponent,
    NullfilesComponent
  ],
  imports: [

    PdfViewerModule,
    StorageModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,

    FormsModule,
    MdbCheckboxModule,
    ToastrModule.forRoot({
      timeOut: 3000,         // Toast display time in milliseconds
      positionClass: 'toast-top-right', // Toast position
      preventDuplicates: true, // Prevent duplicate toasts
    }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
