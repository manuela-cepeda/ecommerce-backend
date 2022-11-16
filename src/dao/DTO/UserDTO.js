export class UserPresenterDTO {
    constructor(user){
        this.first_name = user.name;
        this.last_name = user.lastName;
        this.fullName = `${this.first_name} ${this.last_name}`;
        this.email = user.email;
    }
}