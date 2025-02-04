import { Desk } from "backend/types";
import { User, UserType } from "auth/types";

export default class DeskBuilder {

    private _safe: true | false = true;
    private _desk: Partial<Desk> = {};

    setSafe(safe: true | false): this {
        this._safe = safe;
        return this;
    };

    setUser(this: this, user: User): this {
        this
        .setUserId(user.userId)
        .setEmail(user.email)
        .setPassword(user.password)
        .setName(user.name)
        .setLastname(user.lastname)
        .setRefreshToken(user.refreshToken)
        .setType(user.type);
        return this;
    };

    setUserId(userId: number | null): this {
        this._desk.userId = userId;
        return this;
    }

    setDeskId(_deskId: number | null): this {
        this._desk._deskId = _deskId;
        return this;
    }

    setEmail(email: string | null): this {
        this._desk.email = email;
        return this;
    }

    setPassword(password: string | null): this {
        this._desk.password = password;
        return this;
    }

    setName(name: string | null): this {
        this._desk.name = name;
        return this;
    }

    setLastname(lastname: string | null): this {
        this._desk.lastname = lastname;
        return this;
    }

    setRefreshToken(refreshToken: string | null): this {
        this._desk.refreshToken = refreshToken;
        return this;
    }

    setType(type: UserType | null): this {
        this._desk.type = type;
        return this;
    }

    build(): Desk {
        if (!this._desk.userId || !this._desk._deskId || !this._desk.email) {
            throw new Error("Missing required fields: userId, _deskId, email");
        }
        return this._desk as Desk;
    }

    reset(): void {
        this._desk = {};
    }

}
