import {Component, OnInit} from '@angular/core';
import {PollService} from '../poll.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreatePoll} from '../models/createPoll';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-create-poll',
    templateUrl: './create-poll.component.html',
    styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {

    pollForm: FormGroup;
    poll: CreatePoll;
    options = [];
    numberOfOptions = 2;
    shortUrl: string;
    user: {};

    constructor(private service: PollService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        this.pollForm = this.formBuilder.group({
            question: ['', Validators.required],
            numberOfOptions: [''],
        });
    }

    createPoll() {
        this.poll = new CreatePoll(this.pollForm.get('question').value, this.options, this.user['username']);
        this.service.createPoll(this.poll).pipe(
            map(it => it.shortUrl)
        ).subscribe(it => {
            this.shortUrl = it;
            this.router.navigate([`/poll/${this.shortUrl}`]);
        });

    }

    getUser(user) {
        this.user = user;
    }

    arrayOne(n: number): number[] {
        return Array(n);
    }
}
