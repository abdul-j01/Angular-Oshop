import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate():Observable<boolean>{   
      return this.auth.user$
      .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
      .pipe(map(appUser => appUser.isAdmin));

      // return this.auth.appUser$
      // .pipe(map(appUser => appUser.isAdmin));
  }
}
