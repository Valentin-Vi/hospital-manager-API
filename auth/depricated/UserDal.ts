import User, { UserCreate, UserUpdate } from "../src/types/User";
import { user, PrismaClient } from "@prisma/client";
import UserBuilder from "../src/user-management/UserBuilder";

export default class UserDal {
  
  private _db = new PrismaClient();
  private _builder = new UserBuilder();
  private _safe: true | false = false

  public get safe(): this {
    this._safe = true;
    return this;
  };

  public async store (
    user: UserCreate
  ): Promise<User> {
    const storedUser = await this._db.user.create({
      data: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      },
    });
  
    if(this._safe) {
      this._safe = false;
      return this._builder.safe.fromUser(storedUser);
    } else {
      return this._builder.fromUser(storedUser);
    };
  };
  
  public async findByUserId(userId: number): Promise<User | null> {
    let foundUser: User | user | null = await this._db.user.findUnique({
      where: { userId: userId },
    });

    this._safe = false;
    if(this._safe) {
      return this._builder.safe.fromUser(foundUser);
    } else {
      return this._builder.fromUser(foundUser)
    };
  };
  
  public async findByEmail(email: string): Promise<User | null> {
    const foundUser = await this._db.user.findUnique({
      where: { email: email },
    });

    this._safe = false;
    return this._builder.safe.fromUser(foundUser);
  };

  public async update (
    user: UserUpdate
  ): Promise<User | null> {
    const updatedUser: user | null = await this._db.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password
      },
    });
  
    this._safe = false;
    if (updatedUser) {
      return this._builder.fromUser(updatedUser);
    } else {
      return null;
    };
  };
  
  public async updateRefreshToken (
    user: User
  ): Promise<User | null> {
    const updatedUser: user | null = await this._db.user.update({
      where: { userId: user.userId },
      data: {
        refreshToken: user.refreshToken,
      },
    });
  
    this._safe = false;
    if (updatedUser) {
      return this._builder.fromUser(updatedUser);
    } else {
      return null;
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
  
    this._safe = false;
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
    
    this._safe = false;
    if (removedUser) {
      return this._builder.fromUser(removedUser);
    } else {
      return null;
    };
  };
};
