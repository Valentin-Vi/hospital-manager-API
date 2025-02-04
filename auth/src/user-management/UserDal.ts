import User, { UserCreate, UserUpdate, UserUpdateRefreshToken } from "../types/User";
import { user, PrismaClient } from "@prisma/client";
import UserBuilder from "./UserBuilder";

export default class UserDal {
  
  private _db: PrismaClient;
  private _builder: UserBuilder;
  private _safe: true | false;

  constructor() {
    this._db = new PrismaClient();
    this._builder = new UserBuilder();
    this._safe = false
  };

  public get safe(): this {
    this._safe = true;
    return this;
  };

  public async store (
    user: UserCreate
  ): Promise<User | null> {
    try {
        const storedUser = await this._db.user.create({
            data: user
        });

        if(this._safe) {
            this._safe = false;
            return this._builder
            .safe
            .fromUser(storedUser)
            .buildUser();
        } else {
            return this._builder
            .fromUser(storedUser)
            .buildUser();
        };
    } catch(err) {
        console.error(err);
        return null;
    };
  };

  public async findByUserId(userId: number): Promise<User | null> {
    try {
        const foundUser = await this._db.user.findUnique({
            where: { userId }
        });
        if(!foundUser) return null;
        if(this._safe) {
            this._safe = false;
            return this._builder
            .safe
            .fromUser(foundUser)
            .buildUser();
        } else {
            return this._builder
            .fromUser(foundUser)
            .buildUser();
        };
    } catch(err) {
        console.error(err);
        return null
    };
  };
  
  public async findByEmail(
    email: string
  ): Promise<User | null> {
    const foundUser = await this._db.user.findUnique({
      where: { email },
    });
    if(!foundUser) return null;
    if(this._safe) {
      this._safe = false;
      return this._builder
      .safe
      .fromUser(foundUser)
      .buildUser();
    } else {
        return this._builder
        .fromUser(foundUser)
        .buildUser();
    };
  };

  public async update (
    user: UserUpdate
  ): Promise<User | null> {
    const updatedUser = await this._db.user.update({
      where: { userId: user.userId },
      data: user,
    });
    if(this._safe) {
        this._safe = false;
        return this._builder
        .safe
        .fromUser(updatedUser)
        .buildUser();
    } else {
        return this._builder
        .fromUser(updatedUser)
        .buildUser();
    };
  };
  
  public async updateRefreshToken (
    user: UserUpdateRefreshToken
  ): Promise<User | null> {
    const updatedUser = await this._db.user.update({
      where: { userId: user.userId },
      data: {
        refreshToken: user.refreshToken
      },
    });
    if(this._safe) {
        this._safe = false;
        return this._builder
        .safe
        .fromUser(updatedUser)
        .buildUser();
    } else {
        return this._builder
        .fromUser(updatedUser)
        .buildUser();
    };
  };
  
  public async clearRefreshToken (
    userId: number
  ): Promise<{ 
    success: true | false,
    errorCode: 0 | 1
  }> {
    const updatedUser: user | null = await this._db.user.update({
      where: { userId: userId },
      data: { refreshToken: null }
    });
  
    if(updatedUser) {
      return {
        success: true,
        errorCode: 0
      }
    } else {
      return {
        success: false,
        errorCode: 1
      };
    };
  };
  
  public async remove (
    userId: number
  ): Promise<User | null> {
    const removedUser = await this._db.user.delete({
      where: {
        userId: userId,
      },
    });
    if (removedUser) {
      return this._builder
      .fromUser(removedUser)
      .buildUser();
    } else {
      return null;
    };
  };
};
