import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Store } from '@ngxs/store';
import { GetUser } from '../store/actions/auth.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
 user$ = this.store.select(state => state.user.currentUser);

  constructor(private store: Store, private userService: UserService) {
    this.store.dispatch(new GetUser());
  }

  ngOnInit(): void {
  }
}
