import { Injectable } from '@angular/core';

import {SocialUser} from "ng4-social-login";

@Injectable()
export class LocalStorageService {

  getUser() {
    return JSON.parse(localStorage.getItem('Pass-App-User'));
  }

  setUser(user: SocialUser) {
    localStorage.setItem('Pass-App-User', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('Pass-App-User');
  }

}
