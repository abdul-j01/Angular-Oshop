import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
//import { of } from 'rxjs/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private route: Router) { }

  canActivate(route , state: RouterStateSnapshot){   
      // if(this.auth.user$) return true;

      // this.router.navigate(['/login']);
      // return false;
      return this.auth.user$.pipe(
        map(user => {
          if (user) {
            return true;
          } else {
            this.route.navigate(['/login'],{queryParams: {returnUrl:state.url}});
            return false;
          }
        }),
        // catchError((err) => {
        //   this.router.navigate(['/login']);
        //   return of(false);
        // })
      );
  }
}
