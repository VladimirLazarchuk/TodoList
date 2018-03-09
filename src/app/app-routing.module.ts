import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {TodoComponent} from "./components/todo/todo.component";
import {AboutComponent} from "./components/about/about.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'todo',
    component: TodoComponent,
    children: [
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
