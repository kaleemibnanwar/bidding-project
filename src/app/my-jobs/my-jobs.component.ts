import { Component } from '@angular/core';
import { JobService } from '../service/job.service';
import { Store } from '@ngxs/store';
import { GetUser } from '../store/actions/auth.action';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.sass']
})
export class MyJobsComponent {
 jobs: any[] = [];
 user: any = {}; 

  constructor(private store: Store, private jobService: JobService) { 
    this.store.dispatch(new GetUser());
  }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getMyJobs().subscribe(
      (response: any) => {
        this.jobs = response;
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
}
