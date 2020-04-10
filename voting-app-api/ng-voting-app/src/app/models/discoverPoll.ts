export class DiscoverPoll{
    date: Date;
    question: string;
    shortUrl: string;
    timesVoted: number;


    constructor(date: Date, question: string, shortUrl: string, timesVoted: number) {
        this.date = date;
        this.question = question;
        this.shortUrl = shortUrl;
        this.timesVoted = timesVoted;
    }
}
