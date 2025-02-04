import User, { UserCreate, UserUpdate } from "auth/src/types/User";
import Visit from "./Visit";

type Doctor = {
    user: User
    doctorId: number | null;
    specialty: string | null;
    visits: Visit[];
}

export type DoctorCreate = UserCreate & Omit<Doctor, "doctorId">
export type DoctorUpdate = UserUpdate & Omit<Doctor, "doctorId">

export default Doctor;
