import { Component } from '@angular/core';
import { JobService } from '../service/job.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  
  jobs: any[] = [];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe(
      (response: any) => {
        this.jobs = response;
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
}
