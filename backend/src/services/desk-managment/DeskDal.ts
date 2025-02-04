import { Desk, DeskCreate } from "backend/types";
import { desk, user, PrismaClient } from "@prisma/client";
import DeskBuilder from "./DeskBuilder";

export default class DeskDal {
    
    private db = new PrismaClient();
    private builder = new DeskBuilder();
    
    public async store (
        desk: DeskCreate
    ): Promise<Desk> {        
        const newDesk = await this.db.desk.create({
            data: {
                user: {
                    connectOrCreate: {
                        where: { userId: desk.userId },
                        create: {
                            name: desk.name,
                            lastname: desk.lastname,
                            email: desk.email,
                            password: desk.password
                        }
                    },
                }
            },
            select: {
                user: {
                    select: {
                        userId: true,
                        email: true,
                        password: false,
                        name: true,
                        lastname: true,
                        refreshToken: false,
                        type: true
                    }
                },
                deskId: true
            }
        });

        return this.builder
        .setUserId(newDesk.userId)
        .setDeskId(newDesk.deskId)
        .setName(newDesk.user.name)
        .setLastname(newDesk.user.lastname)
        .setEmail(newDesk.user.email)
        .setPassword("")
        .setRefreshToken("")
        .build();
    };

    public async find (
        deskId: number
    ): Promise<Desk | null> {
        const desk = await this.db.desk.findUnique({
            where: { deskId: deskId },
            select: { user: { select: {
                userId: true,
                email: true,
                name: true,
                lastname: true,
                type: true
            } },
                deskId: true
            }
        });

        if(!desk) return null;

        return this.builder
        .setUserId(desk.userId)
        .setDeskId(desk.deskId)
        .setName(desk.user.name)
        .setLastname(desk.user.lastname)
        .setEmail(desk.user.email)
        .setPassword("")
        .setRefreshToken("")
        .build();
    };

    public async update (
        desk: Desk
    ): Promise<Desk | null> {
        const updatedDesk = await this.db.desk.update({
            where: { deskId: desk.deskId },
            data: {
                user: {
                    connectOrCreate: { 
                        where: { userId: desk.userId } 
                    },
                    create: {
                        name: desk.name,
                        lastname: desk.lastname,
                        email: desk.email,
                        password: desk.password
                    }
                }
            },
            select: { user: { select: {
                userId: true,
                email: true,
                name: true,
                lastname: true,
                type: true
            } },
                deskId: true
        }})
        ;
        if(!updatedDesk) return null;

        return this.builder
        .setUserId(updatedDesk.userId)
        .setDeskId(updatedDesk.deskId)
        .setName(updatedDesk.user.name)
        .setLastname(updatedDesk.user.lastname)
        .setEmail(updatedDesk.user.email)
        .setPassword("")
        .setRefreshToken("")
        .build();
    };

    public async remove (
        deskId: number
    ): Promise<Desk | null> {
        const desk = await this.db.desk.delete({
            where: { deskId: deskId },
            select: { user: { select: {
                userId: true,
                email: true,
                name: true,
                lastname: true,
                type: true
            }},
            deskId: true
        }});
        
        if(!desk) return null;
        
        return this.builder
        .setUserId(desk.userId)
        .setDeskId(desk.deskId)
        .setName(desk.user.name)
        .setLastname(desk.user.lastname)
        .setEmail(desk.user.email)
        .setPassword("")
        .setRefreshToken("")
        .build();
    };
};
