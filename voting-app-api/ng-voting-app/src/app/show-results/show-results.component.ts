import {Component, OnInit} from '@angular/core';
import {PollService} from '../poll.service';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap} from 'rxjs/operators';
import {Poll} from '../models/poll';
import {Chart} from 'chart.js';


@Component({
    selector: 'app-show-results',
    templateUrl: './show-results.component.html',
    styleUrls: ['./show-results.component.css']
})
export class ShowResultsComponent implements OnInit {

    poll: Poll;
    options = [];
    totalTimesVoted = 0;
    labels = [];
    data = [];
    colors = [];
    pieChart = [];

    constructor(private route: ActivatedRoute, private service: PollService) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            map(it => it.get('shortUrl')),
            mergeMap(shortUrl => {
                return this.service.getPollByShortUrl(shortUrl);
            })).subscribe(poll => {
            this.poll = poll;
            this.options = poll.options;
            this.getPieData();
        }, error => {
            console.log('error', error);
        });
    }

    getPieData() {
        this.options.forEach(it => this.labels.push(it.value));
        this.options.forEach(it => this.data.push(it.timesVoted));
        // this.options.forEach(() => this.colors.push(this.getRandomColor()));
        this.getRandomColor();
        this.options.forEach(it => this.totalTimesVoted += it.timesVoted);
        this.options.forEach(it => {
            if (this.totalTimesVoted == 0) {
                it.percent = 0;
            } else {
                it.percent = (it.timesVoted / this.totalTimesVoted * 100).toFixed(2);
            }
        });
        this.pieChart = new Chart('pie-chart', {
            type: 'pie',
            data: {
                labels: this.labels,
                datasets: [{
                    backgroundColor: this.colors,
                    data: this.data
                }]
            },
            options: {}
        });
    }

    getRandomColor() {
        const colors = ['#B31166', '#9B6BF2', '#E9943A', '#E33D6F', '#E45F3C'];
        let counter = 0;
        this.options.forEach(it => {
            this.colors.push(colors[counter % 5]);
            counter++;
        });
    }

}
