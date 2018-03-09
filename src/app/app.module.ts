import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {ServiceWorkerModule} from '@angular/service-worker';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {environment} from '../environments/environment';

import {
SocialLoginModule,
AuthServiceConfig,
GoogleLoginProvider,
FacebookLoginProvider
} from 'ng4-social-login';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {TodoComponent} from './components/todo/todo.component';
import {ItemComponent} from './components/item/item.component';
import {AboutComponent} from './components/about/about.component';
import {HttpService} from "./services/http.service";
import {LocalStorageService} from "./services/local-storage.service";
import {DonePipe} from './pipes/done.pipe';

const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('465467658688-49hbphnua7vlsg495dtk136012thsdin.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('548641148806607')
  }
])

export function providerConfig() {
  return CONFIG;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent,
    ItemComponent,
    AboutComponent,
    DonePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    SocialLoginModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: providerConfig
    },
    HttpService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
