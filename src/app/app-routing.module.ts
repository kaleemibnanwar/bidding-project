import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { CreateBidComponent } from './create-bid/create-bid.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { MyProposalsComponent } from './my-proposals/my-proposals.component';
import { authGuard } from './auth.guard';
import { JobComponent } from './job/job.component';

const routes: Routes = [
  {
    component:LoginComponent,
    path:'login'
  },
  {
    component:SignupComponent,
    path:'signup'
  },
  {
    component:EmailConfirmationComponent,
    path:'confirm-email/:key'
  },
  {
    component:ProfileComponent,
    path:'profile',
    canActivate: [authGuard]
  },
  {
    component:HomeComponent,
    path:'',
    canActivate: [authGuard]
  },
  {
    component:MyJobsComponent,
    path:'jobs',
    canActivate: [authGuard]
  },
  {
    component:CreateJobComponent,
    path:'create-job',
    canActivate: [authGuard]
  },
  {
    component:CreateJobComponent,
    path:'edit-bid/:id',
    canActivate: [authGuard]
  },
  {
    component:CreateBidComponent,
    path:'submit-purposal/:id',
    canActivate: [authGuard]
  },
  {
    component:MyProposalsComponent,
    path:'submitted-purposals',
    canActivate: [authGuard]
  },
  {
    component:JobComponent,
    path:'job/:id',
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
