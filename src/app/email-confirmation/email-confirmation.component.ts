import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.sass']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) {}

  private confirmationKey!: string | null;

  ngOnInit(): void {
    this.confirmationKey = this.route.snapshot.paramMap.get('key');
    this.userService.confirmEmail({ key: this.confirmationKey })
      .subscribe(
        (response: any) => {
          this.toastr.success('Email verification successful');
          this.router.navigate(['login']);
        },
        (err: any) => {
          if (err.status === 400) {
            this.ngZone.run(() => {
              Object.values(err.error).forEach((errors: any) => {
                errors.forEach((error: string) => {
                  this.toastr.error(error);
                });
              });
            });
          }
        }
      );
  }
}
