import { User } from '../models/auth-user.model';

export class LoginUser {
  static readonly type = '[User] Set Current User';
  constructor(public payload: User) {}
}

export class LogoutUser {
  static readonly type = '[User] Clear Current User';
}

export class GetUser {
  static readonly type = '[User] Get User';
  constructor() {}
}