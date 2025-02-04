import { User, UserCreate, UserUpdate } from 'auth/types';
import { UserDal } from 'auth';
import { hash } from 'bcrypt';

export default class UserService {

    private _dal = new UserDal();

}


export async function store (
    user: UserCreate
): Promise<{
    success: true | false,
    storedUser: User | null,
    errorCode: 0 | 1
}> {
    try {
        user.password = await hash(user.password, 10);
        const storedUser: User = await dal.store(user);
        
        return {
            success: true,
            storedUser,
            errorCode: 0
        };
    } catch(err) {
        console.error(err);
        return {
            success: false,
            storedUser: null,
            errorCode: 1
        };
    };
};

/**
 *  find
 *  @param { number } param if param is of type number, user is searched by is userId.
 *  @param { string } param if param is of type string, user is searched by its email.
*/ 
export async function find (
    param: number | string
): Promise<{
    success: true | false,
    foundUser: User | null,
    errorCode: 0 | 1
}> {
    if(typeof param === 'number') {
        try {
            const foundUser: User | null = await dal.findByUserId(param);
            return {
                success: foundUser ? true : false,
                foundUser,
                errorCode: 0
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                foundUser: null,
                errorCode: 1
            };
        };
    } else if(typeof param === 'string') {
        try {
            const foundUser: User | null = await dal.findByEmail(param);
            return {
                success: foundUser ? true : false,
                foundUser,
                errorCode: 0
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                foundUser: null,
                errorCode: 1
            };
        };
    } else {
        throw new Error(`Param of type ${typeof param} is inadmissible in function \`.find(param: number | string)\`.`);
    };
};

export async function update (
    user: UserUpdate
): Promise<{
    success: true | false,
    updatedUser: User | null,
    errorCode: 0 | 1 | 2
}> {
    try {
        const updatedUser: User | null = await dal.updateByUserId(user);
        if(updatedUser) {
            return {
                success: true,
                updatedUser,
                errorCode: 0
            };
        } else {
            return {
                success: false,
                updatedUser,
                errorCode: 1
            };
        };
    } catch(err) {
        console.error(err);
        return {
            success: false,
            updatedUser: null,
            errorCode: 2
        };
    };
};

export async function remove (
    userId: number
): Promise<{
    success: true | false,
    removedUser: User | null,
    errorCode: 0 | 1 | 2
}> {
    try {
        const removedUser: User | null = await dal.deleteById(userId);
        if(removedUser) {
            return {
                success: true,
                removedUser,
                errorCode: 0
            };
        } else {
            return {
                success: false,
                removedUser,
                errorCode: 1
            };
        };
    } catch(err) {
        console.error(err);
        return {
            success: false,
            removedUser: null,
            errorCode: 2
        };
    };
};
