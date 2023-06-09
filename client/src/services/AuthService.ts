import $api from "../http";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(username: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { username });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }
}