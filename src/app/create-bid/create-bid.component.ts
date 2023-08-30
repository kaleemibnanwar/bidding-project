import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BidService } from '../service/bid.service';

@Component({
  selector: 'app-create-bid',
  templateUrl: './create-bid.component.html',
  styleUrls: ['./create-bid.component.sass']
})
export class CreateBidComponent implements OnInit {

  bidForm: FormGroup;
  private jobId: string | null;

  constructor(
    private bidService: BidService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.bidForm = this.formBuilder.group({
      amount: ['', Validators.required],
      purposal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.bidForm.valid && this.jobId) {
      const bidData = { ...this.bidForm.value, job: this.jobId };
      this.bidService.createBidForJob(this.jobId, bidData).subscribe(
        (response: any) => {
          this.router.navigate([`/job/${this.jobId}`])
        },
        (error: any) => {
        }
      );
    }
  }
}
