import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from './store/states/auth.state';
import { GetUser } from './store/actions/auth.action';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  public status: boolean = false;

  constructor(private store: Store, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    await this.store.dispatch(new GetUser()).toPromise();

    const user = this.store.selectSnapshot(UserState); 

    if (user.currentUser) {
      this.status = true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      this.status = false;
    }

    return this.status;
  }
}
