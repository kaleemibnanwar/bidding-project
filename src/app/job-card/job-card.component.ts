import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetUser } from '../store/actions/auth.action';
import { JobService } from '../service/job.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.sass']
})
export class JobCardComponent {
  @Input() job: any = {};
  @Output() success = new EventEmitter<boolean>();
  user$ = this.store.select(state => state.user.currentUser);

  constructor(private jobService: JobService, private store: Store, private router: Router,
 ) { 
    this.store.dispatch(new GetUser());
  }

  deleteJob(id: number){
      this.jobService.deleteJob(id).subscribe(
        (response: any) => {
          this.emitSuccess(true)
        },
        (error: any) => {
        }
      );
  }

  editJob(id: number){
        this.router.navigate([`edit-bid/${id}`]);
  }

  emitSuccess(status: boolean) {
    this.success.emit(status);
  }
}
