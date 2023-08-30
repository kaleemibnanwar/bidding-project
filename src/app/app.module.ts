import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { JobCardComponent } from './job-card/job-card.component';
import { BidCardComponent } from './bid-card/bid-card.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { JobComponent } from './job/job.component';


import { UserState } from './store/states/auth.state';
import { MyProposalsComponent } from './my-proposals/my-proposals.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    SignupComponent,
    JobCardComponent,
    BidCardComponent,
    CreateJobComponent,
    CreateBidComponent,
    EmailConfirmationComponent,
    MyJobsComponent,
    MyProposalsComponent,
    JobComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([UserState]),
    NgxsLoggerPluginModule.forRoot()
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
