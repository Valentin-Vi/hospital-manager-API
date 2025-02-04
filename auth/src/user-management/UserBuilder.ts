import User from "../types/User";
import UserType from "../types/enum/UserType"
import { userType } from "@prisma/client";

export default class UserBuilder {

    private _safe: true | false;
    private _user: Partial<User>;

    constructor() {
      this._safe = false;
      this._user = {};
    };

    // public setSafe(_safe: true | false): this {
    //   this._safe = _safe;
    //   return this;
    // };

    public get safe(): this {
      this._safe = true
      return this;
    };

    public setUserId(id: number | null): this {
      this._user.userId = id;
      return this;
    };

    public fromUser(
      user: {
        userId: number;
        email: string;
        password: string | null;
        name: string | null;
        lastname: string | null;
        refreshToken: string | null;
        type: userType;
      }
    ): this {
      this._user.userId = user.userId;
      this._user.email = user.email;
      this._user.name = user.name;
      this._user.lastname = user.lastname;
      this._user.type = user.type as UserType;
      if(!this._safe) {
        this._user.password = user.password;
        this._user.refreshToken = user.refreshToken;
      }

      this._safe = false;
      return this;
    };

    public setEmail(email: string | null): this {
      this._user.email = email;
      return this;
    };
  
    public setPassword(password: string | null): this {
      this._user.password = password;
      return this;
    };
  
    public setName(name: string | null): this {
      this._user.name = name;
      return this;
    };
  
    public setLastname(lastname: string | null): this {
      this._user.lastname = lastname;
      return this;
    };
  
    public setRefreshToken(refreshToken: string | null): this {
      this._user.refreshToken = refreshToken;
      return this;
    };

    public setType(type: UserType | null): this {
      this._user.type = type;
      return this;
    };
  
    public buildUser(): User {
      if (!this._user.userId) {
        throw new Error("Missing required field id.");
      } else if(!this._user.email) {
        throw new Error("Missing required field email.");
      };
      this._safe = false;
      return this._user as User;
    };

    public reset(): void {
      this._user = {};
      this._safe = false;
    };
};
