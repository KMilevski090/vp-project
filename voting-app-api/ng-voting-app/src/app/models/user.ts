export class User {
    constructor(email: string, password: string, username: string, firstName: string, lastName: string, pictureUrl: string) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pictureUrl = pictureUrl;
    }
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    pictureUrl: string;
}
