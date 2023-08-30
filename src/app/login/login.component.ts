import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private ngZone: NgZone
  ) {}

  userLogin(data: any) {
    this.userService.login(data)
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
          localStorage.setItem('token', response.key);
          this.toastr.success('Login successful!');
          this.router.navigate(['/profile']);
        },
        (err: any) => {
        console.log(err);
        }
      );
  }
}
