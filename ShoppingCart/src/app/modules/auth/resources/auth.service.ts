import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import * as fromAuthModels from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://localhost:3000/users/';

  private userSource = new BehaviorSubject<fromAuthModels.User>(
    fromAuthModels.UserModel
  );
  
  user = this.userSource.asObservable();

  constructor(private http: HttpClient) {
  //  let userData = localStorage.getItem('user');
  //  if(userData) {
  //   this.userSource.next(JSON.parse(userData));
  //  }
   
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get(this.baseUrl + '?username=' + username).pipe(
      switchMap((users: any) => {
        let user = users[0];
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return of(user);
        } else {
          return throwError(() => new Error('Unable to login'));
        }
      })
    );
  }

  updatedUserSelection(user: fromAuthModels.User) {
    this.userSource.next(user);
  }
}
