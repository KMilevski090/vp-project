export class CreatePoll {
    question: string;
    options: string[];
    user: string;

    constructor(question: string, options: string[], user: string) {
        this.question = question;
        this.options = options;
        this.user = user;
    }
}
