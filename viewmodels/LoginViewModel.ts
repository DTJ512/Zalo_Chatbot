import { useTranslation } from "react-i18next";
import { UserModel } from "../models/UserModel";
import { AuthService } from "../services/AuthService";
import { makeAutoObservable } from "mobx";

export class LoginViewModel {
    username: string = "";
    password: string = "";
    isLoading: boolean = false;
    errorMessage: string | null = null;
    loginSuccess: boolean = false;

    private authService: AuthService;
    
    constructor() {
        makeAutoObservable(this);
        this.authService = new AuthService();
    }
    
    async login() {
        this.isLoading = true;
        this.errorMessage = null;
        //this.loginSuccess = false;
        //const { t } = useTranslation();
        
        const user = new UserModel(this.username, this.password);
        try {
            const success = await this.authService.login(user);
            if (success) {
                this.loginSuccess = true;                
            }
        } catch (error) {
            // TODO: translate error message
            this.errorMessage = "Thông tin đăng nhập không chính xác";
        } finally {
            this.isLoading = false;
        }
    }

    setUsername(username: string) {
        this.username = username;
    }

    setPassword(password: string) {
        this.password = password;
    }
}
