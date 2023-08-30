import { State, Action, StateContext } from '@ngxs/store';
import { UserService } from '../../service/user.service';
import { User } from '../models/auth-user.model';
import { LoginUser, LogoutUser, GetUser } from '../actions/auth.action';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

export class UserStateModel {
  currentUser!: User | null;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: null
  }
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Action(LoginUser)
  loginUser(ctx: StateContext<UserStateModel>, { payload }: LoginUser) {
    ctx.patchState({
      currentUser: payload
    });
  }

  @Action(LogoutUser)
  logoutUser(ctx: StateContext<UserStateModel>) {
      this.userService.logout().subscribe(
        () => {
          localStorage.removeItem('token');
          ctx.patchState({
            currentUser: null
          });
      });  
  }

  @Action(GetUser)
  getUser(ctx: StateContext<UserStateModel>) {
    const state = ctx.getState();

    if (state.currentUser) {
      return of(null); 
    }

    return this.userService.me().pipe(
      tap((response: User) => {
        ctx.patchState({
          currentUser: response
        });
      })
    );
  }
}
