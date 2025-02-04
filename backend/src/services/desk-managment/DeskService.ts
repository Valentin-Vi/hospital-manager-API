import { Desk, DeskCreate } from "backend/types";
import DeskDal from './DeskDal';
import { hash } from "bcrypt";

export default class DeskService {
    
    private dal = new DeskDal();
    
    constructor() {};

    public async store (
        desk: DeskCreate
    ): Promise<{
        success: true | false,
        storedDesk: Desk | null,
        errorCode: 0 | 1
    }> {
        try {
            desk.password = await hash(desk.password, 10);
            const storedDesk = await this.dal.store(desk);
            return {
                success: true,
                storedDesk,
                errorCode: 0
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                storedDesk: null,
                errorCode: 1
            };
        };
    };

    public async find (deskId: number): Promise<{
        success: true | false,
        foundDesk: Desk | null,
        errorCode: 0 | 1 | 2
    }> {
        try {
            const foundDesk = await this.dal.find(deskId);
            if(foundDesk) {
                return {
                    success: true,
                    foundDesk,
                    errorCode: 0
                };
            } else {
                return {
                    success: true,
                    foundDesk: null,
                    errorCode: 1
                };
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                foundDesk: null,
                errorCode: 2
            };
        };
    };

    public async update(desk: Desk): Promise<{
        success: true | false,
        updatedDesk: Desk | null,
        errorCode: 0 | 1 | 2
    }> {
        try {
            const updatedDesk = await this.dal.update(desk);
            if(updatedDesk) {
                return {
                    success: true,
                    updatedDesk,
                    errorCode: 0
                };
            } else {
                return {
                    success: true,
                    updatedDesk: null,
                    errorCode: 1
                };
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                updatedDesk: null,
                errorCode: 2
            };
        };
    };

    public async remove (deskId: number): Promise<{
        success: true | false,
        removedDesk: Desk | null,
        errorCode: 0 | 1 | 2
    }> {
        try {
            const removedDesk = await this.dal.remove(deskId);
            if(removedDesk) {
                return {
                    success: true,
                    removedDesk,
                    errorCode: 0
                };
            } else {
                return {
                    success: true,
                    removedDesk,
                    errorCode: 1
                };
            };
        } catch(err) {
            console.error(err);
            return {
                success: false,
                removedDesk: null,
                errorCode: 2
            };
        };
    };
};
