import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMessage: any;
    @Output() user: EventEmitter<any> = new EventEmitter();

    constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required] ,
            password: ['', Validators.required]
        });
    }

    get form() {
        return this.loginForm.controls;
    }

    login() {
        if (this.loginForm.invalid) {
            return;
        }
        this.service.getUserByUsername(this.loginForm.get('username').value).subscribe(it => {
            if (it != null) {
                this.service.login(this.loginForm.get('username').value, this.loginForm.get('password').value)
                    .subscribe(it => {
                        this.user.emit(it);
                        this.router.navigate(['/profile']);

                    }, error1 => {
                        this.errorMessage = error1.statusText;
                        this.user.emit(null);
                    });
            }
        }, error1 => {
            this.errorMessage = error1.error.error;
        });


    }

}
