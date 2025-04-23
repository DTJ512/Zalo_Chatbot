export interface IUser {
    username: string;
    password: string;
}


/**
 * @class **UserModel**
 * represents a user in the system.
 * @field **username** the username of the user
 * @field **password** the password of the user
 */
export class UserModel implements IUser {
    
    constructor(public username: string, public password: string) {}

    // TODO: Connect database and validate the password 
    // by using a hashing algorithm
    validatePassword(password: string): boolean {
        return this.password === password;
    }
}
