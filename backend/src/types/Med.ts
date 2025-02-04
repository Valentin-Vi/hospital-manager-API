type Med = {
    medId: number | null,
    name: string | null,
    category: string | null,
    description: string | null,
};

export type MedCreate = {
    name: string,
    category: string,
    description: string,
};

export type MedUpdate = {
    medId: number,
    name: string,
    category: string,
    description: string,
};

export default Med;
