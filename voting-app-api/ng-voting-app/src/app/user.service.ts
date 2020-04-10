import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from './models/user';
import {catchError, map} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: 'root'
})

export class UserService {

    isAuthenticated = Observable.create();
    user: Observable<{}>;

    constructor(private http: HttpClient) {
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`/api/register`, user, httpOptions);
    }

    getUserByUsername(username: String): Observable<User> {
        return this.http.get<User>(`/api/user/${username}`);
    }

    login(username: string, password: string): Observable<any> {

        let headers = new HttpHeaders({Authorization: 'Basic ' + btoa(`${username}:${password}`)});
        headers = headers.append('X-Requested-With', 'XMLHttpRequest');
        return this.http.get(`/api/login`, {headers});
    }

    logout() {
        this.isAuthenticated = false;
        return this.http.post(`/api/logout`, '');
    }

    getCurrentUser() {
        if (this.user == null) {

            let headers = new HttpHeaders();
            headers = headers.append('X-Requested-With', 'XMLHttpRequest');
            this.user = this.http.get(`/api/principal`, {headers}).pipe(
                map(it => {
                    this.isAuthenticated = true;
                    return it;
                }),
                catchError(error => {
                        this.isAuthenticated = false;
                        return of<null>(null);
                    }
                )
            );
        }
        return this.user;

    }

}
