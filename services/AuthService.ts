import { IUser } from "../models/UserModel";

export class AuthService {
    async login(user: IUser): Promise<boolean> {
        // call API or do authentication logic here
        return new Promise((resolve, reject) => {
            console.log(user);
            if (user.username == "a" && user.password == "a") {
                resolve(true);
            } else {
                reject(false);
            }
        });
    }   
}
