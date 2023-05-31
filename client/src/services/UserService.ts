import $api from "../http";
import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {IMessage} from "../models/IMessage";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }

    static async fetchMessages(recipient: string): Promise<AxiosResponse<IMessage[]>> {
        return $api.post<IMessage[]>('/getAllMessages', { recipient });
    }

    static async sendMessage(sender: string, recipient: string, title: string, body: string): Promise<any> {
        return $api.post('/sendMessage', { sender, recipient, title, body });
    }

    static async getNewMessage(recipient: string): Promise<AxiosResponse<IMessage>> {
        return $api.post<IMessage>('/getNewMessage', { recipient });
    }
}