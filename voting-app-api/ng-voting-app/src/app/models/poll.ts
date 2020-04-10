import {Option} from './option';
import {User} from './user';

export interface Poll {
    id: number;
    question: string;
    options: Option[];
    user: User;
    shortUrl: string;
    dateCreated: Date;
}
