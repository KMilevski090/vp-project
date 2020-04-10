import {Component, OnInit} from '@angular/core';
import {Poll} from '../models/poll';
import {ActivatedRoute, Router} from '@angular/router';
import {PollService} from '../poll.service';
import {map, mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-poll-details',
    templateUrl: './poll-details.component.html',
    styleUrls: ['./poll-details.component.css']
})
export class PollDetailsComponent implements OnInit {

    poll: Poll;
    loading = false;
    options = [];
    errorMessage: any;
    duplicateVoteError: any;
    selectedOptionID: number;

    constructor(private route: ActivatedRoute, private router: Router, private service: PollService) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            map(it => it.get('shortUrl')),
            mergeMap(shortUrl => {
                this.loading = true;
                return this.service.getPollByShortUrl(shortUrl);
            })).subscribe(poll => {
            this.poll = poll;
            this.options = poll.options;
            this.loading = false;
        }, error => {
            this.loading = false;
            this.errorMessage = error.error;
        });
    }

    selectedOption(event: any) {
        this.selectedOptionID = event.target.value;
    }

    vote() {
        this.service.vote(this.poll.id, this.selectedOptionID).subscribe(it => {
                window.location.reload();
            }
            , error1 => {
                this.duplicateVoteError = error1.error;
            });
    }
}
