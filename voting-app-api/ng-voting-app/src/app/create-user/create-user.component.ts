import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {User} from '../models/user';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

    userForm: FormGroup;
    user: User;
    errorMessages: any;

    submitted = false;

    constructor(private router: Router, private service: UserService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            pictureUrl: ['']
        });
    }

    get form() {
        return this.userForm.controls;
    }

    createUser() {
        this.submitted = true;

        if (this.userForm.invalid) {
            return;
        }
        this.user = new User(this.userForm.get('email').value,
            this.userForm.get('password').value,
            this.userForm.get('username').value,
            this.userForm.get('firstName').value,
            this.userForm.get('lastName').value,
            this.userForm.get('pictureUrl').value);
        this.service.createUser(this.user).subscribe(
            it => {
                this.service.login(this.user.username, this.user.password)
                    .subscribe(it => {
                        localStorage.setItem('currentUser', it['username']);
                        this.router.navigate(['/profile']);
                    });
            },
            error1 => {
                this.errorMessages = error1.error;
            }
        );
    }


}
