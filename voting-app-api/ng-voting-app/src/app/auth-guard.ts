import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from './user.service';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private service: UserService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.service.getCurrentUser().pipe(
            map(it => it != null),
            take(1),
            tap(allowed => {
                if (!allowed) {
                    this.router.navigate(['/']);
                }
            })
        );
    }


}
