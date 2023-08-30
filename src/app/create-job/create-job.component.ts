import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { JobService } from '../service/job.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.sass']
})
export class CreateJobComponent {

  jobForm: FormGroup; 
  private id!: string | null;

  constructor(
    private jobService: JobService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    ) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.jobForm = this.formBuilder.group({
      title: ['', Validators.required], 
      budget: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      owner: ['']
    });
  }

  ngOnInit(): void {
    if(this.id){
          this.getJobById(this.id);
    }
  }

  getJobById(id: string) {
      this.jobService.getJobDetails(id).subscribe(
      (response: any) => {
          this.jobForm.patchValue(response);
      },
        (error: any) => {
      }
    );
  }

  submit(){
    if(this.id){
      this.updateJob()
    }else{
      this.createJob()
    }
  }

  updateJob() {
    if (this.jobForm.valid && this.id) {
      const jobData = this.jobForm.value;
      this.jobService.updateJob(this.id, jobData).subscribe(
        (response: any) => {
          this.jobForm.patchValue(response);
        },
        (error: any) => {
        }
      );
    }
  }

  createJob() {
    if (this.jobForm.valid) {
      const jobData = this.jobForm.value;
      this.jobService.createJob(jobData).subscribe(
        (response: any) => {
          this.router.navigate([''])
        },
        (error: any) => {
        }
      );
    }
  }
}
