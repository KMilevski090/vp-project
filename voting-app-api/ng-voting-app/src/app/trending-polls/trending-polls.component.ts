import {Component, OnInit} from '@angular/core';
import {PollService} from '../poll.service';
import {map} from 'rxjs/operators';
import {DiscoverPoll} from '../models/discoverPoll';

@Component({
    selector: 'app-trending-polls',
    templateUrl: './trending-polls.component.html',
    styleUrls: ['./trending-polls.component.css']
})
export class TrendingPollsComponent implements OnInit {

    trendingPolls: DiscoverPoll[];

    constructor(private service: PollService) {
    }

    ngOnInit() {
        this.service.showTrendingPolls()
            .pipe(
                map(it => it.map(i => new DiscoverPoll(new Date(i[0]), i[1], i[2], i[3])))
            )
            .subscribe(it => this.trendingPolls = it);
    }

}
