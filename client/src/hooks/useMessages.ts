import {useState, useEffect, useContext, useRef} from 'react';
import UserService from "../services/UserService";
import {IMessage} from "../models/IMessage";
import {Context} from "../index";

export function useMessages() {
    const {store} = useContext(Context);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const oldMessagesRef = useRef<string[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const responseMessages = await UserService.fetchMessages(store.user.username);
                setMessages(responseMessages.data)
                oldMessagesRef.current = responseMessages.data.map(message => message._id);
            } catch (e) {
                console.log(e);
            }
        };

        fetchMessages();
    }, []);

    return { messages, setMessages, oldMessagesRef };
}