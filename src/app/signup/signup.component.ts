import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone
  ) {}

  registered: boolean = false;

  registerUser(data: any) {
    this.userService.register(data)
      .pipe(
        catchError((err: any) => {
          if (err.status === 400) {
            this.ngZone.run(() => {
              Object.values(err.error).forEach((errors: any) => {
                errors.forEach((error: string) => {
                  this.toastr.error(error);
                });
              });
            });
          }
          throw err; 
        })
      )
      .subscribe(
        (response: any) => {
          this.toastr.success('Verification mail sent!');
          this.registered = true;
        }
      );
  }
}
