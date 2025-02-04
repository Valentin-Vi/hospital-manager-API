import UserType from "./enum/UserType";

type User = {
    userId: number | null;
    email: string | null;
    password: string | null;
    name: string | null;
    lastname: string | null;
    type: UserType | null;
    refreshToken: string | null;
};

type ThruthyUser = {
    userId: number;
    email: string;
    password: string;
    name: string;
    lastname: string;
    type: UserType;
    refreshToken: string;
}

type SafeUser = Omit<User, 'password' | 'refreshToken'>;

type UserCreate = {
    email: string;
    password: string;
    name: string;
    lastname: string;
};

type UserUpdate = {
    userId: number;
    email: string;
    password: string;
    name: string;
    lastname: string;
};

type UserUpdateRefreshToken = {
    userId: number;
    refreshToken: string;
}

export default User;
export { UserCreate, UserUpdate, ThruthyUser, SafeUser, UserUpdateRefreshToken }