import User, { UserCreate, UserUpdate } from "auth/src/types/User";

type Desk = {
    user: User;
    deskId: number | null;
}
export type DeskCreate = UserCreate & Omit<Desk, "deskId">

export default Desk;
