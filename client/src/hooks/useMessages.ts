import {useState, useEffect, useContext} from 'react';
import UserService from "../services/UserService";
import {IMessage} from "../models/IMessage";
import {Context} from "../index";

export function useMessages() {
    const {store} = useContext(Context);
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const responseMessages = await UserService.fetchMessages(store.user.username);
                setMessages(responseMessages.data)
            } catch (e) {
                console.log(e);
            }
        };

        fetchMessages();
    }, []);

    return { messages, setMessages };
}