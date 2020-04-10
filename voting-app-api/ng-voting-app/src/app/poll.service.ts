import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Poll} from './models/poll';
import {CreatePoll} from './models/createPoll';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: 'root'
})
export class PollService {

    constructor(private http: HttpClient) {
    }

    getPollByShortUrl(shortUrl: string): Observable<Poll> {
        return this.http.get<Poll>(`/api/${shortUrl}`);
    }

    createPoll(poll: CreatePoll): Observable<Poll> {
        return this.http.post<Poll>(`/api/create`, poll, httpOptions);
    }

    showLatestPolls(): Observable<Poll[]> {
        return this.http.get<Poll[]>(`/api/latest`);
    }

    showTrendingPolls(): Observable<any[]> {
        return this.http.get<any[]>(`/api/trending`);
    }

    getPollsByUsername(username: string): Observable<Poll[]> {
        return this.http.get<Poll[]>(`/api/poll/${username}`);
    }

    vote(pollId: number, optionId: number): Observable<any> {
        return this.http.post(`/api/vote/${pollId}/${optionId}`, '', httpOptions);
    }

}
