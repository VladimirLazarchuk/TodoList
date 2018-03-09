import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider} from 'ng4-social-login';

import {HttpService} from '../../services/http.service';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private httpService: HttpService,
              private ls: LocalStorageService) {
  }

  ngOnInit() {
    if (this.ls.getUser()) {
      this.router.navigate(['todo']);
    }
  }

  signIn(type) {
    if (type === 'GOOGLE') {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    } else {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    }
    let subscription = this.authService.authState.subscribe((user: SocialUser) => {
      if (user && user.provider) {
        const dataToServer: any = {
          name: user.name,
          email: user.email,
          id: user.id,
          provider: user.provider
        };
        this.httpService.login(dataToServer).subscribe(
          (appUser) => {
            this.ls.setUser(appUser);
            this.router.navigate(['todo']);
          },
          () => {
          }
        );
        subscription.unsubscribe();
      }
    })
  }
}
