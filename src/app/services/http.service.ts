import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

import {LocalStorageService} from './local-storage.service';
import {Task} from '../interfaces/interfaces';
import {SocialUser} from 'ng4-social-login';

@Injectable()
export class HttpService {

  // baseUrl = `http://localhost:8001/api`; // dev
  baseUrl = `/api`; //prod

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {}

  login(dataToServer: any): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.httpClient.post(`${this.baseUrl}/login`, JSON.stringify(dataToServer), requestOptions);
  }

  getTasks(): any {
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': this.localStorageService.getUser().token, 'Content-Type': 'application/json'})
    };
    return this.httpClient.get(`${this.baseUrl}/tasks`, requestOptions);
  }

  addTask(task: string): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': this.localStorageService.getUser().token, 'Content-Type': 'application/json'})
    };
    return this.httpClient.post(`${this.baseUrl}/tasks`, JSON.stringify({task: task}), requestOptions);
  }

  changeTaskData(requestBody: any): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': this.localStorageService.getUser().token, 'Content-Type': 'application/json'})
    };
    return this.httpClient.patch(`${this.baseUrl}/tasks`, JSON.stringify(requestBody), requestOptions);
  }

  deleteTasks(requestBody: any): Observable<any> {
    const requestOptions = {
      headers: new HttpHeaders({'Authorization': this.localStorageService.getUser().token, 'Content-Type': 'application/json'}),
      body: JSON.stringify(requestBody)
    };
    return this.httpClient.delete(`${this.baseUrl}/tasks`, requestOptions);
  }

  clearCompleted() {
  }
}

