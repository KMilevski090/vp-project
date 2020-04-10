import {Component, OnInit} from '@angular/core';
import {PollService} from '../poll.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {DiscoverPoll} from '../models/discoverPoll';
import {UserService} from '../user.service';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {


    myPolls: DiscoverPoll[];
    user: {};

    constructor(private route: ActivatedRoute, private pollService: PollService, private userService: UserService) {
    }

    ngOnInit() {
        this.userService.getCurrentUser()
            .subscribe(user => {
                this.user = user;
                this.pollService
                    .getPollsByUsername(this.user['username'])
                    .pipe(
                        map(it => it.map(i => new DiscoverPoll(new Date(i[0]), i[1], i[2], i[3])))
                    )
                    .subscribe(it => {
                        this.myPolls = it;
                    });
            });
    }


}
