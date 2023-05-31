import { useState, useEffect } from 'react';
import UserService from "../services/UserService";
import {IUser} from "../models/IUser";

export function useUsers() {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.fetchUsers();
                setUsers(response.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchUsers();
    }, []);

    return { users, setUsers };
}