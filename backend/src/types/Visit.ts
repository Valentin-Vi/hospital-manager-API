type Visit = {
    id: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    visitDate: Date | null;
    clientId: number | null;
    doctorId: number | null;
}

export type VisitCreate = Omit<Visit, "id">
export type VisitUpdate = Omit<Visit, "id" | "createdAt">

export default Visit;
