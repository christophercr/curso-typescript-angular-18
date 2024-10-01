import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { User, UserType } from '../models/user.model';
import { map, type Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _http = inject(HttpClient);

  private _currentUser: User | null = null;

  public get currentUser(): User | null {
    return this._currentUser;
  }

  simulateLogin(desiredUserType?: UserType): Observable<User> {
    return this._http.get<User[]>(`http://localhost:3000/users`).pipe(
      map((users) => {
        if (desiredUserType) {
          return users.find((user) => user.userType === desiredUserType) as User;
        }

        this._currentUser = this._getRandomUser(users);
        console.log('Simulating user login => user:', this._currentUser);
        return this._currentUser;
      }),
    );
  }

  private _getRandomUser(array: User[]): User {
    return array[this._generateRandomInt(array.length - 1)];
  }

  private _generateRandomInt(maxValue: number): number {
    const positiveMaxValue = Math.max(0, maxValue);
    return Math.trunc(Math.random() * (positiveMaxValue + 1));
  }
}
