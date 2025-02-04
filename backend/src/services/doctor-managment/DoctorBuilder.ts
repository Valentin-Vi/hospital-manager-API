import { Visit } from "backend/types";
import { Doctor } from "backend/types";
import { SafeUser } from "auth/types";
import { UserType } from "auth/types";

export default class DoctorBuilder {

    private doctor: Partial<Doctor> = {};

    setUser(user: SafeUser): this {
        this
        .setUserId(user.userId)
        .setEmail(user.email)
        .setName(user.name)
        .setLastname(user.lastname)
        .setType(user.type);
        return this;
    }

    setUserId(userId: number | null): this {
        this.doctor.userId = userId;
        return this;
    }

    setDoctorId(doctorId: number | null): this {
        this.doctor.doctorId = doctorId;
        return this;
    }

    setEmail(email: string | null): this {
        this.doctor.email = email;
        return this;
    }

    setPassword(password: string | null): this {
        this.doctor.password = password;
        return this;
    }

    setName(name: string | null): this {
        this.doctor.name = name;
        return this;
    }

    setLastname(lastname: string | null): this {
        this.doctor.lastname = lastname;
        return this;
    }

    setRefreshToken(refreshToken: string | null): this {
        this.doctor.refreshToken = refreshToken;
        return this;
    }

    setType(type: UserType | null): this {
        this.doctor.type = type;
        return this;
    }

    setSpecialty(specialty: string | null): this {
        this.doctor.specialty = specialty;
        return this;
    }

    setVisits(visits: Visit[]): this {
        this.doctor.visits = visits;
        return this;
    }

    addVisit(visit: Visit): this {
        if(this.doctor.visits) {
            this.doctor.visits.push(visit)
        } else {
            this.doctor.visits = new Array<Visit>
            this.doctor.visits.push(visit)
        }
        return this;
    }

    build(): Doctor {
        if (!this.doctor.userId || !this.doctor.doctorId || !this.doctor.email) {
            throw new Error("Missing required fields: userId, doctorId, email");
        }
        return this.doctor as Doctor;
    }

    reset(): void {
        this.doctor = {};
    }

}
