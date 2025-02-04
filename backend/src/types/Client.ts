import User, { SafeUser, UserCreate, UserUpdate } from 'auth/src/types/User';
import Visit from './Visit';

type Client = { 
    user: User;
    clientId: number | null;
    visits: Visit[];
}

export type SafeClient = {
    user: SafeUser,
    clientId: number | null;
    visits: Visit[];
}

export type ClientCreate = UserCreate & Omit<Client, 'clientId'>
export type ClientUpdate = UserUpdate & Omit<Client, ''>

export default Client;
