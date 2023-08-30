import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetUser, LogoutUser } from '../store/actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  user$ = this.store.select(state => state.user.currentUser);
 
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store,
  ) {
    this.store.dispatch(new GetUser());
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(new LogoutUser)
    this.router.navigate(['/login']);
  }
}
