import { Component } from '@angular/core';
import { JobService } from '../service/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetUser } from '../store/actions/auth.action';
import { Job } from './job.model'; 
import { Bid } from './bid.model'; 
import { BidService } from '../service/bid.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.sass']
})
export class JobComponent {
  job: Job = {
    id: 0,
    title: '',
    description: '',
    budget: 0,
    owner: 0 
  };

  bids : Bid[] = [];

  private id!: string | null;
  user$ = this.store.select(state => state.user.currentUser);

  constructor(
    private jobService: JobService,
    private bidService: BidService,
    private route: ActivatedRoute,
    private store: Store) {
    this.store.dispatch(new GetUser());
    this.id = this.route.snapshot.paramMap.get('id');
  }

ngOnInit(): void {
  if (this.id) {
    this.getJobById(this.id);
  }
}
  getJobById(id: string) {
      this.jobService.getJobDetails(id).subscribe(
      (response: any) => {
        this.job = response;
        this.user$.subscribe(user =>  {
            if (user && this.job.owner === user.pk) {
              this.getBidsForJob(this.job.id);
            }
        });
      },
      (error: any) => {
      }
    );
  }

getBidsForJob(id: string | number){
  this.bidService.getBidsForJob(id).subscribe(
      (response: any) => {
        this.bids = response;
      },
      (error: any) => {

      }
    );
}



}