import {Component, OnInit} from '@angular/core';
import {PollService} from '../poll.service';
import {DiscoverPoll} from '../models/discoverPoll';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-latest-polls',
    templateUrl: './latest-polls.component.html',
    styleUrls: ['./latest-polls.component.css']
})
export class LatestPollsComponent implements OnInit {

    latestPolls: DiscoverPoll[];

    constructor(private service: PollService) {
    }

    ngOnInit() {
        this.service.showLatestPolls()
            .pipe(
                map(it => it.map(i => new DiscoverPoll(new Date(i[0]), i[1], i[2], i[3])))
            )
            .subscribe(it => {
                this.latestPolls = it;
            });
    }

}
