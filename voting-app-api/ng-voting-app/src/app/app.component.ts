import {UserService} from './user.service';
import {LoginComponent} from './login/login.component';
import {Router} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    userLogged = false;
    user = {};
    @ViewChild(LoginComponent)
    private loginComponent: LoginComponent;

    constructor(private route: Router, private service: UserService) {
    }

    onActivate(componentReference) {

        if (componentReference.getUser instanceof Function) {
            componentReference.getUser(this.user);
        }

        if (componentReference.user != undefined && componentReference.user.subscribe ! instanceof Function) {
            componentReference.user.subscribe(data => {
                this.service.isAuthenticated = true;
                this.user = data;
                this.userLogged = this.user != null;
            });
        }

    }

    ngOnInit() {
        this.service.getCurrentUser()
            .subscribe(user => {
                this.user = user;
                this.userLogged = this.user != null;
            });
    }

    logout() {
        this.service.logout().subscribe(() => {
            this.route.navigate(['/']);
            this.userLogged = false;
            this.user = {};
        });
    }

}
